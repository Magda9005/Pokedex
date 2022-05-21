import { getStatValuePercentage } from "./helper_functions";

interface StatsSlider {
  statName: string;
  statValue: number;
  pokemonType: string;
}

const StatsSlider: React.FC<StatsSlider> = ({
  statName,
  statValue,
  pokemonType,
}) => (
  <div className="line-container">
    <div className={`bgc-` + pokemonType + ` colored-result ` + statName}>
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

export default StatsSlider;
