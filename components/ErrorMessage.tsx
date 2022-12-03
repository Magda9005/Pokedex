import styles from "../components/modules/errorMessage.module.scss";

const ErrorMessage: React.FC = () => (
 
    <div className={styles.errorMessage}>
      {" "}
      Sorry, no Pokémon matched your search!
    </div>

);

export default ErrorMessage;
