import styles from './OceanFloor.module.css';
import Rock from './Rock';
import Seaweed from './Seaweed';

/** Cycled by index so neighboring seaweed don't share identical values. */
const DEPTHS = [2.2, 2.9, 2.4, 3.0, 2.6, 2.3, 2.8, 2.5, 3.1, 2.7, 2.1, 3.2, 2.56];
const ROTATIONS = [-15, -8, 0, 8, 15, -10, 5, -5, 12, -12];
const BOTTOMS = ['-20em', '-15em', '-25em', '-18em', '-22em'];
const SWAY_DURATIONS = [5.5, 6.4, 7.2, 8, 6, 7.8, 6.8, 6.1];
const SWAY_DELAYS = [0, 0.4, 0.8, 1.2, 1.6, 2, 2.4, 2.8, 3.2, 3.6];

const MIN_SEAWEED_SIZE = 70;
const MAX_SEAWEED_SIZE = 275;

const SEAWEED_COUNT = 125;

/** Chance that a given seaweed uses the rare shape/color variant instead of the default green. */
const RARE_VARIANT_CHANCE = 0.15;

/** Colors the rare variant randomly picks from. */
const RARE_COLORS = [
    { r: 0x7a, g: 0x2f, b: 0x52 }, // dark pink
    { r: 0x7a, g: 0x66, b: 0x1a }, // dark yellow
    { r: 0x4a, g: 0x1f, b: 0x7a }, // purple
];

/** Generated once at module load, not per render, so values stay stable across re-renders. */
const seaweedPatch = Array.from({ length: SEAWEED_COUNT }, (_, i) => {
    const isRare = Math.random() < RARE_VARIANT_CHANCE;

    return {
        left: `${((i / SEAWEED_COUNT) * 100).toFixed(1)}%`,
        size: Math.round(MIN_SEAWEED_SIZE + Math.random() * (MAX_SEAWEED_SIZE - MIN_SEAWEED_SIZE)),
        depth: DEPTHS[i % DEPTHS.length],
        rotation: ROTATIONS[i % ROTATIONS.length],
        bottom: BOTTOMS[i % BOTTOMS.length],
        swayDuration: SWAY_DURATIONS[i % SWAY_DURATIONS.length],
        swayDelay: SWAY_DELAYS[i % SWAY_DELAYS.length],
        variant: isRare ? 1 : 0,
        ...(isRare ? { baseColor: RARE_COLORS[Math.floor(Math.random() * RARE_COLORS.length)] } : {}),
    };
});

/** Renders the ocean floor scene: a fixed cluster of rocks plus a generated patch of seaweed. */
const OceanFloor = () => {
    return(
        <div className={styles.oceanFloor}>
                <Rock right="35em" depth={2.4} size={200} bottom="-30em" />
                <Rock right="100em" depth={2.74} size={150} rotation={-80} bottom="-30em" />
                <Rock right="40em" depth={3} size={300} rotation={50} bottom="-30em" />
                <Rock right="200em" depth={2.5} size={100} rotation={-10} bottom="-30em" />
                <Rock right="250em" depth={2.7} size={65} rotation={-10} bottom="-30em" />
                <Rock left="10em" depth={2.2} size={100} rotation={-20} bottom="-30em" />
                <Rock left="50em" depth={2.65} size={175} rotation={30} bottom="-30em" />
                <Rock left="20em" depth={3} size={280} rotation={-10} bottom="-30em" />
                <Rock left="150em" depth={2.7} size={100} rotation={-10} bottom="-30em" />
                <Rock left="200em" depth={2.7} size={65} rotation={-10} bottom="-30em" />

                <div className={styles.seaweedLayer}>
                    {seaweedPatch.map((s, i) => (
                        <Seaweed key={i} {...s} />
                    ))}
                </div>
        </div>
    );
};

export default OceanFloor;
