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
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian", "drafts", ".trash", ".csv"],
    defaultDateType: "created",
    theme: {
      typography: {
        header: "Ubuntu",
        body: "Ubuntu",
        code: "Cascadia Code",
      },
      colors: {
        lightMode: {
          light: "#E5E9F0", // faf8f8 - page background
          lightgray: "#d8dee9", // e5e5e5 - borders
          gray: "#A1ACC0", // b8b8b8 - graph links, heavier borders
          darkgray: "#3B4252", // 4e4e4e - body text
          dark: "#97365B", // 2b2b2b - header text and icons
          secondary: "#3B6EA8", // 284b63 - link colour, current graph node
          tertiary: "#8FBCBB", // 84a59d - hover states and visited graph nodes
          highlight: "rgba(143, 159, 169, 0.15)", // (143, 159, 169, 0.15) - internal link background, highlighted text
        },
        darkMode: {
          light: "#202329", // 161618
          lightgray: "#3B4252", // 393639
          gray: "#464F62", // 646464
          darkgray: "#E3E6EC", // d4d4d4
          dark: "#BF616A", // ebebec / #BF616A first nord
          secondary: "#81A1C1", // 7b97aa / #D08770 first nord
          tertiary: "#D08770", // 84a59d
          highlight: "rgba(143, 159, 169, 0.15)", // rgba(143, 159, 169, 0.15)
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.TableOfContents(),
      Plugin.CreatedModifiedDate({
        // you can add 'git' here for last modified from Git
        // if you do rely on git for dates, ensure defaultDateType is 'modified'
        priority: ["frontmatter", "filesystem"],
      }),
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