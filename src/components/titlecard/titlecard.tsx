import styles from './titlecard.module.css';

// Three bubbles bob up and down along each side. Distinct delays/durations
// per bubble keep them from all rising and falling in lockstep.
const bubbleConfigs = [
    { side: 'left', delay: 0, duration: 5 },
    { side: 'left', delay: -2, duration: 6.5 },
    { side: 'left', delay: -4, duration: 7.5 },
    { side: 'right', delay: -1, duration: 5.5 },
    { side: 'right', delay: -3, duration: 7 },
    { side: 'right', delay: -5, duration: 8 },
] as const;

type Credential = {
    title: string;
    issuer: string;
    achieved: string;
}

type titleCardProps = {
    name: string;
    image: string;
    bio: string;
    credentials: Credential[];
};

const TitleCard = ({ name, image, bio, credentials }: titleCardProps) => {
    return (
        <div className={styles.titleCard}>
            {bubbleConfigs.map((bubble, i) => (
                <div
                    key={i}
                    className={`${styles.bubble} ${bubble.side === 'left' ? styles.bubbleLeft : styles.bubbleRight}`}
                    style={{
                        animationDelay: `${bubble.delay}s`,
                        // second value (3.2s) matches .bubble's wobble duration in the CSS —
                        // only the bob speed varies per bubble here, not the pulse
                        animationDuration: `${bubble.duration}s, 3.2s`,
                    }}
                />
            ))}
            <img className={styles.image} src={image} alt={name} />
            <div className={styles.details}>
                <h1 className={styles.title}>{name}</h1>
                <h2 className={styles.sectionLabel}>Bio</h2>
                <p className={styles.bio}>{bio}</p>
                <h2 className={styles.sectionLabel}>Credentials</h2>
                <ul className={styles.credentials}>
                    {credentials.map((credential) => (
                        <li key={credential.title}>
                            {credential.title} — {credential.issuer} ({credential.achieved})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default TitleCard;