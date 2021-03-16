import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Moment from "react-moment"
import "moment/locale/es"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: node => {
      return (
        <>
          <h2>Embedded Asset</h2>
          <pre>
            <code>{JSON.stringify(node, null, 2)}</code>
          </pre>
        </>
      )
    },
  },
}

const Article = ({ data }) => {
  const article = data.article
  return (
    <Layout>
      <div>
        <Link to="/">Inicio</Link>
      </div>
      <div>
        <div style={{ lineHeight: "3px" }}>
          <h3>{article.title}</h3>
          <h5>{article.author}</h5>
          <p style={{ color: "gray", fontSize: ".7rem" }}>
            <Moment fromNow>{article.createdAt}</Moment>
          </p>
          <hr />
        </div>
        <div style={{ textAlign: "center" }}>
          <img src={`${article.image.fluid.src}`} alt="" />
        </div>
        <div>
          <p>{article.body && renderRichText(article.body, options)}</p>
        </div>
      </div>
    </Layout>
  )
}

export default Article

export const pageQuery = graphql`
  query($slug: String!) {
    article: contentfulBlog(slug: { eq: $slug }) {
      title
      author
      image {
        fluid(maxWidth: 400) {
          src
        }
      }
      body {
        raw
      }
      createdAt
    }
  }
`
