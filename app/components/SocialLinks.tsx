'use client';
import { motion } from 'framer-motion';

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/username', // Replace with your GitHub profile
    icon: (
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    ),
    color: 'neon-blue',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/username', // Replace with your LinkedIn profile
    icon: (
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
    ),
    color: 'neon-purple',
  },
  {
    name: 'Email',
    url: 'mailto:your.email@example.com', // Replace with your email
    icon: (
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />
    ),
    color: 'neon-pink',
  },
];

export default function SocialLinks() {
  return (
    <div className="fixed top-6 right-6 z-50 flex gap-4">
      {SOCIAL_LINKS.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-cyber-primary/30 rounded-full border p-3 backdrop-blur-sm border-${social.color} text-${social.color} hover:bg-cyber-primary/50 transition-colors`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.1,
            rotate: 360,
            boxShadow: `0 0 15px ${
              social.color === 'neon-blue'
                ? 'rgba(0, 255, 245, 0.5)'
                : social.color === 'neon-purple'
                  ? 'rgba(157, 78, 221, 0.5)'
                  : 'rgba(255, 46, 99, 0.5)'
            }`,
          }}
          transition={{
            duration: 0.3,
            delay: index * 0.1,
            rotate: { duration: 0.5 },
            boxShadow: { duration: 0.2 },
          }}
        >
          <motion.svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ rotate: 0 }}
            animate={{
              rotate: [0, 5, -5, 0],
              y: [0, -2, 2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          >
            {social.icon}
          </motion.svg>

          {/* Tooltip */}
          <motion.span
            className="bg-cyber-primary pointer-events-none absolute top-1/2 right-full mr-4 -translate-y-1/2 rounded px-3 py-1 text-sm whitespace-nowrap opacity-0"
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
          >
            {social.name}
          </motion.span>
        </motion.a>
      ))}
    </div>
  );
}
