exports.createPages = async ({ actions, graphql }) => {
  const cities = await graphql(`
    query MyQuery {
      allMdx {
        distinct(field: frontmatter___location)
      }
    }
  `)
  cities.data.allMdx.distinct.forEach(location => {
    const slug = location
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/location-template.js`),
      context: { slug: slug}
    })
  })

  const posts = await graphql(`
  query MyQuery {
    allMdx {
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }`)

  posts.data.allMdx.edges.forEach(post => {
    const slug = post.node.frontmatter.slug
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/post-detail.js`),
      context: { slug: slug},
    })
  })
  
}
