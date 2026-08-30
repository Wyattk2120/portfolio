import TitleCard from './components/titlecard/titlecard';
import ExperienceCard from './components/experienceCard/experienceCard';
import ProjectCard from './components/projectCard/projectCard';
import OceanFloor from './components/oceanfloor/OceanFloor';
import heroImg from './assets/hero.png';
import './App.css'

const FAKE_CREDENTIALS = [
  { title: 'B.S. Computer Science', issuer: 'State University', achieved: '2021' },
  { title: 'AWS Certified Developer', issuer: 'Amazon Web Services', achieved: '2022' },
  { title: 'Full-Stack Web Development', issuer: 'Coding Bootcamp', achieved: '2023' },
];

const FAKE_EXPERIENCES = [
  {
    company: 'Startup Studio',
    position: 'Full-Stack Developer',
    startDate: { month: 9, year: 2023 },
    description: 'Currently building internal tools and shipping features across the stack for a small product team.',
  },
  {
    company: 'Acme Corp',
    position: 'Frontend Engineer',
    startDate: { month: 6, year: 2022 },
    endDate: { month: 8, year: 2023 },
    description: "Built and maintained the company's customer-facing dashboard, focusing on performance and accessibility.",
  },
  {
    company: 'Web Dev Agency',
    position: 'Junior Developer',
    startDate: { month: 1, year: 2021 },
    endDate: { month: 5, year: 2022 },
    description: 'Shipped marketing sites and small e-commerce storefronts for a variety of clients.',
  },
  {
    company: 'State University',
    position: 'Teaching Assistant, Intro to Programming',
    startDate: { month: 8, year: 2019 },
    endDate: { month: 5, year: 2021 },
    description: 'Held office hours and graded assignments for an intro CS course of ~150 students per semester.',
  },
];

const FAKE_PROJECTS = [
  {
    name: 'Ocean Floor Scene',
    image: heroImg,
    description: 'A fully animated CSS ocean floor scene with swaying seaweed and scattered rocks, all scaled proportionally to the viewport.',
    techStack: ['React', 'TypeScript', 'CSS'],
  },
  {
    name: 'Task Tracker',
    image: heroImg,
    description: 'A small Kanban-style app for tracking personal tasks, with drag-and-drop columns and local persistence.',
    techStack: ['React', 'Vite', 'Zustand'],
  },
  {
    name: 'Recipe Finder',
    image: heroImg,
    description: 'Searches a public recipe API and lets users save favorites, with a responsive card grid layout.',
    techStack: ['React', 'REST API', 'CSS Grid'],
  },
];

function App() {
  return (
    <div className="page">
      <TitleCard
        name="Jamie Rivera"
        image={heroImg}
        bio="Web developer who loves building playful, interactive interfaces — currently obsessed with animating an entire ocean floor in CSS. I got my start tinkering with small personal projects and slowly fell in love with the process of turning a blank page into something that moves, responds, and feels alive. Since then I've worked across the stack, from wiring up backend APIs to obsessing over the exact easing curve of a hover animation. When I'm not writing code I'm usually reading about design systems, poking at some new CSS feature that just shipped, or rebuilding something I made years ago now that I know better. I care a lot about the small details — the kind most people never consciously notice, but definitely feel when they're missing."
        credentials={FAKE_CREDENTIALS}
      />
      <ExperienceCard experiences={FAKE_EXPERIENCES} />
      <div className="projectsRow">
        {FAKE_PROJECTS.slice(0, 2).map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
      <OceanFloor />
    </div>
  )
}

export default App
