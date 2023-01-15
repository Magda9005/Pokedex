import styles from "./modules/aboutSection.module.scss";

interface AboutSectionProps {
  moves: boolean;
  parameterName: string;
  abilities?: string[];
  parameterValue?: number;
  src?: string;
  alt?: string;
  parameterUnit:string
}

const AboutSection: React.FC<AboutSectionProps> = ({
  moves,
  parameterName,
  abilities,
  parameterValue,
  src,
  alt,
  parameterUnit
}) => {
  return (
    <div className={styles.container}>
      <div
        className={
          moves ? styles.elementContainerMoves : styles.elementContainer
        }
      >
        <span className={styles.aboutHeader}>{parameterName}</span>
        {moves ? (
          abilities
        ) : (
          <span className={styles.aboutParameter}>
            <img src={src} alt={alt} className={styles.icon} /> {parameterValue}{" "}
            {parameterUnit}
          </span>
        )}
      </div>
    </div>
  );
};

export default AboutSection;
