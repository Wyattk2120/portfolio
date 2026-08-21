import styles from './experienceCard.module.css';

type MonthYear = {
    month: number;
    year: number;
}

type Experience = {
    company: string;
    position: string;
    startDate: MonthYear;
    endDate?: MonthYear; //omitted = still current ("Present")
    description: string;
}

type ExperienceCardProps = Experience;

const MONTH_NAMES = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const formatMonthYear = ({month, year}: MonthYear) => 
    `${MONTH_NAMES[month - 1]} ${year}`; 

const ExperienceCard = ({company, position, startDate, endDate, description}: ExperienceCardProps) => {
    const dateRange = `${formatMonthYear(startDate)} - ${endDate ? formatMonthYear(endDate) : "Present"}`;

    return (
        <div className={styles.experienceCard}>
            <div className={styles.header}>
                <h2 className={styles.position}>{position}</h2>
                <span className={styles.dateRange}>{dateRange}</span>
            </div>
            <h3 className={styles.company}>{company}</h3>
            <p className={styles.description}>{description}</p>
        </div>
    );
};

export default ExperienceCard;