exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query MyQuery {
      allMdx {
        distinct(field: frontmatter___location)
      }
    }
  `)
  data.allMdx.distinct.forEach(location => {
    const slug = location
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/location.js`),
      context: { slug: slug}
    })
  })
}
