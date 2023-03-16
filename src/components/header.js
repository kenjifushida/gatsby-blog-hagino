import * as React from "react"
import { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import * as styles from "../styles/header.module.scss"

const Header = ({ siteTitle }) => {
  const [currTheme, setTheme] = useState(window.__theme == 'dark' ? true:false);
  const toggle = (theme) => {
    if (typeof window === 'undefined') {
      return null;
    }
    
    window.__setPreferredTheme(theme ? 'dark':'');
    setTheme(theme ? 'dark':'');
  }
  return (
  <header
    className={styles.header}
  >
    <Link
      to="/"
      className={styles.headTitle}
    >
      {siteTitle}
    </Link>
    <div className={styles.switchBtn} onClick={()=>toggle(!currTheme)}></div>
  </header>
)
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
