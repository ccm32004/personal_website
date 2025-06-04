export interface Project {
  title: string;
  description: string;
  image?: string;
  demoUrl?: string;
  githubUrl: string;
  technologies: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    title: 'CeceBot',
    description:
      'AI-powered chatbot using the Mistral language model for real-time conversation and personalized Q&A.',
    image: '/images/cecebot.png',
    demoUrl: 'https://cecebot.vercel.app',
    githubUrl: 'https://github.com/cecemei/cecebot',
    technologies: ['Python', 'FastAPI', 'MiniLM', 'Pinecone'],
    featured: true,
  },
  {
    title: 'Personal Website',
    description: 'Modern portfolio website',
    image: '/images/portfolio.png',
    demoUrl: 'https://cecema.com',
    githubUrl: 'https://github.com/ccm32004/personal-website',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    featured: true,
  },
  {
    title: 'MelodyMatch',
    description: 'Full-stack web app where users guess songs from Spotify snippets.',
    image: '/images/melodymatch.png',
    demoUrl: 'https://melodymatch.cc',
    githubUrl: 'https://github.com/ccm32004/song_guesser',
    technologies: ['Mantine', 'Redis', 'MongoDB', 'AWS EC2', 'Nginx'],
    featured: true,
  },
  {
    title: 'Closet Wear Predictor',
    description:
      'Interactive ML app predicting clothing wear frequency. Uses Random Forest regression.',
    image: '/images/wear.png',
    githubUrl: 'https://github.com/yourusername/closet_efficiency_predictor',
    technologies: ['Python', 'Streamlit', 'scikit-learn', 'Docker'],
    featured: false,
  },
  {
    title: 'AcneVue',
    description: 'Classifies skin conditions from user photos, with TensorFlow CNN',
    image: '/images/acnevue.png',
    githubUrl: 'https://github.com/ccm32004/acnevue',
    technologies: ['TensorFlow', 'Keras', 'React', 'Flask', 'Tailwind CSS'],
    featured: false,
  },
  {
    title: 'EcoQuest',
    description: 'Users track eco-friendly actions, competing on a leaderboard.',
    image: '/images/ecoquest.png',
    githubUrl: 'https://github.com/ccm32004/ecoquest',
    technologies: ['React.js', 'TypeScript', 'Express.js', 'PostgreSQL'],
    featured: false,
  },
  {
    title: 'Rate My Study Space',
    description: 'Dynamic site for reviewing campus study spots. Winner at UOttaHack.',
    githubUrl: 'https://github.com/yourusername/rate-my-study-space',
    technologies: ['HTML', 'Bootstrap', 'JavaScript', 'AWS DynamoDB'],
    featured: false,
  },
  {
    title: 'Ehotel',
    description: 'Hotel booking web app !',
    githubUrl: 'https://github.com/yourusername/ehotel',
    technologies: ['MySQL', 'Express.js', 'HTML', 'CSS', 'JavaScript'],
    featured: false,
  },
];
