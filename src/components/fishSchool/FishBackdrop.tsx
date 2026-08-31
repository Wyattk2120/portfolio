import FishSchool from './FishSchool';
import styles from './FishSchool.module.css';

/**
 * Decoration for the large empty margins on either side of the page's
 * centered content — loosely-clustered fish schools drifting in the
 * corners. `top` values are in `vh`, not `%`: this sits inside .page (see
 * App.tsx), which is many viewports tall, so a `%` would spread these out
 * across the *entire* page's height instead of pinning them to where
 * they'd appear if you were scrolled to the very top (`vh` is anchored to
 * the actual viewport size, not this element's own — much taller — box).
 */
const FishBackdrop = () => {
    return (
        <div className={styles.backdrop}>
            <FishSchool side="left" top="20vh" seed={0} />
            <FishSchool side="right" top="60vh" seed={5} flip />
            <FishSchool side="left" top="75vh" seed={9} />
            <FishSchool side="right" top="12vh" seed={13} />
        </div>
    );
};

export default FishBackdrop;
