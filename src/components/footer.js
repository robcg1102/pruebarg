import * as React from "react"

const Footer = () => {
  return (
    <footer
      style={{
        bottom: "0",
        width: "80%",
      }}
    >
      © {new Date().getFullYear()},{` `}
      <a
        href="https://robcg1102.netlify.app/"
        style={{ color: "purple", textDecoration: "none" }}
        target="_blank"
        rel="noreferrer"
      >
        robcg1102
      </a>
    </footer>
  )
}

export default Footer
