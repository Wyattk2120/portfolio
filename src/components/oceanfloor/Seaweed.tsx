import type { CSSProperties } from 'react';
import styles from './OceanFloor.module.css';
import seaweed1Raw from '../../assets/seaweed1.svg?raw';
import seaweed2Raw from '../../assets/seaweed2.svg?raw';

/** Pulls the `d` attribute out of an SVG file's single `<path>` element. */
const extractPathData = (raw: string) => raw.match(/<path[^>]*\sd="([^"]+)"/)?.[1] ?? '';

type SeaweedShape = { path: string; viewBox: string };

/**
 * Available seaweed silhouettes. Paths are loaded from their source SVGs
 * rather than copied inline, since `fill` needs to be set per instance (see
 * {@link Seaweed}) and one of these files is too large to hand-copy as a
 * string literal.
 */
const SEAWEED_SHAPES: SeaweedShape[] = [
    { path: extractPathData(seaweed2Raw), viewBox: '0 0 1200 1200' },
    // seaweed1's artwork only occupies roughly x:[299,890] y:[325,877] of its
    // source 1200x1200 canvas. Reusing the full canvas as the viewBox left a
    // gap below the plant, so it appeared to float above the sea floor —
    // this viewBox is cropped to the artwork's actual bounds instead.
    { path: extractPathData(seaweed1Raw), viewBox: '298.93 324.77 590.66 552.15' },
];

type RGB = { r: number; g: number; b: number };

/** Default fill color (RGB, 0–255 per channel) at full brightness. */
const DEFAULT_BASE_COLOR: RGB = { r: 0x1f, g: 0x4d, b: 0x38 };

/** Props for {@link Seaweed}. Provide `left` or `right`, not both. */
type SeaweedProps = {
    /** Distance from the left edge (e.g. `"20em"`, `"10%"`). Use `em`, not `px`, so it scales with {@link OceanFloor}'s fluid font-size. */
    left?: string;
    /** Distance from the right edge. Takes precedence over `left`. */
    right?: string;
    /** Distance from the bottom edge. Defaults to `"0"`. */
    bottom?: string;
    /** 0 = foreground, 1 = background. Drives default size, color, and stacking order. */
    depth?: number;
    /** Fixed size in pixels, overriding the size derived from `depth`. */
    size?: number;
    /** Base rotation in degrees; the sway animation oscillates around this. */
    rotation?: number;
    /** Sway animation duration in seconds. Defaults to `4`. */
    swayDuration?: number;
    /** Sway animation delay in seconds, so instances don't sway in unison. Defaults to `0`. */
    swayDelay?: number;
    /** Index into {@link SEAWEED_SHAPES}, wrapped with modulo. Defaults to `0`. */
    variant?: number;
    /** Fill color at full brightness. Defaults to a dark green. */
    baseColor?: RGB;
};

/** Scales an RGB channel by `factor`, clamped to a valid byte value. */
const shade = (channel: number, factor: number) => Math.round(Math.min(255, Math.max(0, channel * factor)));

/** Formats a 0–255 integer as a two-digit hex string. */
const toHex = (n: number) => n.toString(16).padStart(2, '0');

/** A decorative seaweed strand on the ocean floor, styled from `depth` unless overridden. Always renders behind Rock. */
const Seaweed = ({
    left,
    right,
    bottom = '0',
    depth = 0,
    size: sizeOverride,
    rotation = 0,
    swayDuration = 4,
    swayDelay = 0,
    variant = 0,
    baseColor = DEFAULT_BASE_COLOR,
}: SeaweedProps) => {
    const { path, viewBox } = SEAWEED_SHAPES[variant % SEAWEED_SHAPES.length];
    const size = sizeOverride ?? 60 - depth * 40;

    // No layer base, unlike Rock's +100, so seaweed always sits behind every rock.
    const zIndex = Math.round((1 - depth) * 10);

    // Clamped since seaweed's real depth values run past the documented 0–1 range.
    const brightness = Math.min(1, Math.max(0.45, 1 - depth * 0.15));
    const fill = `#${toHex(shade(baseColor.r, brightness))}${toHex(shade(baseColor.g, brightness))}${toHex(shade(baseColor.b, brightness))}`;

    const anchorShift = right !== undefined ? '50%' : '-50%';

    // Read by the `sway` keyframes in OceanFloor.module.css, which animates
    // `transform` directly and so needs these baked in as custom properties
    // rather than a one-off inline `transform`.
    const style: CSSProperties = {
        width: `${size}em`,
        height: `${size}em`,
        ...(right !== undefined ? { right } : { left }),
        bottom,
        zIndex,
        ['--anchor-shift' as string]: anchorShift,
        ['--base-rotation' as string]: `${rotation}deg`,
        ['--sway-duration' as string]: `${swayDuration}s`,
        ['--sway-delay' as string]: `${swayDelay}s`,
    };

    return (
        <svg viewBox={viewBox} aria-hidden="true" className={styles.seaweed} style={style}>
            <path fill={fill} d={path} />
        </svg>
    );
};

export default Seaweed;
