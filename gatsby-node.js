const path = require("path")
const slash = require("slash")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(
    `
      {
        allContentfulBlog {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      console.log("Error con contentful: ", result.errors)
    }

    const articleTemplate = path.resolve("./src/templates/article.js")
    
    result.data.allContentfulBlog.edges.forEach(article => {
        createPage({
          path: `/article/${article.node.slug}/`,
          component: slash(articleTemplate),
          context: {
            slug: article.node.slug,
          },
        })
      })
  }).catch(error=>console.log("Error al recibir la data de contentful: ", error))
}
