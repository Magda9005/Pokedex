import { getStatValuePercentage } from "../.vscode/functions/helper_functions";
import classNames from "classnames/bind";
import styles from "./modules/statsSlider.module.css";

let className = classNames.bind(styles);

interface StatsSlider {
  statName: string;
  statValue: number;
  pokemonType: string;
}

const StatsSlider: React.FC<StatsSlider> = ({
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
