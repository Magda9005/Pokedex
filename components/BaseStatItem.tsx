import styles from "./modules/baseStatItem.module.scss";

interface BaseStatItemProps {
  elementClass: string;
  elementName: string;
}

const BaseStatItem: React.FC<BaseStatItemProps> = ({
  elementClass,
  elementName,
}) => {
  return (
    <>
      <div className={styles.baseStatsParameters}>
        <div className={elementClass}>{elementName}</div>
      </div>
    </>
  );
};

export default BaseStatItem;
