import React, {useState, useEffect} from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import * as styles from "../styles/post-detail.module.scss";

import Cloud from "../assets/cloud.svg"
import Clouds from "../assets/clouds.svg"
import Cold from "../assets/cold.svg"
import Rain from "../assets/rain.svg"
import Storm from "../assets/storm.svg"
import SunWind from "../assets/sun-wind.svg"
import Clear from "../assets/clear.svg"
import Warm from "../assets/warm.svg"

const apikey = `779f66074b999d8229e70cbf1f930534`

const weatherConditions = [
  {
    name: "Clear",
    svg: <Clear />
  },
  {
    name: "Cloud",
    svg: <Cloud />
  },
  {
    name: "Clouds",
    svg: <Clouds />
  },
  {
    name: "Cold",
    svg: <Cold />
  },
  {
    name: "Rain",
    svg: <Rain />
  },
  {
    name: "Storm",
    svg: <Storm />
  },
  {
    name: "SunWind",
    svg: <SunWind />
  },
  {
    name: "Warm",
    svg: <Warm />
  },
]

export default function PostDetail({ data }) {

  const [weatherData, setWeatherData] = useState({})

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${data.mdx.frontmatter.city}&units=metric&appid=${apikey}`
  useEffect(()=> {
    fetch(url)
      .then(res => res.json())
      .then(result => setWeatherData(result))
  },[])

  const findCondition = (fetchedCondition) => {
    return weatherConditions.find((condition)=> condition.name === fetchedCondition)
  }

  const image = getImage(data.mdx.frontmatter.mainImage)

    return (
        <Layout>
            <div style={{width: '80%', margin: '0 auto'}}>
            <div className={styles.imgContainer}>
              <GatsbyImage image={image} alt="post-img"/>
            </div>
            <div className={styles.textContainer}>
              <h2 className={styles.title}>
                <div className={styles.weatherInfo}>
                  <div className={styles.tempDisplay}>
                    <div className={styles.weatherImg}>
                    {weatherData.weather && findCondition(weatherData.weather[0].main).svg}
                    </div>
                    <div className={styles.temp}>
                      {weatherData.main && (`${weatherData.main.temp.toFixed()}°C`)}
                    </div>
                  </div>
                  <p className={styles.weatherCondition}>
                    {weatherData.weather && weatherData.weather[0].main}
                  </p>
                  <p className={styles.loc}>
                    {weatherData.name && (weatherData.name + ", "+ data.mdx.frontmatter.location)}
                  </p>
                </div>
                {data.mdx.frontmatter.title}
              </h2>
              <p className={styles.desc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Cras massa augue, ultricies lacinia dolor ac, ultrices mollis elit. 
                Quisque aliquet neque mattis enim gravida, sit amet faucibus arcu interdum. 
                Suspendisse et justo at diam luctus ultrices. Proin eu felis id quam 
                semper rutrum. Vestibulum interdum faucibus velit, feugiat tristique 
                elit. Nullam suscipit scelerisque leo. Vivamus finibus viverra ultrices. 
                Maecenas accumsan est felis, in hendrerit nibh efficitur eget. 
                Curabitur vitae velit ac lacus ornare porta. Integer eleifend, 
                sapien nec luctus iaculis, justo risus euismod tellus, quis malesuada 
                purus purus sit amet eros. Maecenas ullamcorper consequat malesuada. 
                Curabitur blandit magna sit amet congue viverra.
              </p>
              <p className={styles.desc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Cras massa augue, ultricies lacinia dolor ac, ultrices mollis elit. 
                Quisque aliquet neque mattis enim gravida, sit amet faucibus arcu interdum. 
                Suspendisse et justo at diam luctus ultrices. Proin eu felis id quam 
                semper rutrum. Vestibulum interdum faucibus velit, feugiat tristique 
                elit. Nullam suscipit scelerisque leo. Vivamus finibus viverra ultrices. 
                Maecenas accumsan est felis, in hendrerit nibh efficitur eget. 
                Curabitur vitae velit ac lacus ornare porta. Integer eleifend, 
                sapien nec luctus iaculis, justo risus euismod tellus, quis malesuada 
                purus purus sit amet eros. Maecenas ullamcorper consequat malesuada. 
                Curabitur blandit magna sit amet congue viverra.
              </p>
              <p className={styles.desc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Cras massa augue, ultricies lacinia dolor ac, ultrices mollis elit. 
                Quisque aliquet neque mattis enim gravida, sit amet faucibus arcu interdum. 
                Suspendisse et justo at diam luctus ultrices. Proin eu felis id quam 
                semper rutrum. Vestibulum interdum faucibus velit, feugiat tristique 
                elit. Nullam suscipit scelerisque leo. Vivamus finibus viverra ultrices. 
                Maecenas accumsan est felis, in hendrerit nibh efficitur eget. 
                Curabitur vitae velit ac lacus ornare porta. Integer eleifend, 
                sapien nec luctus iaculis, justo risus euismod tellus, quis malesuada 
                purus purus sit amet eros. Maecenas ullamcorper consequat malesuada. 
                Curabitur blandit magna sit amet congue viverra.
              </p>
            </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
query($slug: String!) {
    mdx(frontmatter: {slug: {eq: $slug}}) {
      frontmatter {
        city
        location
        slug
        title
        mainImage {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`