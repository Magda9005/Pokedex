import Link from "next/link";
import styles from "./modules/pagination.module.scss";

interface PaginationProps {
  hasPrev: boolean;
  hasNext: boolean;
  url: string;
  nextPage: string;
}

const Pagination: React.FC<PaginationProps> = ({
  hasPrev,
  hasNext,
  url,
  nextPage,
}) => (
  <div
    className={
      hasPrev ? styles["next-previous-page-area"] : styles["next-button-area"]
    }
  >
    {hasPrev && (
      <Link href={url}>
        <a role="link" className={styles["next-prev-link"]}>
          {" "}
          <img
            src="/chevron-left-black.svg"
            className={styles["previous-icon"]}
          />{" "}
        </a>
      </Link>
    )}
    {hasNext && (
      <Link href={nextPage}>
        <a role="link" className={styles["next-prev-link"]}>
          {" "}
          <img
            src="/chevron-right-black.svg"
            className={styles["next-icon"]}
          />{" "}
        </a>
      </Link>
    )}
  </div>
);

export default Pagination;
