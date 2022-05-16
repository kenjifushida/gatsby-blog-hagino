import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import * as styles from "../styles/header.module.scss"

const Header = ({ siteTitle }) => (
  <header
    className={styles.header}
  >
    <Link
      to="/"
      className={styles.headTitle}
    >
      {siteTitle}
    </Link>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
