import * as React from "react"
import * as styles from "../styles/dropdown.module.scss"

import Triangle from "../assets/triangle.svg"

const Dropdown = ({items, selectedItem, itemHandler}) => {
    return (
        <div className={styles.dropdown}>
            <p>{selectedItem}<Triangle/></p>
            <ul>
                {items.map(item => (
                    <li onClick={()=>itemHandler(item.text)}>{item.item ? item.item : item.text}</li>
                ))}
            </ul>
        </div>
    )
}

export default Dropdown