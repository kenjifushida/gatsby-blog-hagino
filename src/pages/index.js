import * as React from "react"
import { useState } from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Combobox from "../components/combobox"
import Dropdown from "../components/dropdown"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../styles/index.module.scss"

const ViewItems = [
  {
      text: "List view"
  },
  {
      text: "Grid view"
  },
  {
      text: "Stack view"
  }
]

const LocationItems = [
  {
    text: "Tokyo"
},
{
    text: "Chiba"
},
{
    text: "Kanagawa"
}
]


const IndexPage = () => {
  const [selView, setView] = useState("Card view")
  const [selLoc, setLoc] = useState("Location")

    return (
      <Layout>
        <Seo title="Home" />
        <div className={styles.componentCont}>
          <Combobox></Combobox>
          <div className={styles.dropdownCont}>
            <Dropdown items={LocationItems} 
              selectedItem={selLoc} 
              itemHandler={setLoc} />
            <Dropdown items={ViewItems}
              selectedItem={selView} 
              itemHandler={setView} />
          </div>
        </div>

      </Layout>
    )
}

export default IndexPage
