export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    title: 'Software Developer',
    company: 'RBC',
    location: 'Toronto, ON',
    period: 'Jan 2025 – Apr 2025',
    description: [
      'Worked on the Direct Investing mobile team, building SwiftUI trading screens, integrating analytics, and writing CI-ready tests.',
    ],
    technologies: ['Swift', 'SwiftUI', 'MVVM', 'XCTest', 'Jenkins', 'GitHub Actions'],
  },
  {
    title: 'Software Developer',
    company: 'Lim Geomatics',
    location: 'Ottawa, ON',
    period: 'May 2024 – Aug 2024',
    description: [
      'Contributed to the cross-platform mobile team by building secure location-based apps and automating file parsing with custom plugins.',
    ],
    technologies: ['Flutter', 'Kotlin', 'Swift', 'ArcGIS', 'Hive DB', 'AES-CBC Encryption'],
  },
  {
    title: 'Software Developer',
    company: 'Ontario Government',
    location: 'Toronto, ON',
    period: 'May 2023 – Sept 2023',
    description: [
      'Worked in the Judiciary IT Systems branch automating archival workflows and enhancing web platform security with Python and .NET.',
    ],
    technologies: ['Python', 'Selenium', 'C#', '.NET', 'Entity Framework Core'],
  },
];
