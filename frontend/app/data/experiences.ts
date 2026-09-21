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
    title: 'Software Developer Intern',
    company: 'Intuit',
    location: 'Toronto, ON',
    period: 'Jan 2026 — Apr 2026',
    description: [
      'Built and optimized streaming pipeline infrastructure, from Pulsar connectors to automated performance benchmarking.',
    ],
    technologies: ['Java', 'Apache Pulsar', 'Kubernetes', 'Prometheus'],
  },
  {
    title: 'Software Developer Intern',
    company: 'Magnet Forensics',
    location: 'Waterloo, ON',
    period: 'Sept 2025 — Dec 2025',
    description: [
      'Built cloud infrastructure and CI/CD tooling that made distributed services easier to test, deploy, and monitor.',
    ],
    technologies: ['AWS', 'LocalStack', 'Jenkins', 'DynamoDB', 'CloudWatch'],
  },
  {
    title: 'iOS Software Developer Intern',
    company: 'RBC',
    location: 'Toronto, ON',
    period: 'Jan 2025 — Apr 2025',
    description: [
      'Built and modernized iOS features for RBC Direct Investing, including SwiftUI migrations, analytics, and automated testing.',
    ],
    technologies: ['Swift', 'SwiftUI', 'MVVM', 'XCTest', 'Jenkins'],
  },
  {
    title: 'Mobile Software Developer Intern',
    company: 'Remsoft',
    location: 'Ottawa, ON',
    period: 'May 2024 — Aug 2024',
    description: [
      'Built cross-platform geospatial features and native mobile plugins for offline field workflows.',
    ],
    technologies: ['Flutter', 'Kotlin', 'Swift', 'AES-CBC'],
  },
  {
    title: 'Software Developer',
    company: 'Ontario Government',
    location: 'Toronto, ON',
    period: 'May 2023 — Sept 2023',
    description: [
      'Built secure internal tools for Ontario’s judiciary, spanning app security, automation, and system modernization.',
    ],
    technologies: ['Python', 'Selenium', 'C#', '.NET'],
  },
];
