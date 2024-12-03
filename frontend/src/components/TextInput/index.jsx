import PropTypes from "prop-types";
import styles from "./styles.module.css";

const TextInput = (props) => (
  <input
    className={styles.input}
    type={props.isPassword ? "password" : "text"}
    value={props.value}
    onChange={props.onChange}
  />
);

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isPassword: PropTypes.bool,
};

export default TextInput;
