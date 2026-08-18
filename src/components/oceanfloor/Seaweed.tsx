import styles from './OceanFloor.module.css';

/**
 * Path data for `assets/seaweed2.svg` (viewBox `0 0 1200 1200`), inlined so
 * `fill` can be set per instance without a per-instance CSS filter.
 */
const SEAWEED_PATH =
    'm959.22 734.75c-50.965 41.27-84.949 19.414-143.2 21.84-25.871 1.0781-58.801 23.004-87.434 47.027 16.129-38.93 25.559-75.422 27.324-112.99 35.734-47.879 83.051-111.06 120.79-176.75 65.531-114.07 41.258-280.95 41.258-280.95s-12.133 52.789-38.832 125.61c-22.117 60.312-67.621 124.01-137.73 204.77-9.7422-73.801-11.258-172.33 49.754-304.88 0 0-125.61 89.195-120.14 243.93 1.8828 53.543 5.2695 96.91 7.1875 134.4-34.344 49.547-57.395 122.8-72.613 191.64 3.4336-23.953 7.043-50.578 10.812-80.281 30.949-243.93-21.84-298.54-47.328-427.79-25.492-129.25 30.934-260.32 30.934-260.32s-72.816 80.102-91.789 198.42c-18.973 118.32 37.188 238.46 62.664 369.54 18.562 95.473-23.148 252.67-47.184 331.05 1.7148-51.539 9.6016-130.16 20.484-282.52 16.992-237.86-228.16-503.64-228.16-503.64 38.832 125 92.23 151.69 152.91 341.41 20.555 64.273 27.445 126.71 27.395 185.09-24.023-71.328-81.91-128.76-145.55-179.41-25.668-39.469-48.289-72.938-54.781-114.07-10.922-69.18 20.027-118.32 20.027-118.32s-69.168 16.379-52.789 123.78c1.3672 8.9883 3.1562 17.293 5.2188 25.117-55.008-86.195-76.223-203.52-76.223-203.52s-38.23 107.4 20.027 222.09c28.512 56.148 85.812 115.77 137.96 170.77 3.8164 18.469 6.5273 39.516 7.668 64.055 3.3008 70.98-4.5859 123.56-8.6289 169.92-3.7578-3.0352-7.5469-5.9297-11.398-8.5078-88.598-59.461-143.21-108.6-161.41-155.03-18.203-46.43-37.621-80.398-37.621-80.398s6.0703 137.14 74.027 205.09c43.078 43.078 98.27 89.062 137.9 126.56 4.1992 23.426 12.422 47.34 27.145 73.68 60.078 107.38 158.38 118.82 158.38 118.82l-0.14453-0.26562c3.4336 0.52734 6.4688-0.058594 8.8672-2.0742 2.0039-1.6797 3.4062-3.6016 4.5234-5.6523 12.191 7.2969 30.215-7.7383 43.176-32.578 0 0 75.238-90.406 114.07-168.09 38.832-77.664 106.8-65.531 211.16-101.94 104.38-36.406 143.21-206 143.21-206s-50.977 70.094-101.94 111.35zm-518.39 246.13c-8.7734-16.105-18.422-32.496-28.848-48.254-10.223-85.402 7.1406-162.29 7.2461-230.12 21.457 26.762 36.324 50.93 38.785 71.074 6.3945 52.531-8.0508 152.6-17.184 207.3z';

/** Props for {@link Seaweed}. Provide `left` or `right`, not both. */
type SeaweedProps = {
    /** Distance from the left edge (e.g. `"20px"`, `"10%"`). */
    left?: string;
    /** Distance from the right edge. Takes precedence over `left`. */
    right?: string;
    /** Distance from the bottom edge. Defaults to `"0"`. */
    bottom?: string;
    /** 0 = foreground, 1 = background. Drives default size, color, and stacking order. */
    depth?: number;
    /** Fixed size in pixels, overriding the size derived from `depth`. */
    size?: number;
    /** Rotation in degrees. */
    rotation?: number;
};

/** Fill color (RGB, 0–255 per channel) at full brightness. */
const BASE_COLOR = { r: 0x1f, g: 0x4d, b: 0x38 };

/** Scales an RGB channel by `factor`, clamped to a valid byte value. */
const shade = (channel: number, factor: number) => Math.round(Math.min(255, Math.max(0, channel * factor)));

/** Formats a 0–255 integer as a two-digit hex string. */
const toHex = (n: number) => n.toString(16).padStart(2, '0');

/** A decorative seaweed strand on the ocean floor, styled from `depth` unless overridden. Always renders behind Rock. */
const Seaweed = ({ left, right, bottom = '0', depth = 0, size: sizeOverride, rotation = 0 }: SeaweedProps) => {
    const size = sizeOverride ?? 60 - depth * 40;

    // No layer base, unlike Rock's +100, so seaweed always sits behind every rock.
    const zIndex = Math.round((1 - depth) * 10);

    // Clamped since seaweed's real depth values run past the documented 0–1 range.
    const brightness = Math.min(1, Math.max(0.45, 1 - depth * 0.15));
    const fill = `#${toHex(shade(BASE_COLOR.r, brightness))}${toHex(shade(BASE_COLOR.g, brightness))}${toHex(shade(BASE_COLOR.b, brightness))}`;

    const anchorShift = right !== undefined ? '50%' : '-50%';

    return (
        <svg
            viewBox="0 0 1200 1200"
            aria-hidden="true"
            className={styles.seaweed}
            style={{
                width: size,
                height: size,
                ...(right !== undefined ? { right } : { left }),
                bottom,
                zIndex,
                transform: `translateX(${anchorShift}) rotate(${rotation}deg)`,
            }}
        >
            <path fill={fill} d={SEAWEED_PATH} />
        </svg>
    );
};

export default Seaweed;
