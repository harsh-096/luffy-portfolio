export interface Project {
  id: string
  title: string
  date: string
  category: 'ai' | 'fullstack' | 'ml'
  description: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  image: string
}

export interface Experience {
  id: string
  company: string
  companyUrl?: string
  role: string
  type: string
  period: string
  description: string[]
  tags: string[]
}

export interface Education {
  id: string
  institution: string
  institutionUrl?: string
  degree: string
  period: string
  details?: string
}

export interface SkillCategory {
  category: string
  skills: string[]
}

export interface MediaItem {
  id: string
  title: string
  category: 'anime' | 'movies' | 'series' | 'music'
  image: string
  year?: string
  artist?: string
  url?: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  date: string
  readTime: string
  description: string
  tags: string[]
  image: string
  content?: string
}

export const calculateAge = (birthDate: Date = new Date(2005, 10, 24)): number => {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export const portfolioData = {
  profile: {
    name: 'Harsh Parmar',
    handle: 'harsh-096',
    title: 'AI Systems & Full-Stack Engineer',
    location: 'Vadodara, India',
    birthDate: '24/11/2005',
    verified: true,
    taglines: [
      'AI Systems & Full-Stack Engineer',
      'Autonomous Agents & RAG Architect',
      `${calculateAge()} y/o • Builder & Engineer`,
      'Vadodara, Gujarat, India',
    ],
    avatarUrl: '/hero_pfp.png',
    status: 'Building AI systems & open to opportunities',
    email: 'hpparmar8899@gmail.com',
    github: 'https://github.com/harsh-096',
    twitter: 'https://x.com/Pharsh_096',
    linkedin: 'https://www.linkedin.com/in/harshparmar096/',
    resume: '/Resume.pdf',
  },

  about: {
    paragraphs: [
      "I'm a builder and systems engineer who turns ideas into working systems. I enjoy working at the intersection of AI, autonomous agents, and real-world software—whether that means architecting multi-agent reasoning loops, designing high-throughput RAG pipelines, or delivering resilient full-stack applications.",
      "At Sprouto Infosolution, I engineer production AI products including Robofy.ai (enterprise RAG chatbots) and Growby.net (WhatsApp Business API and conversational AI agents). On my own time, I build autonomous trading agents (KIRAN & ARJUN) with self-learning feedback loops, and an experimental prompt-to-app platform with multi-agent architecture.",
      "I don't see growth as just checking off skills, but as becoming more disciplined, curious, and aligned with what I build. I believe in learning by shipping and seeing problems through to completion.",
    ],
  },

  nowPlaying: {
    title: 'Die For You',
    artist: 'The Weeknd',
    album: 'Starboy',
    songUrl: 'https://open.spotify.com/track/2Ch7LmS7r2Gy2kc64wv3Bz',
    albumArtUrl: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e024718e2b124f79258be7bc452',
    defaultPlaying: false,
  },

  connectLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/harsh-096',
      icon: 'github',
    },
    {
      name: 'Twitter',
      url: 'https://x.com/Pharsh_096',
      icon: 'twitter',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/harshparmar096/',
      icon: 'linkedin',
    },
    {
      name: 'Mail',
      url: 'mailto:hpparmar8899@gmail.com',
      icon: 'mail',
    },
    {
      name: 'Resume',
      url: '/Resume.pdf',
      icon: 'resume',
    },
  ],

  projects: [
    {
      id: 'kiran',
      title: 'KIRAN — Autonomous Trading Agent',
      date: '05.2026',
      category: 'ai',
      description:
        'Autonomous intraday trading AI agent for NSE/BSE. Features autonomous signal generation with a self-learning feedback loop and Upstox API integration for live market order execution.',
      tags: ['Python', 'AI Agents', 'Upstox API', 'Technical Analysis', 'Market Data'],
      githubUrl: 'https://github.com/harsh-096/kiran',
      liveUrl: 'https://github.com/harsh-096/kiran',
      image: '/dashboard1.png',
    },
    {
      id: 'prompt-to-app',
      title: 'Prompt-to-App Multi-Agent Platform',
      date: '04.2026',
      category: 'ai',
      description:
        'A Lovable/Bolt.new-style platform with a working prototype. Architected Planner, Builder, and Reviewer agents orchestrating full-stack web generation with SSE-based diff streaming.',
      tags: ['Multi-Agent Architecture', 'SSE Streaming', 'React', 'Python', 'BYOK LLM'],
      githubUrl: 'https://github.com/harsh-096',
      image: '/portfolio.png',
    },
    {
      id: 'robofy',
      title: 'Robofy.ai — Enterprise RAG Platform',
      date: '05.2026',
      category: 'ai',
      description:
        'AI chatbot platform serving live production traffic. Built retrieval-augmented generation pipelines and deployed AI agents across web, WhatsApp, and Slack channels.',
      tags: ['Python', 'RAG', 'LLM Integration', 'Multi-channel', 'FastAPI'],
      liveUrl: 'https://robofy.ai',
      image: '/prediction.png',
    },
    {
      id: 'growby',
      title: 'Growby.net — WhatsApp AI Engine',
      date: '05.2026',
      category: 'fullstack',
      description:
        'WhatsApp Business API + AI agent platform. Engineered contact management, campaign systems, and deployed conversational AI agents across multiple client channels.',
      tags: ['.NET/C#', 'React', 'WhatsApp Business API', 'DynamoDB'],
      liveUrl: 'https://growby.net',
      image: '/dashboard1.png',
    },
    {
      id: 'arjun',
      title: 'ARJUN — Autonomous Swing Trading Agent',
      date: '03.2026',
      category: 'ai',
      description:
        'Autonomous swing-trading AI agent for 2–15 day hold periods. Features Fibonacci and EMA-based structural stop-loss patterns and backtesting against historical market trends.',
      tags: ['Python', 'Quantitative Finance', 'AI Agents', 'Backtesting'],
      githubUrl: 'https://github.com/harsh-096',
      image: '/portfolio.png',
    },
    {
      id: 'dotnet-auditor',
      title: '.NET API Production Auditor',
      date: '02.2026',
      category: 'fullstack',
      description:
        'Production-readiness diagnostic tool for .NET/C# APIs deployed on AWS App Runner. Findings-first reporting with automated checks across security, performance, and architecture.',
      tags: ['.NET/C#', 'AWS App Runner', 'API Security', 'Automation'],
      githubUrl: 'https://github.com/harsh-096/contacts_dotnet_10',
      image: '/prediction.png',
    },
    {
      id: 'water-potability',
      title: 'Water Potability ML Predictor',
      date: '01.2026',
      category: 'ml',
      description:
        'Data-driven machine learning system evaluating water quality metrics and predicting potability. Interactive analysis dashboard with Streamlit and Scikit-learn.',
      tags: ['Python', 'Scikit-Learn', 'Pandas', 'Streamlit', 'Data Science'],
      githubUrl: 'https://github.com/harsh-096',
      image: '/prediction.png',
    },
  ] as Project[],

  experiences: [
    {
      id: 'sprouto',
      company: 'Sprouto Infosolution',
      companyUrl: 'https://sprouto.com',
      role: 'Software Engineer',
      type: 'Full-time',
      period: '05.2026 — Present',
      description: [
        'Designed and implemented production-grade RAG systems for context-aware customer queries on Robofy.ai.',
        'Engineered multi-channel AI agent deployment across Web, WhatsApp Business API, and Slack.',
        'Architected backend services and API integrations using .NET/C#, Python, and React.',
      ],
      tags: ['Python', 'RAG', 'LLMs', '.NET/C#', 'React', 'WhatsApp API', 'DynamoDB'],
    },
    {
      id: 'codetta',
      company: 'Codetta Digital',
      companyUrl: 'https://codettadigital.com',
      role: 'Software Developer Intern',
      type: 'Internship',
      period: '01.2026 — 04.2026',
      description: [
        'Engineered a modern full-stack e-commerce web platform with Next.js and Prisma.',
        'Optimized data fetching and server caching layers, slashing redundant API build requests from ~52,000 to ~1,000.',
        'Designed database schemas and cloud media asset pipelines on AWS S3 and PostgreSQL.',
      ],
      tags: ['Next.js', 'React', 'TypeScript', 'Prisma', 'AWS S3', 'PostgreSQL'],
    },
    {
      id: 'csr-box',
      company: 'CSR Box',
      role: 'Data Analyst Intern',
      type: 'Internship',
      period: '07.2025 (1 month)',
      description: [
        'Designed interactive Power BI dashboards tracking financial KPIs and social initiative outcomes.',
        'Conducted data modeling and reporting utilizing SAP Analytics Cloud and Python.',
      ],
      tags: ['Power BI', 'SAP Analytics Cloud', 'SQL', 'Python', 'Data Modeling'],
    },
    {
      id: 'bluestock',
      company: 'Bluestock Fintech',
      role: 'SDE Intern',
      type: 'Internship',
      period: '04.2025 — 05.2025',
      description: [
        'Built an IPO tracking and financial analysis dashboard with React.js and Tailwind CSS.',
        'Integrated real-time financial market APIs for dynamic charts and stock indicators.',
      ],
      tags: ['React.js', 'REST APIs', 'Tailwind CSS', 'Fintech'],
    },
  ] as Experience[],

  education: [
    {
      id: 'svit',
      institution: 'Sardar Vallabhbhai Patel Institute of Technology (SVIT)',
      institutionUrl: 'https://svitvasad.ac.in',
      degree: 'Bachelor of Engineering · Information Technology',
      period: '2022 — 2026',
      details: 'CGPA: 8.44 / 10 · Focus on Systems Architecture, Distributed Data, and Machine Learning.',
    },
    {
      id: 'certs',
      institution: 'Professional Certifications',
      degree: 'SAP & Cloud Accreditations',
      period: '2024 — 2026',
      details: '• SAP Certified Data Analyst (C_SAC_2501)\n• SAP Technology Consultant\n• Meta Python Programming (Coursera)\n• IBM Data Science Professional',
    },
  ] as Education[],

  skills: [
    {
      category: 'AI / ML Systems',
      skills: [
        'RAG Architecture',
        'Multi-Agent Systems',
        'LLM Integration',
        'Autonomous Agents',
        'BYOK Connector Design',
        'Prompt Engineering',
        'Vector Databases',
      ],
    },
    {
      category: 'Full-Stack',
      skills: [
        'React',
        'Next.js',
        '.NET / C#',
        'TypeScript',
        'Node.js',
        'REST API Design',
        'Tailwind CSS',
        'Prisma ORM',
      ],
    },
    {
      category: 'Infrastructure & Cloud',
      skills: [
        'Docker',
        'AWS S3',
        'AWS App Runner',
        'DynamoDB',
        'PostgreSQL',
        'Git & CI/CD',
        'ngrok',
      ],
    },
    {
      category: 'Data & Analytics',
      skills: [
        'SQL',
        'Power BI',
        'SAP Analytics Cloud',
        'Python (Pandas / NumPy)',
        'Data Modeling',
        'Scikit-Learn',
      ],
    },
  ] as SkillCategory[],

  favourites: [
    // Anime / Favs
    {
      id: 'one-piece',
      title: 'One Piece',
      category: 'anime',
      year: '1999',
      image: '/posters/one-piece.jpg',
    },
    {
      id: 'vinland-saga',
      title: 'Vinland Saga',
      category: 'anime',
      year: '2019',
      image: '/posters/vinland-saga.jpg',
    },
    {
      id: 'black-clover',
      title: 'Black Clover',
      category: 'anime',
      year: '2017',
      image: '/posters/black-clover.jpg',
    },

    // Series
    {
      id: 'suits',
      title: 'Suits',
      category: 'series',
      year: '2011',
      image: '/posters/suits.jpg',
    },
    {
      id: 'mr-robot',
      title: 'Mr. Robot',
      category: 'series',
      year: '2015',
      image: '/posters/mr-robot.jpg',
    },
    {
      id: 'scam-1992',
      title: 'Scam 1992: The Harshad Mehta Story',
      category: 'series',
      year: '2020',
      image: '/posters/scam-1992.jpg',
    },
  ] as MediaItem[],

  blogs: [
    {
      id: 'beyond-naive-rag',
      title: 'Architecting Autonomous AI Agents: Beyond Naive RAG to Multi-Agent Reasoning',
      slug: 'beyond-naive-rag',
      date: '24.02.2026',
      readTime: '6 min read',
      description:
        'Lessons from shipping production enterprise AI at Robofy and building autonomous financial trading agents. Why single-turn retrieval breaks down at scale, and how context routing, verification loops, and deterministic guardrails solve real-world reliability.',
      tags: ['AI Agents', 'RAG Systems', 'Architecture', 'Python'],
      image:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    },
  ] as BlogPost[],

  quote: {
    text: "As long as I live, there are infinite chances!",
    author: 'Monkey D. Luffy',
  },
}
