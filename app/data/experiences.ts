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
    title: 'Senior Software Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    period: '2022 - Present',
    description: [
      'Led development of a microservices architecture that improved system scalability by 300%',
      'Mentored junior developers and implemented best practices for code review',
      'Architected and deployed cloud-native solutions using AWS and Kubernetes',
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Kubernetes'],
  },
  {
    title: 'Full Stack Developer',
    company: 'StartupX',
    location: 'Remote',
    period: '2020 - 2022',
    description: [
      'Built and launched a real-time analytics dashboard used by 50k+ users',
      'Reduced API response time by 60% through optimization and caching',
      'Implemented CI/CD pipelines and automated testing frameworks',
    ],
    technologies: ['Vue.js', 'Python', 'PostgreSQL', 'Docker', 'Redis'],
  },
  {
    title: 'Software Developer',
    company: 'InnovateLabs',
    location: 'Boston, MA',
    period: '2018 - 2020',
    description: [
      'Developed responsive web applications for enterprise clients',
      'Integrated third-party APIs and payment processing systems',
      'Created reusable component libraries and documentation',
    ],
    technologies: ['Angular', 'Java', 'Spring Boot', 'MySQL', 'RabbitMQ'],
  },
];
