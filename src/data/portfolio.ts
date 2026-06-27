export interface SocialLink {
  label: string
  href: string
}

export interface Experience {
  company: string
  role: string
  location: string
  period: string
  highlights: string[]
}

export interface Project {
  title: string
  tech: string[]
  description: string[]
  github: string
}

export interface Education {
  institution: string
  degree: string
  period: string
  detail: string
}

export interface Leadership {
  role: string
  organization: string
  period: string
}

export interface Achievement {
  title: string
  detail: string
  year: string
}

export interface SkillCategory {
  category: string
  items: string[]
}

export const portfolio = {
  name: 'Anushka Thakur',
  handle: 'CircuitFae',
  tagline: 'B.Tech Civil Engineering · Minor in CS · NIT Warangal',
  headline: 'Software Engineer · Full-Stack Developer · AI Enthusiast',
  bio: 'Civil + Computer Science student at NIT Warangal building full-stack applications, AI-powered tools, and high-performance systems. Passionate about software engineering, generative AI, and solving real-world problems through code.',
  email: 'anushkathakur2630@gmail.com',
  phone: '+91-9304376936',
  resumePath: '/Anushka-Thakur-Resume.pdf',
  profileImage: '/profile.jpg',
  socials: [
    { label: 'GitHub', href: 'https://github.com/CircuitFae' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/anushka-thakur' },
    { label: 'Email', href: 'mailto:anushkathakur2630@gmail.com' },
  ] as SocialLink[],
  navLinks: [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ],
  experience: [
    {
      company: 'Xelron AI',
      role: 'Software Development Engineer Intern',
      location: 'Bengaluru, Karnataka',
      period: 'Ongoing',
      highlights: [
        'Built 32 Dockerized debugging benchmarks for the AfterQuery Pluto platform with Python/Bash failure scenarios, oracle solutions, and pytest-based verification suites with 1,200+ automated validation checks.',
        'Delivered all 32 tasks through Pluto\'s evaluation pipeline, achieving 25 approved benchmarks and 7 Ready-for-Review submissions after validation across 13 LLM evaluation runs per task.',
      ],
    },
    {
      company: 'AICTE Edunet Foundation',
      role: 'AI & Cloud Technology Intern',
      location: 'Remote',
      period: 'Sep 2025 – Oct 2025',
      highlights: [
        'Completed a 4-week AI & Cloud Technology internship with 20+ hours of training in Machine Learning and AI Ethics through IBM SkillsBuild.',
        'Designed and developed AURA, an AI-powered Medichatbot application, independently executing all 4 phases of the development lifecycle.',
      ],
    },
  ] as Experience[],
  projects: [
    {
      title: 'Algorithmic Trading Engine Simulator',
      tech: ['Java 17', 'Maven', 'Swing', 'Multithreading'],
      description: [
        'Built a multi-threaded stock exchange simulator supporting limit/market orders, real-time trade execution, and portfolio settlement across multiple assets.',
        'Designed a thread-safe order matching engine using PriorityQueue, ConcurrentHashMap, and ReentrantLock with FIFO and Pro-Rata matching strategies.',
        'Applied Strategy and Observer design patterns for pluggable matching algorithms and automated portfolio updates.',
      ],
      github: 'https://github.com/CircuitFae/trading-engine-simulator',
    },
    {
      title: 'AI Student Travel Planner',
      tech: ['Python', 'Streamlit', 'Uvicorn', 'Gemini API'],
      description: [
        'Developed a full-stack Generative AI travel planning platform that generates personalized student-friendly itineraries based on destination, budget, and preferences.',
        'Built a responsive Streamlit frontend and asynchronous Uvicorn-powered backend for seamless itinerary generation.',
        'Integrated Google Gemini APIs with secure API key management, reducing manual trip-planning effort by approximately 70%.',
      ],
      github: 'https://github.com/CircuitFae/Ai---Travel-Planner',
    },
    {
      title: 'AURA Medichatbot',
      tech: ['Python', 'AI/Cloud', 'IBM SkillsBuild'],
      description: [
        'AI-powered medical chatbot developed during AICTE Edunet Foundation internship.',
        'End-to-end development across all 4 phases of the software lifecycle.',
        'Leveraged cloud and AI technologies for intelligent health assistance.',
      ],
      github: 'https://github.com/CircuitFae/AI-medichatbot-AURA-',
    },
  ] as Project[],
  skills: [
    { category: 'Languages', items: ['C++', 'Java', 'Python', 'SQL', 'JavaScript', 'HTML/CSS'] },
    { category: 'Frameworks & Libraries', items: ['ReactJS', 'Tailwind CSS', 'LangChain'] },
    { category: 'CS Fundamentals', items: ['DSA', 'OS', 'OOP', 'DBMS', 'CN'] },
    { category: 'Tools', items: ['Git', 'Docker', 'Maven', 'Linux', 'Google Cloud Platform'] },
    { category: 'Soft Skills', items: ['Problem Solving', 'Analytical Thinking', 'Team Collaboration', 'Communication', 'Leadership'] },
    { category: 'Interests', items: ['Software Engineering', 'Full-Stack Development', 'AI/ML', 'GenAI'] },
  ] as SkillCategory[],
  education: [
    {
      institution: 'National Institute of Technology, Warangal',
      degree: 'B.Tech in Civil Engineering & Minor in Computer Science Engineering',
      period: '2023 – 2027',
      detail: 'CGPA: 8.85/10 (Major) | 8.75/10 (Minor)',
    },
    {
      institution: 'Delhi Public School, Ranchi',
      degree: 'Senior Secondary (CBSE)',
      period: '2023',
      detail: 'Percentage: 94.8%',
    },
    {
      institution: 'St. Thomas School, Ranchi',
      degree: 'Secondary (ICSE)',
      period: '2021',
      detail: 'Percentage: 97.6%',
    },
  ] as Education[],
  leadership: [
    { role: 'Additional Secretary (PR Wing)', organization: 'Software Development Club (SDC)', period: '2025 – 2026' },
    { role: 'Executive Member', organization: 'Hindi Literary and Debating Club (HLDC)', period: '2023 – 2026' },
    { role: 'Joint Secretary', organization: 'Civil Engineering Association (CEA)', period: '2023 – 2026' },
    { role: 'College Ambassador', organization: 'IIT Bombay Techfest', period: '2025' },
  ] as Leadership[],
  achievements: [
    { title: 'JEE Advanced & IAT', detail: 'Qualified JEE Adv. and Secured AIR 2344 in IISER Aptitude Test', year: '2023' },
    { title: 'Minor in Computer Science', detail: 'Ranked in the top 10% of students; selected based on academic merit', year: '2023' },
    { title: 'Competitive Programming', detail: 'Rating: 1071 on Codeforces', year: 'Ongoing' },
    { title: 'National-Level Arithmetic Competition', detail: 'Secured All India Rank 4', year: '2016' },
    { title: 'SOF National Science Olympiad', detail: 'Secured State Rank 12', year: '2015' },
    { title: 'Hackathons', detail: 'Participated in Smart India National Hackathon & SupraThon 2K25', year: '2025' },
    { title: 'UCMAS Mental Arithmetic', detail: 'Participant Certification in International Std. Proficiency Exam', year: '2018' },
  ] as Achievement[],
}
