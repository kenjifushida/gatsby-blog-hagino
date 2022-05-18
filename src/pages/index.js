import * as React from "react"
import { useState } from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Combobox from "../components/combobox"
import Dropdown from "../components/dropdown"

import LocationPin from "../assets/locationPin.svg"

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


const IndexPage = ({data}) => {
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
        <div className={styles.content}>
          {data.allMdx.edges.map(post => {
            const img = getImage(post.node.frontmatter.image)
            return (
              <div key={post.node.id} className={styles.post}>
                <GatsbyImage image={img} 
                alt={post.node.frontmatter.title}/>
                <div className={styles.postInfo}>
                  <h3>{post.node.frontmatter.title}</h3>
                  <p className={styles.desc}>{post.node.frontmatter.excerpt}</p>
                  <div className={styles.location}>
                    <LocationPin/>
                    <span>{post.node.frontmatter.city}, {post.node.frontmatter.location}</span>
                  </div>
                </div>
              </div>
            )
          })} 
        </div>
      </Layout>
    )
}

export const query = graphql`
  {
    allMdx {
      edges {
        node {
          frontmatter {
            city
            excerpt
            location
            title
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
