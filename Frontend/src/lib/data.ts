export type EnrollmentData = {
  year: number;
  course: string;
  students: number;
  region: string;
};

export const MOCK_DATA: EnrollmentData[] = [
  // 2019
  { year: 2019, course: "CompSci", students: 150, region: "North" },
  { year: 2019, course: "Business", students: 200, region: "South" },
  { year: 2019, course: "Fine Arts", students: 80, region: "East" },
  { year: 2019, course: "Engineering", students: 180, region: "West" },
  { year: 2019, course: "Medicine", students: 120, region: "North" },

  // 2020
  { year: 2020, course: "CompSci", students: 165, region: "North" },
  { year: 2020, course: "Business", students: 210, region: "South" },
  { year: 2020, course: "Fine Arts", students: 85, region: "East" },
  { year: 2020, course: "Engineering", students: 195, region: "West" },
  { year: 2020, course: "Medicine", students: 130, region: "South" },
  { year: 2020, course: "Data Science", students: 50, region: "West" },

  // 2021
  { year: 2021, course: "CompSci", students: 180, region: "North" },
  { year: 2021, course: "Business", students: 220, region: "South" },
  { year: 2021, course: "Fine Arts", students: 90, region: "East" },
  { year: 2021, course: "Engineering", students: 210, region: "West" },
  { year: 2021, course: "Medicine", students: 140, region: "East" },
  { year: 2021, course: "Data Science", students: 80, region: "North" },

  // 2022
  { year: 2022, course: "CompSci", students: 200, region: "North" },
  { year: 2022, course: "Business", students: 230, region: "South" },
  { year: 2022, course: "Fine Arts", students: 95, region: "West" },
  { year: 2022, course: "Engineering", students: 230, region: "West" },
  { year: 2022, course: "Medicine", students: 150, region: "South" },
  { year: 2022, course: "Data Science", students: 120, region: "North" },

  // 2023
  { year: 2023, course: "CompSci", students: 220, region: "North" },
  { year: 2023, course: "Business", students: 240, region: "South" },
  { year: 2023, course: "Fine Arts", students: 100, region: "East" },
  { year: 2023, course: "Engineering", students: 250, region: "West" },
  { year: 2023, course: "Medicine", students: 160, region: "East" },
  { year: 2023, course: "Data Science", students: 150, region: "North" },
];
