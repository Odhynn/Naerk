import { htmlToJsx } from "../util/jsx"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { Root } from "hast"


function Content({ fileData, tree }: QuartzComponentProps) {

  const wikitable = fileData.frontmatter?.wiki
  let tableHtml = '';
    if (wikitable) {
      // wikitable = wikitable.replace(/['"\[\]]+/g, '')
      for (const key in wikitable) {
        if (wikitable.hasOwnProperty(key)) {
          tableHtml += `**${key}:** ${wikitable[key]}  `;
          // tableHtml += `<tr><td>${key}</td><td>${wikitable[key]}</td></tr>`;
        }

      }
    } else {
      return null
    }
  console.log(tableHtml)

  const content =
  (tree as Root).children.length === 0
    ? fileData.frontmatter
    : htmlToJsx(fileData.filePath!, tree)

  return (
      <div class="popover-hint">
        <article>
          <p>{content}</p>
        </article>
      </div>
    )
}

export default (() => Content) satisfies QuartzComponentConstructor