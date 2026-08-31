import { useEffect, useRef, useState } from 'react';
import TitleCard from './components/titlecard/titlecard';
import ExperienceCard from './components/experienceCard/experienceCard';
import SkillBubbles, { type Skill } from './components/skillBubbles/skillBubbles';
import ProjectCard from './components/projectCard/projectCard';
import OceanFloor from './components/oceanfloor/OceanFloor';
import FishBackdrop from './components/fishSchool/FishBackdrop';
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

// Text-only for now — swapping these for a real icon set (react-icons) is the planned next step.
const FAKE_SKILLS: Skill[] = [
  { name: 'React', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'CSS', category: 'frontend' },
  { name: 'Vite', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Express', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'Git', category: 'other' },
  { name: 'Docker', category: 'other' },
  { name: 'Figma', category: 'other' },
  { name: 'AWS', category: 'other' },
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

type Project = (typeof FAKE_PROJECTS)[number];
type SlideDirection = 'next' | 'prev';

const SLIDE_DURATION_MS = 400;

// Mirrors the CSS: --card-font-scale: clamp(4px, 1vw, 9.5px) and the
// card's own `max-width: 30em`, plus .projectSlot's `padding-inline: 1.5vw`
// on both sides of every slot. Kept in one place so "how many cards fit"
// stays in sync with how big the cards actually render.
const CARD_MAX_EM = 30;
const FONT_SCALE_MIN_PX = 4;
const FONT_SCALE_MAX_PX = 9.5;
const FONT_SCALE_VW = 0.01; // 1vw
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
    FAKE_PROJECTS.length,
    Math.max(1, Math.floor((wrapperWidth - ARROW_RESERVED_PX) / getSlotWidthPx(wrapperWidth)))
  );
  const showArrows = numVisible < FAKE_PROJECTS.length;

  const visibleProjects = Array.from(
    { length: numVisible },
    (_, offset) => FAKE_PROJECTS[(projectIndex + offset) % FAKE_PROJECTS.length]
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
      FAKE_PROJECTS[(projectIndex + offset + FAKE_PROJECTS.length) % FAKE_PROJECTS.length];
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
          ? (i + 1) % FAKE_PROJECTS.length
          : (i - 1 + FAKE_PROJECTS.length) % FAKE_PROJECTS.length
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
        name="Jamie Rivera"
        image={heroImg}
        bio="Web developer who loves building playful, interactive interfaces — currently obsessed with animating an entire ocean floor in CSS. I got my start tinkering with small personal projects and slowly fell in love with the process of turning a blank page into something that moves, responds, and feels alive. Since then I've worked across the stack, from wiring up backend APIs to obsessing over the exact easing curve of a hover animation. When I'm not writing code I'm usually reading about design systems, poking at some new CSS feature that just shipped, or rebuilding something I made years ago now that I know better. I care a lot about the small details — the kind most people never consciously notice, but definitely feel when they're missing."
        credentials={FAKE_CREDENTIALS}
      />
      <ExperienceCard experiences={FAKE_EXPERIENCES} />
      <SkillBubbles skills={FAKE_SKILLS} />
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
