/* ==========================================================================
   PORTFOLIO DATA: edit this file to update the whole site.
   Icon names available: code, network, wrench, palette, terminal, layers,
   shield, cpu, server, rocket, graduation, briefcase, award, folder
   ========================================================================== */

export const profile = {
  name: 'Caleb Kipkorir Tallam',
  // Single editable status label (shown once, in the hero badge).
  // Later change to e.g. "Computer Science Graduate" or "Network Engineer".
  studentStatus: 'Computer Science Student',
  headline: 'Building reliable networks and thoughtful web experiences.',
  tagline: 'Computer Science • Networking • Technology',
  intro:
    "I'm a Computer Science student in Kenya with a practical interest in networking, network security, web development and IT support. I like understanding how systems work and making them work better.",
  degree: 'Bachelor of Science in Computer Science',
  university: 'Kirinyaga University',
  location: 'Kenya',
  resumeUrl: '', // e.g. '/cv.pdf' (place the file in a /public folder). Empty = hidden.
  // Contact details: leave '' until you are ready to add them.
  email: 'tallamcaleb00@gmail.com',
  phone: '0745710817',
  github: '', // full URL, e.g. 'https://github.com/username'
  linkedin: '', // full URL
};

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const about = {
  paragraphs: [
    "I'm studying Computer Science and building practical skills across technology, from how networks are put together to how people actually use the things we build.",
    "I enjoy hands-on work: configuring and troubleshooting networks, setting up machines, and building interfaces in React. I've gained real exposure through two industrial attachments in ICT departments.",
    "I'm always learning, and I'm looking for opportunities where I can keep growing while contributing to real systems.",
  ],
  interests: [
    'Networking',
    'Network Security',
    'Web Development',
    'IT Support',
    'Hardware',
    'UI/UX Design',
  ],
};

export const skills = [
  { title: 'Web Development', icon: 'code', items: ['HTML', 'CSS', 'JavaScript', 'React'] },
  {
    title: 'Networking',
    icon: 'network',
    items: ['Computer Networking', 'VLANs', 'Routing', 'OSPF', 'Network Troubleshooting', 'Huawei Networking'],
  },
  {
    title: 'IT Support',
    icon: 'wrench',
    items: ['PC Troubleshooting', 'Hardware Configuration', 'OS Installation', 'General Technical Support'],
  },
  { title: 'Design', icon: 'palette', items: ['Figma', 'UI/UX Design'] },
  { title: 'Tools & Platforms', icon: 'terminal', items: ['Git', 'GitHub', 'Ubuntu/Linux'] },
  // Add a new category: { title: 'Cloud', icon: 'server', items: ['...'] },
];

// Newest first or any order you like. Leave `end` empty for current roles ("Present").
export const experience = [
  {
    id: 'tda',
    organization: 'Technopolis Development Authority (TDA)',
    type: 'Industrial Attachment',
    department: 'ICT',
    location: 'Konza Technopolis, Kenya',
    start: 'May 2026',
    end: 'August 2026',
    description:
      'Industrial attachment in the ICT department, working in areas related to networking and IT infrastructure.',
    focusAreas: [
      'Networking',
      'Network Infrastructure',
      'Data Center Operations',
      'Network/Security Support',
      'IT Infrastructure',
    ],
    responsibilities: [], // add real bullet points later
    technologies: [], // add real tools later
  },
  {
    id: 'mtrh',
    organization: 'Moi Teaching and Referral Hospital (MTRH)',
    type: 'Industrial Attachment',
    department: 'ICT',
    location: 'Kenya',
    start: 'May 2025',
    end: 'August 2025',
    description: 'Industrial attachment in the Information and Communication Technology department.',
    focusAreas: [],
    responsibilities: [],
    technologies: [],
  },
];

export const education = [
  {
    id: 'bsc',
    qualification: 'Bachelor of Science in Computer Science',
    institution: 'Kirinyaga University',
    location: 'Kenya',
    period: '', // optional, e.g. '2023 – 2027'
    details: '', // optional short description
  },
];

// Certifications are hidden while empty.
// { id: 'x', name: '...', issuer: '...', date: '...', url: '' }
export const certifications = [];

// Currently learning / exploring
export const learning = [
  { label: 'Networking', icon: 'network' },
  { label: 'Network Security', icon: 'shield' },
  { label: 'Web Development', icon: 'code' },
  { label: 'React', icon: 'layers' },
  { label: 'Linux', icon: 'terminal' },
  { label: 'UI/UX', icon: 'palette' },
];

// Add projects here and they appear automatically (the "coming soon" state disappears).
// {
//   id: 'my-project', name: 'Project name', description: 'What it does.',
//   technologies: ['React', 'CSS'], github: 'https://github.com/...', demo: 'https://...',
//   image: '', imageAlt: '', date: 'March 2027', category: 'Web Development',
// }
export const projects = [];

export const footer = {
  tagline: 'Computer Science student building practical skills in networking and the web.',
};
