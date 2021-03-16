import * as React from "react"
import { Link, graphql } from "gatsby"
import Moment from "react-moment"
import "moment/locale/es"
import newsImage from "../images/news.jpg"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const allArticles = data.articles.edges
  if (allArticles.length === 0) {
    return (
      <Layout>
        <SEO title="Home" />
        <h1>Bienvenido</h1>
        <hr />
        <p>Por el momento no hay artículos en el blog.</p>
      </Layout>
    )
  }
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Bienvenido</h1>
      <div>
        <p>
          Bienvenido a mi blog. Aquí podrás encontrar las entradas que se han
          creado para el mismo. Se encuentran ordenadas por fecha de creación.
        </p>
        <div style={{ textAlign: "center" }}>
          <img src={newsImage} alt="..." />
        </div>
      </div>
      <hr />
      <h3>Entradas</h3>
      {allArticles.map(article => {
        return (
          <p key={`${article.node.slug}`}>
            <Link to={`/article/${article.node.slug}`}>
              {article.node.title}
            </Link>{" "}
            <br />
            Publicado: <Moment fromNow>{article.node.createdAt}</Moment>
          </p>
        )
      })}
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    articles: allContentfulBlog(sort: { fields: createdAt, order: DESC }) {
      edges {
        node {
          slug
          title
          createdAt
        }
      }
    }
  }
`
