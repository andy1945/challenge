import PropTypes from "prop-types";
import styles from "./styles.module.css";

const Button = (props) =>
  props.type === "submit" ? (
    <input type="submit" className={styles.button} value={props.text} />
  ) : (
    <button onClick={props.onClick} className={styles.button}>
      {props.text}
    </button>
  );

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit"]),
};

export default Button;
