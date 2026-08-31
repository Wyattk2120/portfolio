import { useEffect, useRef, useState } from 'react';
import TitleCard from './components/titlecard/titlecard';
import ExperienceCard from './components/experienceCard/experienceCard';
import SkillBubbles, { type Skill } from './components/skillBubbles/skillBubbles';
import ProjectCard from './components/projectCard/projectCard';
import OceanFloor from './components/oceanfloor/OceanFloor';
import FishBackdrop from './components/fishSchool/FishBackdrop';
import profileImg from './assets/profile-image.jfif';
import heatmapImg from './assets/HeatmapActive.png';
import shapeUpImg from './assets/Shape Up.png';
import portfolioImg from './assets/portfolio.png';
import './App.css'

const CREDENTIALS = [
  { title: 'A.S., Computer Science', issuer: 'Catawba Valley Community College', achieved: '2023' },
  { title: 'B.S., Software Engineering', issuer: 'University of North Carolina Wilmington', achieved: 'Expected Dec 2026' },
];

const EXPERIENCES = [
  {
    company: '45Drives',
    position: 'Solutions Specialist Intern',
    startDate: { month: 5, year: 2026 },
    endDate: { month: 8, year: 2026 },
    description: 'Worked directly with customers to troubleshoot, configure, and maintain high-performance Linux-based storage servers, resolving 90+ support tickets spanning both software and hardware issues.',
    achievements: [
      'Configured and troubleshot Samba, NFS, and iSCSI file-sharing services, including connectivity, permissions, and mounting issues',
      'Diagnosed hardware failures across motherboards, RAM, power supplies, cooling fans, HDDs, SSDs, and NVMe drives',
      'Configured and maintained mdadm software RAID arrays to resolve storage issues',
      'Built and configured servers from scratch — OS install, drive mapping, storage configuration, and network file-share deployment',
      'Provided remote technical support, diagnosing root causes and guiding customers through solutions',
    ],
    closing: 'This role gave me hands-on experience administering Linux servers and enterprise storage systems while strengthening my troubleshooting, communication, and customer-service skills.',
  },
  {
    company: 'Campbell Oil Company',
    position: 'Business Data Support Intern',
    startDate: { month: 6, year: 2025 },
    endDate: { month: 11, year: 2025 },
    description: "Validated customer data using complex logic sets in the company's internal systems, identifying discrepancies and working with executive leadership to resolve issues affecting financial accuracy and customer experience.",
    achievements: [
      'Audited 1,400+ customer accounts, improving pricing and financial accuracy',
      'Found that 40% of accounts needed pricing adjustments, directly improving revenue accuracy',
      'Contacted 1,800+ customers to verify and update account information',
      'Presented findings and process improvements to executive leadership',
      'Partnered with cross-functional teams to troubleshoot and resolve issues',
    ],
    closing: 'This role sharpened my data analysis, communication, and problem-solving skills while delivering measurable value to the organization.',
  },
];

const SKILLS: Skill[] = [
  { name: 'React', category: 'frontend' },
  { name: 'Vite', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'HTML', category: 'frontend' },
  { name: 'CSS', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'AWS Amplify', category: 'frontend' },
  { name: 'Axios', category: 'frontend' },
  { name: 'Vitest', category: 'frontend' },
  { name: 'FontAwesome', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'NestJS', category: 'backend' },
  { name: 'Prisma', category: 'backend' },
  { name: 'Zod', category: 'backend' },
  { name: 'JWT Verification', category: 'backend' },
  { name: 'Jest', category: 'backend' },
  { name: 'Python', category: 'backend' },
  { name: 'AWS', category: 'other' },
  { name: 'Docker', category: 'other' },
  { name: 'Git', category: 'other' },
  { name: 'GitHub', category: 'other' },
  { name: 'Scrum', category: 'other' },
  { name: 'Agile', category: 'other' },
  { name: 'CLI', category: 'other' },
];

