"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { EnrollmentData } from "@/lib/data";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface AnalyticsData {
  total_students: number;
  yearly_trend: any[];
  course_distribution: any[];
  course_distribution_label?: string;
  region_distribution: any[];
  region_distribution_label?: string;
  family_distribution: any[];
  family_distribution_label?: string;
  financial_distribution: any[];
  financial_distribution_label?: string;
  is_family_synthetic?: boolean;
  is_financial_synthetic?: boolean;
  insights?: any;
}

interface ForecastData {
  historical: any[];
  forecast: any[];
  years: number[];
  confidence_range: any[];
  is_synthetic?: boolean;
}

interface AccessLog {
  id: string;
  timestamp: string;
  action: string;
  label: string;
  icon: string;
  user: string;
  origin: string;
  status: string;
}

interface DataContextType {
  enrollmentData: EnrollmentData[];
  analytics: AnalyticsData | null;
  forecast: ForecastData | null;
  logs: AccessLog[];
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  uploadFile: (file: File) => Promise<void>;
  loadAnalytics: () => Promise<void>;
  loadForecast: () => Promise<void>;
  loadLogs: () => Promise<void>;
  downloadReport: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const getHeaders = () => ({
    "Authorization": `Bearer ${token}`,
  });

  const login = async (password: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "admin", password }),
      });

      if (!response.ok) throw new Error("Authentication failed");

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      setToken(data.access_token);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    setAnalytics(null);
    setForecast(null);
    setLogs([]);
    setEnrollmentData([]);
  };

  const uploadFile = async (file: File) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        headers: getHeaders(),
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      
      const data = await response.json();
      setEnrollmentData(data.preview.data); 
      await loadAnalytics();
      await loadLogs();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/analytics`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch analytics");
      const data = await response.json();
      setAnalytics(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadForecast = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/forecast`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch forecast");
      const data = await response.json();
      setForecast(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadLogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/logs`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch logs");
      const data = await response.json();
      setLogs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async () => {
    try {
      const response = await fetch(`${API_URL}/export`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error("Export failed");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Aura_Enrollment_Report.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      await loadLogs();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const value = {
    enrollmentData,
    analytics,
    forecast,
    logs,
    loading,
    error,
    isAuthenticated: !!token,
    login,
    logout,
    uploadFile,
    loadAnalytics,
    loadForecast,
    loadLogs,
    downloadReport,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
