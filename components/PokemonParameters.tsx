import styles from "./modules/pokemonParameters.module.scss";
import Copyright from "./Copyright";
import BaseStatItem from "./BaseStatItem";
import AboutElement from "./AboutSection";

const PokemonParameters = ({
  categories,
  aboutHeader,
  weight,
  height,
  abilities,
  statsHeader,
  statsHeaders,
  statsResultsNumbers,
  statsSliders,
  statName,
  pokemonsDescriptionText,
}) => (
  <div className={styles.parametersContainer}>
    <div className={styles.typeContainer}>{categories}</div>
    <div className={styles.aboutSection}>
      <p className={aboutHeader}>About</p>
      <div className={styles.aboutParameter}>
        <AboutElement
          moves={false}
          parameterName={"Weight"}
          parameterValue={weight}
          src={"/scale.svg"}
          alt={"scale icon"}
        />
        <AboutElement
          moves={false}
          parameterName={"Height"}
          parameterValue={height}
          src={"/ruler.svg"}
          alt={"ruler icon"}
        />
        <AboutElement
          moves={true}
          parameterName={"Moves"}
          abilities={abilities}
        />
      </div>
    </div>
    <div className={styles.pokemonDescription}>{pokemonsDescriptionText}</div>
    <div className={styles.baseStatsContainer}>
      <div className={styles.baseStatsHeader}>
        <p className={statsHeader}>Base stats </p>
      </div>
      <BaseStatItem elementClass={statName} elementName={statsHeaders} />
      <BaseStatItem
        elementClass={styles.baseStatScore}
        elementName={statsResultsNumbers}
      />
      <BaseStatItem
        elementClass={styles.baseStatVisualRepresentation}
        elementName={statsSliders}
      />
    </div>
    <Copyright />
  </div>
);

export default PokemonParameters;
