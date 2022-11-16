import styles from "./modules/aboutElement.module.scss";

interface AboutElementProps {
  moves: boolean;
  parameterName: string;
  abilities?: string[];
  parameterValue?: number;
  src?: string;
  alt?: string;
}

const AboutElement: React.FC<AboutElementProps> = ({
  moves,
  parameterName,
  abilities,
  parameterValue,
  src,
  alt,
}) => {
  return (
    <>
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
              <img src={src} alt={alt} className={styles.icon} />{" "}
              {parameterValue} kg
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default AboutElement;
