import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function About() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`概要 | ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <main>概要</main>
    </Layout>
  );
}