const PROJECTS = [
  {
    name: 'Heatmap',
    image: heatmapImg,
    description: 'A web application that visualizes real-time room occupancy by scanning WiFi signals via Raspberry Pis and displays the data as a dynamic heatmap.',
    techStack: ['Python', 'JavaScript', 'Vue.js', 'HTML', 'CSS', 'Node.js', 'Raspberry Pi', 'PostgreSQL', 'Fly.io', 'Playwright'],
    repoUrl: 'https://github.com/Wyattk2120/seng401-project-mawc',
  },
  {
    name: 'Shape Up',
    image: shapeUpImg,
    description: 'A health-based website UI design used to practice utilizing CSS, HTML, and JavaScript.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    repoUrl: 'https://github.com/Wyattk2120/SENG-365-Shape-Up-',
  },
  {
    name: 'Portfolio',
    image: portfolioImg,
    description: 'This site — a personal portfolio with a fully animated ocean scene (swaying seaweed, drifting fish schools, glowing section headers) built on a fluid, clamp()-based scaling system so every card and icon grows proportionally across screen sizes.',
    techStack: ['React', 'TypeScript', 'Vite', 'CSS', 'react-icons'],
    repoUrl: 'https://github.com/Wyattk2120/portfolio',
  },
];

type Project = (typeof PROJECTS)[number];
type SlideDirection = 'next' | 'prev';

const SLIDE_DURATION_MS = 400;

// Mirrors the CSS: --card-font-scale: clamp(6px, 1.55vw, 15px) and the
// card's own `max-width: 32em`, plus .projectSlot's `padding-inline: 1.5vw`
// on both sides of every slot. Kept in one place so "how many cards fit"
// stays in sync with how big the cards actually render.
const CARD_MAX_EM = 32;
const FONT_SCALE_MIN_PX = 6;
const FONT_SCALE_MAX_PX = 15;
const FONT_SCALE_VW = 0.0155; // 1.55vw
const SLOT_PADDING_VW = 0.03; // 1.5vw × 2 sides
const ARROW_RESERVED_PX = 160; // rough space for both arrow buttons + their insets

function getSlotWidthPx(containerWidth: number) {
  const fontScale = Math.min(FONT_SCALE_MAX_PX, Math.max(FONT_SCALE_MIN_PX, containerWidth * FONT_SCALE_VW));
  const cardWidth = fontScale * CARD_MAX_EM;
  return cardWidth + containerWidth * SLOT_PADDING_VW;
}

