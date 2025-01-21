// DestinationCard.tsx
import Image from "next/image";
import styles from './DestinationCard.module.scss'

interface DestinationCardProps {
    city: string;
    imageSrc: string;
    altText: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ city, imageSrc, altText }) => {
    return (
        <div className={styles['destination-card']}>
            <div className={styles['destination-content']}>
                <h3>{city}</h3>
            </div>
            <Image
                src={imageSrc}
                alt={altText}
                width={400}
                height={300}
                className={styles['destination-image']}
            />
            <div className={styles['destination-actions']}>
                <button>Explore {city}</button>
            </div>
        </div>
    );
};

export default DestinationCard;
