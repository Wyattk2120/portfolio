import styles from './projectCard.module.css';

type Project = {
    name: string;
    /** Omit while there's no screenshot yet — the card just gives .details the full height instead of showing a placeholder. */
    image?: string;
    description: string;
    techStack: string[];
    /** Link to the project's source repo. Renders a "Code" button at the bottom of the card when present. */
    repoUrl?: string;
};

type ProjectCardProps = Project;

const ProjectCard = ({ name, image, description, techStack, repoUrl }: ProjectCardProps) => {
    return (
        <div className={styles.projectCard}>
            {image && (
                <div className={styles.imageWrapper}>
                    <img className={styles.image} src={image} alt={name} />
                </div>
            )}
            <div className={styles.details}>
                <h2 className={styles.name}>{name}</h2>
                <p className={styles.description}>{description}</p>
                <ul className={styles.techStack}>
                    {techStack.map((tech) => (
                        <li key={tech} className={styles.techPill}>{tech}</li>
                    ))}
                </ul>
                {repoUrl && (
                    <a
                        className={styles.codeButton}
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Code
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
