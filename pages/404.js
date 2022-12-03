import Link from "next/link";
import styles from "../components/modules/errorPage.module.scss";

const NotFound = () => (
  <div className={styles.errorPage}>
    <h1 className={styles.errorPageMainTitle}> 404 </h1>
    <h2 className={styles.errorPageSubtitle}>Not found!</h2>
    <p>Sorry,we can't find what you're looking for.</p>
    <Link href={`/pokedex`}>
      <button className={styles.goBackHomeBtn} role="button">
        Go back home
      </button>
    </Link>
  </div>
);

export default NotFound;
