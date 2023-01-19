import classNames from "classnames/bind";
import styles from "./modules/statsSlider.module.scss";

let className = classNames.bind(styles);

interface StatsSliderProps {
  statName: string;
  statValue: number;
  pokemonType: string;
}

const maxValues = {
  hp: 255,
  atk: 190,
  def: 230,
  sdef: 230,
  satk: 180,
  spd: 200,
};

export const getStatValuePercentage = (
  statName: string,
  statValue: number
): number => {
  let maxStatValue: number = maxValues[statName];

  return Math.round((statValue * 100) / maxStatValue);
};

const StatsSlider: React.FC<StatsSliderProps> = ({
  statName,
  statValue,
  pokemonType,
}) => {
  const slider = className(
    `bgc-${pokemonType}`,
    styles.coloredResult,
    statName
  );

  return (
    <div className={styles.statBarContainer}>
    <div className={styles.lineContainer}>
      <div
        className={slider}
        style={{ width: `${getStatValuePercentage(statName, statValue)}%` }}
      ></div>
    </div>
    </div>
  );
};

export default StatsSlider;
