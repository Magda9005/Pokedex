import Link from "next/link";
import styles from "./modules/pagination.module.scss";

interface PaginationProps {
  hasPrev: boolean;
  hasNext: boolean;
  prevUrl: string;
  nextUrl: string;
}

const Pagination: React.FC<PaginationProps> = ({
  hasPrev,
  hasNext,
  prevUrl,
  nextUrl,
}) => (
  <div
    className={hasPrev ? styles.nextPreviousPageArea : styles.nextButtonArea}
  >
    {hasPrev && (
      <Link href={prevUrl}>
        <a role="link" className={styles.nextPrevLink}>
          {" "}
          <img
            src="/chevron-left-black.svg"
            className={styles.previousIcon}
          />{" "}
        </a>
      </Link>
    )}
    {hasNext && (
      <Link href={nextUrl}>
        <a role="link" className={styles.nextPrevLink}>
          {" "}
          <img
            src="/chevron-right-black.svg"
            className={styles.nextIcon}
          />{" "}
        </a>
      </Link>
    )}
  </div>
);

export default Pagination;
