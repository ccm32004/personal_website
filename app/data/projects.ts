export interface Project {
  title: string;
  description: string;
  image: string;
  demoUrl?: string;
  githubUrl: string;
  technologies: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    title: 'AI-Powered Task Manager',
    description:
      'A smart task management application that uses machine learning to prioritize and categorize tasks. Features natural language processing for task input and intelligent deadline suggestions.',
    image: '/images/project1.jpg',
    demoUrl: 'https://task-manager.demo.com',
    githubUrl: 'https://github.com/username/task-manager',
    technologies: ['React', 'Python', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
    featured: true,
  },
  {
    title: 'Real-time Collaboration Platform',
    description:
      'A WebSocket-based platform enabling real-time document editing, chat, and project management. Supports multiple users with live cursors and instant updates.',
    image: '/images/project2.jpg',
    demoUrl: 'https://collab.demo.com',
    githubUrl: 'https://github.com/username/collab-platform',
    technologies: ['Vue.js', 'Node.js', 'Socket.io', 'MongoDB', 'Docker'],
    featured: true,
  },
  {
    title: 'Blockchain Voting System',
    description:
      'A secure and transparent voting system built on blockchain technology. Features voter verification, real-time vote counting, and immutable record keeping.',
    image: '/images/project3.jpg',
    githubUrl: 'https://github.com/username/blockchain-voting',
    technologies: ['Solidity', 'Ethereum', 'Web3.js', 'React', 'TypeScript'],
    featured: false,
  },
  {
    title: 'E-commerce Analytics Dashboard',
    description:
      'A comprehensive analytics dashboard for e-commerce platforms with real-time sales tracking, inventory management, and predictive analytics.',
    image: '/images/project4.jpg',
    demoUrl: 'https://analytics.demo.com',
    githubUrl: 'https://github.com/username/ecommerce-analytics',
    technologies: ['Next.js', 'GraphQL', 'AWS', 'D3.js', 'Redis'],
    featured: false,
  },
];
