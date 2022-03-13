// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "INGRED UI Docs",
  tagline: "Ingredients for build UI",
  url: "https://github.com/", // TODO デプロイ先URLを記述
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "voyagegroup",
  projectName: "ingred-ui",

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "INGRED UI",
        logo: {
          alt: "INGRED UI Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            href: "/about",
            position: "left",
            label: "About",
          },
          {
            href: "/docs/intro/installation",
            position: "left",
            label: "Docs",
          },
          {
            href: "https://github.com/voyagegroup/ingred-ui",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "概要",
            items: [
              {
                label: "About",
                href: "/about",
              },
            ],
          },
          {
            title: "Docs",
            items: [
              {
                label: "始め方",
                to: "/docs/intro/installation",
              },
              {
                label: "共通システム",
                to: "/docs/system/multiple",
              },
              {
                label: "Components",
                to: "/docs/components/Button",
              },
              {
                label: "Component API",
                to: "/docs/component-api/Button",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/voyagegroup/ingred-ui",
              },
              {
                label: "CARTA HOLDINGS",
                href: "https://cartaholdings.co.jp/",
              },
              {
                label: "fluct",
                href: "https://corp.fluct.jp",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} voyagegroup.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
