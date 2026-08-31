import type { CSSProperties } from 'react';
import type { IconType } from 'react-icons';
import { DiReact, DiCss3Full, DiNodejs, DiPostgresql, DiGit, DiDocker } from 'react-icons/di';
import { SiTypescript, SiVite, SiExpress, SiFigma } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { TbApi } from 'react-icons/tb';
import styles from './skillBubbles.module.css';

export type SkillCategory = 'frontend' | 'backend' | 'other';

export type Skill = {
    name: string;
    category: SkillCategory;
};

type SkillBubblesProps = {
    skills: Skill[];
};

const CATEGORY_ORDER: SkillCategory[] = ['frontend', 'backend', 'other'];

/** Label + accent color per category. Accent drives the bubble border/icon/glow via --accent. */
const CATEGORY_META: Record<SkillCategory, { label: string; accent: string }> = {
    frontend: { label: 'Frontend', accent: '#29bcbc' },
    backend: { label: 'Backend', accent: '#f2a154' },
    other: { label: 'Other', accent: '#b98be0' },
};

/**
 * Skill name -> icon. Devicon (react-icons/di) is the primary set per Wyatt's
 * call, but it's missing several of these (TypeScript, Vite, Express, Figma,
 * AWS), so those fall back to Simple Icons / Font Awesome / Tabler. A skill
 * with no entry here falls back to its initial letter (see SkillIcon below).
 */
const SKILL_ICONS: Record<string, IconType> = {
    React: DiReact,
    CSS: DiCss3Full,
    'Node.js': DiNodejs,
    PostgreSQL: DiPostgresql,
    Git: DiGit,
    Docker: DiDocker,
    TypeScript: SiTypescript,
    Vite: SiVite,
    Express: SiExpress,
    Figma: SiFigma,
    AWS: FaAws,
    'REST APIs': TbApi,
};

/** Cycled by a running index (across all categories) so neighboring bubbles don't bob in sync. */
const BOB_DURATIONS = [2.6, 3.1, 2.8, 3.4, 3, 2.9, 3.2, 2.7];
const BOB_DELAYS = [0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1];

/** One circular skill badge — an icon when we have one mapped, otherwise the skill's initial. Always carries the name via aria-label/title since the icon alone isn't always self-explanatory. */
const SkillIcon = ({ name }: { name: string }) => {
    const Icon = SKILL_ICONS[name];
    return Icon ? <Icon aria-hidden="true" /> : <span aria-hidden="true">{name.charAt(0)}</span>;
};

/** Renders skills grouped into Frontend/Backend/Other, each category its own standalone circle (no enclosing box), with individual skills as smaller circular icon badges inside. */
const SkillBubbles = ({ skills }: SkillBubblesProps) => {
    let bubbleIndex = 0;

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.heading}>Tech Stack</h2>
            <div className={styles.categories}>
                {CATEGORY_ORDER.map((category) => {
                    const categorySkills = skills.filter((skill) => skill.category === category);
                    if (categorySkills.length === 0) return null;

                    const { label, accent } = CATEGORY_META[category];
                    const categoryStyle = { ['--accent' as string]: accent } as CSSProperties;

                    return (
                        <div className={styles.categoryGroup} key={category} style={categoryStyle}>
                            <h3 className={styles.categoryLabel}>{label}</h3>
                            <div className={styles.category}>
                                <div className={styles.bubbleRow}>
                                    {categorySkills.map((skill) => {
                                        const i = bubbleIndex++;
                                        const bubbleStyle = {
                                            ['--bob-duration' as string]: `${BOB_DURATIONS[i % BOB_DURATIONS.length]}s`,
                                            ['--bob-delay' as string]: `${BOB_DELAYS[i % BOB_DELAYS.length]}s`,
                                        } as CSSProperties;

                                        return (
                                            <span
                                                className={styles.bubble}
                                                key={skill.name}
                                                style={bubbleStyle}
                                                role="img"
                                                aria-label={skill.name}
                                            >
                                                <SkillIcon name={skill.name} />
                                                <span className={styles.tooltip} aria-hidden="true">
                                                    {skill.name}
                                                </span>
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SkillBubbles;
