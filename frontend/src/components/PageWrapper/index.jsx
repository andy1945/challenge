import PropTypes from "prop-types";
import styles from "./styles.module.css";
import Logout from "../../components/Logout/index";
import { Link, NavLink } from "react-router-dom";

const PageWrapper = (props) => (
  <div className={styles.wrapper}>
    <h1 className={styles.navlogo}>{props.title}</h1>
    <nav className={styles.nav}>
      <NavLink
        to="/admin"
        className={({ isActive }) =>
          isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
        }
      >
        Admin Dashboard
      </NavLink>
      <NavLink
        to="/clients"
        className={({ isActive }) =>
          isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
        }
      >
        Clients
      </NavLink>
    </nav>

    <Logout />
    {props.children}
  </div>
);

PageWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default PageWrapper;
