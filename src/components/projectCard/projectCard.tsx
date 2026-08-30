import styles from './projectCard.module.css';

type Project = {
    name: string;
    image: string;
    description: string;
    techStack: string[];
};

type ProjectCardProps = Project;

const ProjectCard = ({ name, image, description, techStack }: ProjectCardProps) => {
    return (
        <div className={styles.projectCard}>
            <img className={styles.image} src={image} alt={name} />
            <div className={styles.details}>
                <h2 className={styles.name}>{name}</h2>
                <p className={styles.description}>{description}</p>
                <ul className={styles.techStack}>
                    {techStack.map((tech) => (
                        <li key={tech} className={styles.techPill}>{tech}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProjectCard;
