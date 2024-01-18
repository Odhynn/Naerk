import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "🌑 Naerk",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    baseUrl: "github.com/Odhynn/naerk",
    ignorePatterns: ["private", "templates", ".obsidian", "drafts"],
    defaultDateType: "created",
    theme: {
      typography: {
        header: "Ubuntu",
        body: "Ubuntu",
        code: "Ubuntu",
      },
      colors: {
        lightMode: {
          light: "#eceff4", // faf8f8 - page background
          lightgray: "#d8dee9", // e5e5e5 - borders
          gray: "#4c566a", // b8b8b8 - graph links, heavier borders
          darkgray: "#4e4e4e", // 4e4e4e - body text
          dark: "#D08770", // 2b2b2b - header text and icons
          secondary: "#BF616A", // 284b63 - link colour, current graph node
          tertiary: "#8FBCBB", // 84a59d - hover states and visited graph nodes
          highlight: "rgba(143, 159, 169, 0.15)", // (143, 159, 169, 0.15) - internal link background, highlighted text
        },
        darkMode: {
          light: "#2E3440", // 161618
          lightgray: "#3B4252", // 393639
          gray: "#464F62", // 646464
          darkgray: "#d4d4d4", // d4d4d4
          dark: "#D08770", // ebebec
          secondary: "#BF616A", // 7b97aa
          tertiary: "#8FBCBB", // 84a59d
          highlight: "rgba(143, 159, 169, 0.15)", // rgba(143, 159, 169, 0.15)
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.TableOfContents(),
      // Plugin.CreatedModifiedDate({
      //   // you can add 'git' here for last modified from Git
      //   // if you do rely on git for dates, ensure defaultDateType is 'modified'
      //   priority: ["frontmatter", "filesystem"],
      // }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting(),
      Plugin.HardLineBreaks(),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources({ fontOrigin: "googleFonts" }),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
