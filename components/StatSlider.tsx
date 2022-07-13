import { getStatValuePercentage } from "../.vscode/functions/helper_functions";
import classNames from "classnames/bind";
import styles from "./modules/statsSlider.module.css";
import { StatsSliderProps } from "../.vscode/functions/interfaces";

let className = classNames.bind(styles);

const StatsSlider: React.FC<StatsSliderProps> = ({
  statName,
  statValue,
  pokemonType,
}) => {
  const slider = className(
    `bgc-${pokemonType}`,
    styles["colored-result"],
    statName
  );

  return (
    <div className={styles["line-container"]}>
      <div className={slider}>
        <style jsx>
          {`
            .${statName} {
              width: ${getStatValuePercentage(statName, statValue)}%;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default StatsSlider;
