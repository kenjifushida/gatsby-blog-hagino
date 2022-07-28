import * as React from "react"
import * as styles from "../styles/combobox.module.scss"
import Search from "../assets/search.svg"

const Combobox = ({ tags, setTags }) => {
    const removeTags = (indexToRemove) => {
        setTags([...tags.filter((_,i) => i !== indexToRemove)])
    }
    const addTag = (e) => {
        if (e.target.value !== "") {
            setTags([...tags, e.target.value])
            e.target.value = ""
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.searchBox}>
                <Search />
                <input className={styles.combobox} type="text" maxlength="25" 
                    placeholder="Tag search" onKeyUp={(e)=> e.key === "Enter" ? addTag(e):null}/>
            </div>
            <ul className={styles.tagsList}>
                {tags.length > 0 ? tags.map((tag, i) => {
                    return (
                        <li key={i}>
                            <span className={styles.tag}>{tag}</span>
                            <span className={styles.closeIcon} 
                                onClick={()=>removeTags(i)}>x</span>
                        </li>
                    )
                }):null}
            </ul>
        </div>
)}

export default Combobox