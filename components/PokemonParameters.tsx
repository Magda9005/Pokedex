import styles from "./modules/pokemonParameters.module.scss";
import Copyright from "./Copyright";

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
  <div className={styles["parameters-container"]}>
    <div className={styles["type-container"]}>{categories}</div>
    <div className={styles["about-section"]}>
      <p className={aboutHeader}>About</p>
      <div className={styles["about-parameter"]}>
        <div className={styles["weight-container"]}>
          <div className={styles.weight}>
            <span className={styles["about-header"]}>Weight</span>
            <span className={styles["about-parameter"]}>
              <img
                src="/scale.svg"
                alt="scale icon"
                className={styles["scale-icon"]}
              />{" "}
              {weight} kg
            </span>
          </div>
        </div>
        <div className={styles["height-container"]}>
          <div className={styles.height}>
            <span className={styles["about-header"]}>Height</span>
            <span className={styles["about-parameter"]}>
              <img
                src="/ruler.svg"
                alt="ruler icon"
                className={styles["ruler-icon"]}
              />
              {height} m
            </span>
          </div>
        </div>
        <div className={styles["moves-container"]}>
          <div className={styles.moves}>
            <span className={styles["about-header"]}>Moves</span>
            {abilities}
          </div>
        </div>
      </div>
    </div>
    <div className={styles["pokemon-description"]}>
      {pokemonsDescriptionText}
    </div>
    <div className={styles["base-stats-container"]}>
      <div className={styles["base-stats-header"]}>
        <p className={statsHeader}>Base stats </p>
      </div>
      <div className={styles["base-stats-parameters"]}>
        <div className={statName}>{statsHeaders}</div>
      </div>
      <div className={styles["base-stats-parameters"]}>
        <div className={styles["base-stat-score"]}>{statsResultsNumbers}</div>
      </div>
      <div className={styles["base-stats-parameters"]}>
        <div className={styles["base-stat-visual-representation"]}>
          {statsSliders}
        </div>
      </div>
    </div>
    <Copyright />
  </div>
);

export default PokemonParameters;
