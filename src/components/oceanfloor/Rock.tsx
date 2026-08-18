import styles from './OceanFloor.module.css';
import rockImg from '../../assets/rock.svg';

/** Props for {@link Rock}. Provide `left` or `right`, not both. */
type RockProps = {
    /** Distance from the left edge (e.g. `"20px"`, `"10%"`). */
    left?: string;
    /** Distance from the right edge. Takes precedence over `left`. */
    right?: string;
    /** Distance from the bottom edge. Defaults to `"0"`. */
    bottom?: string;
    /** 0 = foreground, 1 = background. Drives default size, shading, and stacking order. */
    depth?: number;
    /** Fixed size in pixels, overriding the size derived from `depth`. */
    size?: number;
    /** Rotation in degrees. */
    rotation?: number;
};

/** A decorative rock on the ocean floor, styled from `depth` unless overridden. */
const Rock = ({ left, right, bottom = '0', depth = 0, size: sizeOverride, rotation = 0 }: RockProps) => {
    const size = sizeOverride ?? 60 - depth * 40;
    const brightness = 1 - depth * 0.3;
    // +100 keeps rocks above every Seaweed instance, regardless of depth.
    const zIndex = 100 + Math.round((1 - depth) * 10);

    const anchorShift = right !== undefined ? '50%' : '-50%';

    return (
        <img
            src={rockImg}
            alt="rock"
            className={styles.rock}
            style={{
                width: size,
                height: size,
                ...(right !== undefined ? { right } : { left }),
                bottom,
                zIndex,
                filter: `brightness(${brightness})`,
                transform: `translateX(${anchorShift}) rotate(${rotation}deg)`,
            }}
        />
    );
};

export default Rock;
