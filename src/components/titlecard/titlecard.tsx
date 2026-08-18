import styles from './titlecard.module.css';

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