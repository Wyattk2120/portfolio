import type { CSSProperties } from 'react';
import styles from './FishSchool.module.css';

type FishProps = {
    /** Width in em; height follows the shape's own ~2:1 aspect ratio. */
    size: number;
    /** Position within the parent school cluster. */
    top: string;
    left: string;
    /** How far (in em) the fish drifts left/right from `left`, each way. */
    driftRange: number;
    driftDuration: number;
    driftDelay: number;
    bobDuration: number;
    bobDelay: number;
    /** Mirrors the fish to face left instead of its natural rightward-facing draw. Applied via an inner <g>'s SVG transform attribute, not CSS, so it doesn't fight the bob animation's own `transform`. */
    flip?: boolean;
};

/**
 * One fish silhouette — a single flat-filled path (rounded body + tail),
 * same "one <path>, two subpaths" technique as Seaweed's SVGs. Horizontal
 * drift and vertical bob are split across two nested elements (see
 * FishSchool.module.css) since a single element can't run two independent
 * `transform` keyframe animations at once.
 */
const Fish = ({ size, top, left, driftRange, driftDuration, driftDelay, bobDuration, bobDelay, flip }: FishProps) => {
    const drifterStyle: CSSProperties = {
        top,
        left,
        width: `${size}em`,
        ['--drift-range' as string]: `${driftRange}em`,
        ['--drift-duration' as string]: `${driftDuration}s`,
        ['--drift-delay' as string]: `${driftDelay}s`,
    };

    const bobberStyle: CSSProperties = {
        ['--bob-duration' as string]: `${bobDuration}s`,
        ['--bob-delay' as string]: `${bobDelay}s`,
    };

    return (
        <div className={styles.drifter} style={drifterStyle}>
            <svg
                className={styles.bobber}
                style={bobberStyle}
                viewBox="-18 0 96 50"
                aria-hidden="true"
            >
                <g transform={flip ? 'scale(-1,1) translate(-60,0)' : undefined}>
                    <path d="M35,5 C55,5 75,14 75,25 C75,36 55,45 35,45 C19,45 7,37 2,25 C7,13 19,5 35,5 Z M2,25 L-16,8 L-13,25 L-16,42 Z" />
                </g>
            </svg>
        </div>
    );
};

export default Fish;
