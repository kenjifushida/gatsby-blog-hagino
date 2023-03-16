import * as React from "react"
import { useState, useEffect } from "react"
import { useSprings, animated, to as interpolate } from "react-spring"
import { useDrag } from "@use-gesture/react"
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
      text: "Card view"
  },
  {
      text: "Stack view"
  }
];

const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
})
const from = (_i) => ({ x: 0, rot:0, scale: 1.5, y: -1000})
const trans = (r, s) => ` rotateX(30deg) rotateZ(${r}deg) scale(${s})`


const IndexPage = ({ data, location }) => {
  const [tags, setTags] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(data.allMdx.edges);
  const [selView, setView] = useState(location.state.currView ? location.state.currView : "Card view");
  const [selLoc, setLoc] = useState(data.allMdx.edges[0].node.frontmatter.location);
  const [postClass, setPostClass] = useState(styles.post);
  const LocationItems = [
    {
      text: "Tokyo",
      item: <Link to="/Tokyo" state={{ currView: selView}}>Tokyo</Link>
    },
    {
      text: "Chiba", 
      item: <Link to="/Chiba" state={{ currView: selView}}>Chiba</Link>
    },
    {
      text:"Kanagawa",
      item: <Link to="/Kanagawa" state={{ currView: selView}}>Kanagawa</Link>
    }
  ];

  useEffect(
    () => {
      switch(selView) {
        case "List view":
          return setPostClass(styles.post);
        case "Card view":
          return setPostClass(styles.card);
        case "Stack view":
          return setPostClass(styles.stack);
        default:
          return setPostClass(styles.card);
      }
    },
    [selView]
  );

  // update filtered Posts
  useEffect(
    () => {
      console.log(tags)
      if (tags.length > 0) {
        setFilteredPosts([...filteredPosts.filter(post => (
          post.node.frontmatter.tags.split(",").map(tag => tags.includes(tag)).includes(true)
        ))])
        return
      } else {
        setFilteredPosts(data.allMdx.edges)
      }

    }, [tags]
  )

  // Animation

  const [gone] = useState(()=> new Set())
  const [props, api] = useSprings(filteredPosts.length, i => ({
    ...to(i),
    from: from(i),
  }))

  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity[0] > 0.2 
    const dir = xDir < 0 ? -1 : 1
    if (!down && trigger) gone.add(index) 
    api.start(i => {
      if (index !== i) return 
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) 
      const scale = down ? 1.1 : 1
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      }
    })
    if (!down && gone.size === filteredPosts.length)
      setTimeout(() => {
        console.log(gone)
        gone.clear()
        api.start(i => to(i))
      }, 600)
  })

    return (
      <Layout>
        <Seo title="Home" />
        <div className={styles.componentCont}>
          <Combobox tags={tags} setTags={setTags}></Combobox>
          <div className={styles.dropdownCont}>
            <Dropdown items={LocationItems} 
              selectedItem={selLoc} 
              itemHandler={setLoc} />
            <Dropdown items={ViewItems}
              selectedItem={selView} 
              itemHandler={setView} />
          </div>
        </div>
        <div className={styles.content} style={{flexDirection: selView==="Card view" ? "row" : "column"}}>
          {props.map(({ x, y, rot, scale }, i) => {
            const img = getImage(filteredPosts[i].node.frontmatter.image)

            // this returns for each post
            return selView === "Stack view" ? (
              <animated.div 
               key={i} 
               style={{x, y}}
               className={selView && styles.deck}>
                <animated.div
                {...bind(i)} 
                className={postClass}
                style={{
                  transform: interpolate([rot, scale], trans)
                }}>
                  <div>
                    <GatsbyImage image={img} 
                      alt={filteredPosts[i].node.frontmatter.title} className={styles.postImg}
                      draggable="false"/>
                    <div className={styles.postInfo}>
                      <h3><Link className={styles.postLink} to={`/${filteredPosts[i].node.frontmatter.slug}`}>{filteredPosts[i].node.frontmatter.title}</Link></h3>
                      <p className={styles.desc}>{filteredPosts[i].node.frontmatter.excerpt}</p>
                      <div className={styles.location}>
                        <LocationPin/>
                        <span>{filteredPosts[i].node.frontmatter.city}, {filteredPosts[i].node.frontmatter.location}</span>
                      </div>
                    </div>
                  </div>
                </animated.div>
              </animated.div>
            ) : (
              <div key={filteredPosts[i].node.id} className={postClass}>
                <Link
                className={styles.postLink} 
                to={`/${filteredPosts[i].node.frontmatter.slug}`}>
                  <GatsbyImage image={img} 
                    alt={filteredPosts[i].node.frontmatter.title} className={styles.postImg} />
                  <div className={styles.postInfo}>
                    <h3>{filteredPosts[i].node.frontmatter.title}</h3>
                    <p className={styles.desc}>{filteredPosts[i].node.frontmatter.excerpt}</p>
                    <div className={styles.location}>
                      <LocationPin />
                      <span>{filteredPosts[i].node.frontmatter.city}, {filteredPosts[i].node.frontmatter.location}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ) 
          })  
          } 
        </div>
      </Layout>
    )
}

export const query = graphql`
  query($slug: String!) {
    allMdx(filter: {frontmatter: {location: {eq: $slug}}}) {
      edges {
        node {
          frontmatter {
            city
            slug
            excerpt
            location
            title
            tags
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