function App() {
  const [projectIndex, setProjectIndex] = useState(0);
  // While cycling, the track briefly holds one extra card beyond however
  // many are visible — the outgoing edge card, the ones shifting into their
  // neighbor's spot, and the new incoming card — and slides by exactly one
  // card-width, so each card visibly moves to its neighbor's spot instead
  // of the whole visible set teleporting to a new one.
  const [transitionSlots, setTransitionSlots] = useState<Project[] | null>(null);
  const [shiftDirection, setShiftDirection] = useState<SlideDirection>('next');
  const [shiftPx, setShiftPx] = useState(0);
  const [shiftAnimated, setShiftAnimated] = useState(false);
  const [wrapperWidth, setWrapperWidth] = useState(
    () => (typeof window === 'undefined' ? 0 : window.innerWidth)
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const commitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  // How many cards actually fit the available width right now — 3 on a
  // wide screen, 1 on a narrow one — capped at the total project count so
  // we never try to show more cards than exist.
  const numVisible = Math.min(
    PROJECTS.length,
    Math.max(1, Math.floor((wrapperWidth - ARROW_RESERVED_PX) / getSlotWidthPx(wrapperWidth)))
  );
  const showArrows = numVisible < PROJECTS.length;

  const visibleProjects = Array.from(
    { length: numVisible },
    (_, offset) => PROJECTS[(projectIndex + offset) % PROJECTS.length]
  );

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setWrapperWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => {
    if (commitTimeoutRef.current) clearTimeout(commitTimeoutRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const cycleProjects = (direction: SlideDirection) => {
    if (transitionSlots || !showArrows) return; // ignore clicks until the current shift settles, or if everything already fits

    const at = (offset: number) =>
      PROJECTS[(projectIndex + offset + PROJECTS.length) % PROJECTS.length];
    const slots = Array.from({ length: numVisible + 1 }, (_, i) =>
      direction === 'next' ? at(i) : at(i - 1)
    );
    const slotWidth = (viewportRef.current?.clientWidth ?? 0) / numVisible;

    setShiftDirection(direction);
    setTransitionSlots(slots);
    setShiftAnimated(false);
    setShiftPx(direction === 'next' ? 0 : -slotWidth); // starting position matches the current set on screen

    // Two frames so the browser actually paints that starting position
    // before we enable the transition and move to the target — otherwise
    // the browser can coalesce both changes and the shift never animates.
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        setShiftAnimated(true);
        setShiftPx(direction === 'next' ? -slotWidth : 0);
      });
    });

    if (commitTimeoutRef.current) clearTimeout(commitTimeoutRef.current);
    commitTimeoutRef.current = setTimeout(() => {
      setProjectIndex((i) =>
        direction === 'next'
          ? (i + 1) % PROJECTS.length
          : (i - 1 + PROJECTS.length) % PROJECTS.length
      );
      setTransitionSlots(null);
      setShiftAnimated(false);
      setShiftPx(0);
    }, SLIDE_DURATION_MS);
  };

  const showPreviousProjects = () => cycleProjects('prev');
  const showNextProjects = () => cycleProjects('next');

  return (
    <div className="page">
      <FishBackdrop />
      <TitleCard
        name="Wyatt King"
        image={profileImg}
        bio="I'm an aspiring software developer with a passion for problem-solving, continuous learning, and building things that make a real impact. My current goal is to land a software development role where I can grow technically, contribute meaningfully to a team, and keep pushing myself to learn new tools, technologies, and ways of thinking. Long term, I’m working toward building a career that not only supports me and my family, but also gives me the freedom to explore my hobbies, support the people around me, and possibly one day start something of my own. I believe in using tech to solve real problems, and I’m motivated by the idea of creating systems, products, or tools that help people work smarter or live better. Whether it’s through writing clean code, collaborating with others, or just staying curious, I’m excited to keep learning and growing and to build a career I can be proud of."
        credentials={CREDENTIALS}
      />
      <ExperienceCard experiences={EXPERIENCES} />
      <SkillBubbles skills={SKILLS} />
      <div className="projectsSectionWrapper">
        <h2 className="projectsHeading">Projects</h2>
        <div className="projectsWrapper" ref={wrapperRef}>
          {showArrows && (
            <button
              type="button"
              className="arrowButton arrowLeft"
              onClick={showPreviousProjects}
              aria-label="Show previous project"
            >
              ‹
            </button>
          )}
          <div
            className="projectsSection"
            style={{ maxWidth: getSlotWidthPx(wrapperWidth) * numVisible }}
          >
            <div className="projectsViewport" ref={viewportRef}>
              {transitionSlots ? (
                <div
                  className="projectsTrack"
                  style={{
                    transform: `translateX(${shiftPx}px)`,
                    transition: shiftAnimated ? `transform ${SLIDE_DURATION_MS}ms ease` : 'none',
                  }}
                >
                  {transitionSlots.map((project, i) => (
                    <div
                      className="projectSlot"
                      style={{ flexBasis: `${100 / numVisible}%` }}
                      key={`${project.name}-${shiftDirection}-${i}`}
                    >
                      <ProjectCard {...project} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="projectsTrack">
                  {visibleProjects.map((project) => (
                    <div
                      className="projectSlot"
                      style={{ flexBasis: `${100 / numVisible}%` }}
                      key={project.name}
                    >
                      <ProjectCard {...project} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {showArrows && (
            <button
              type="button"
              className="arrowButton arrowRight"
              onClick={showNextProjects}
              aria-label="Show next project"
            >
              ›
            </button>
          )}
        </div>
      </div>
      <OceanFloor />
    </div>
  )
}

export default App
