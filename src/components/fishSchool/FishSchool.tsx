import Fish from './Fish';
import styles from './FishSchool.module.css';

type FishSchoolProps = {
    /** Which side of the page this cluster sits in. */
    side: 'left' | 'right';
    /** Vertical position of the cluster, e.g. '30%'. */
    top: string;
    /** How many fish in this cluster. */
    count?: number;
    /** Offsets which pool entries this school's fish start from, so multiple
        schools drawing from the same size/timing/scatter pools don't come
        out as the same layout repeated — and adds a flat delay on top so
        whole schools drift out of phase with each other, not just the fish
        within one school. */
    seed?: number;
    /** Faces the whole school left instead of the natural rightward-facing draw. */
    flip?: boolean;
};

/** Cycled by index so neighboring fish in a cluster don't share identical
    timing/size — same trick as OceanFloor's seaweed patch. */
const SIZES = [3.5, 4.5, 3, 5, 4, 3.2, 4.2, 3.8, 4.8, 3.6, 4.6, 3.1, 4.9, 3.9, 4.3, 3.4];
const DRIFT_RANGES = [1.2, 1.8, 1.5, 2, 1.4, 2.2, 1.6, 1.9, 1.3, 1.7, 2.1, 1.1, 1.5, 1.9, 1.3, 2];
const DRIFT_DURATIONS = [5, 6.5, 5.8, 7, 6, 6.8, 5.4, 7.4, 6.2, 5.6, 6.9, 5.2, 7.2, 6.4, 5.9, 6.6];
const DRIFT_DELAYS = [0, 0.8, 1.6, 0.4, 1.2, 2, 0.6, 1.8, 1, 0.2, 1.4, 2.2, 0.5, 1.7, 0.9, 2.1];
const BOB_DURATIONS = [3.2, 3.8, 3, 4.1, 3.5, 3.9, 3.3, 4.3, 3.6, 3.1, 4, 3.4, 4.2, 3.7, 3, 4.4];
const BOB_DELAYS = [0, 0.5, 1, 0.3, 0.7, 1.2, 0.4, 0.9, 0.2, 0.6, 1.1, 0.3, 0.8, 0.1, 1, 0.5];
/** Scatter within the cluster, as % of the school container. */
const OFFSETS_TOP = [0, 40, 15, 55, 30, 65, 5, 45, 25, 70, 10, 50, 35, 60, 20, 75];
const OFFSETS_LEFT = [0, 25, 45, 10, 60, 35, 55, 5, 65, 20, 50, 70, 15, 40, 30, 60];

/**
 * Base distance from the page's own center to where a school's inner edge
 * sits — covers the content's own edge (~400px half-width, the widest
 * section) plus the school's own ~220px width, so at the narrow end of the
 * visible range (right above the 900px hide breakpoint) the school sits
 * right up against the content.
 */
const CONTENT_CLEARANCE_PX = 620;

/**
 * Extra gap added on top of that base clearance, growing with the viewport
 * — without this, once the page's cards hit their own fixed max width
 * (around ~925px viewport, where their font-size clamp caps out), the
 * anchor above is a flat number and the fish stay bunched at the same
 * distance from the content forever, no matter how wide the screen gets.
 * `(100vw - 925px) * 0.15` only starts growing past that same ~925px point
 * (it's ~0 at/below it), so narrower screens keep the tight base spacing
 * and wider ones push the schools further out — capped at 400px so they
 * don't drift absurdly far on an ultra-wide monitor.
 */
const WIDE_SCREEN_GAP = 'clamp(0px, (100vw - 925px) * 0.15, 400px)';

/** A loose cluster of Fish, positioned in one of the page's empty side margins. Purely decorative — hidden below a width where those margins disappear (see .school in FishSchool.module.css). */
const FishSchool = ({ side, top, count = 16, seed = 0, flip = false }: FishSchoolProps) => {
    return (
        <div
            className={styles.school}
            style={{ [side]: `calc(50% - ${CONTENT_CLEARANCE_PX}px - ${WIDE_SCREEN_GAP})`, top }}
            aria-hidden="true"
        >
            {Array.from({ length: count }, (_, n) => {
                const i = n + seed;
                return (
                    <Fish
                        key={n}
                        size={SIZES[i % SIZES.length]}
                        top={`${OFFSETS_TOP[i % OFFSETS_TOP.length]}%`}
                        left={`${OFFSETS_LEFT[i % OFFSETS_LEFT.length]}%`}
                        driftRange={DRIFT_RANGES[i % DRIFT_RANGES.length]}
                        driftDuration={DRIFT_DURATIONS[i % DRIFT_DURATIONS.length]}
                        driftDelay={DRIFT_DELAYS[i % DRIFT_DELAYS.length] + seed * 0.35}
                        bobDuration={BOB_DURATIONS[i % BOB_DURATIONS.length]}
                        bobDelay={BOB_DELAYS[i % BOB_DELAYS.length] + seed * 0.25}
                        flip={flip}
                    />
                );
            })}
        </div>
    );
};

export default FishSchool;
