import * as React from "react"
import * as styles from "../styles/combobox.module.scss"
import Search from "../assets/search.svg"

const Combobox = ({}) => (
    <div className={styles.container}>
        <Search/>
        <input className={styles.combobox} type="text" maxlength="25" placeholder="Tag search">
        </input>
    </div>
)

export default Combobox