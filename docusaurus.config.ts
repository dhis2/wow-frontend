import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import "dotenv/config";

const config: Config = {
  title: "DHIS2 FE WoW",
  tagline: "DHIS2 Frontend Way of Working",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://dhis2.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.BASE_URL || "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "dhis2", // Usually your GitHub org/user name.
  projectName: "wow-frontend", // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/dhis-logo.png",
    navbar: {
      title: "Frontend Way of Working (WIP)",
      logo: {
        alt: "DHIS2 Logo",
        src: "img/dhis2-logo.svg",
      },
      items: [
        {
          to: "repos",
          label: "Repos Catalog",
        },
        {
          type: "docSidebar",
          sidebarId: "wayOfWorkingSideBar",
          label: "Way of Working",
        },
        {
          type: "docSidebar",
          sidebarId: "onboardingSideBar",
          label: "Onboarding",
        },
        {
          type: "dropdown",
          label: "Other",
          items: [
            {
              href: "https://dhis2.github.io/academy-web-app-dev/docs/web-academy/",
              label: "Web Academy",
            },
          ],
        },
        {
          href: "https://github.com/facebook/docusaurus",
          label: "GitHub",
          className: "red",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [],
      copyright: `Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  plugins: ["./plugin-repos"],
};

export default config;
