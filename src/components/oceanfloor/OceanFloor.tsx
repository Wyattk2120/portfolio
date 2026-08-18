import styles from './OceanFloor.module.css';
import Rock from './Rock';
import Seaweed from './Seaweed';

/** Cycled by index so neighboring seaweed don't share identical values. */
const DEPTHS = [2.2, 2.9, 2.4, 3.0, 2.6, 2.3, 2.8, 2.5, 3.1, 2.7, 2.1, 3.2, 2.56];
const ROTATIONS = [-15, -8, 0, 8, 15, -10, 5, -5, 12, -12];
const BOTTOMS = ['-20px', '-15px', '-25px', '-18px', '-22px'];

const MIN_SEAWEED_SIZE = 70;
const MAX_SEAWEED_SIZE = 275;

const SEAWEED_COUNT = 125;

/** Generated once at module load, not per render, so sizes stay stable across re-renders. */
const seaweedPatch = Array.from({ length: SEAWEED_COUNT }, (_, i) => ({
    left: `${((i / SEAWEED_COUNT) * 100).toFixed(1)}%`,
    size: Math.round(MIN_SEAWEED_SIZE + Math.random() * (MAX_SEAWEED_SIZE - MIN_SEAWEED_SIZE)),
    depth: DEPTHS[i % DEPTHS.length],
    rotation: ROTATIONS[i % ROTATIONS.length],
    bottom: BOTTOMS[i % BOTTOMS.length],
}));

/** Renders the ocean floor scene: a fixed cluster of rocks plus a generated patch of seaweed. */
const OceanFloor = () => {
    return(
        <div className={styles.oceanFloor}>
                <Rock right="35px" depth={2.4} size={200} bottom="-30px" />
                <Rock right="100px" depth={2.74} size={150} rotation={-80} bottom="-30px" />
                <Rock right="40px" depth={3} size={300} rotation={50} bottom="-30px" />
                <Rock right="200px" depth={2.5} size={100} rotation={-10} bottom="-30px" />
                <Rock right="250px" depth={2.7} size={65} rotation={-10} bottom="-30px" />
                <Rock left="10px" depth={2.2} size={100} rotation={-20} bottom="-30px" />
                <Rock left="50px" depth={2.65} size={175} rotation={30} bottom="-30px" />
                <Rock left="20px" depth={3} size={280} rotation={-10} bottom="-30px" />
                <Rock left="150px" depth={2.7} size={100} rotation={-10} bottom="-30px" />
                <Rock left="200px" depth={2.7} size={65} rotation={-10} bottom="-30px" />

                <div className={styles.seaweedLayer}>
                    {seaweedPatch.map((s, i) => (
                        <Seaweed key={i} {...s} />
                    ))}
                </div>
        </div>
    );
};

export default OceanFloor;
