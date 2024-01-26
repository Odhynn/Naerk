import { FullSlug, _stripSlashes, joinSegments, pathToRoot, slugifyFilePath, TransformOptions, transformInternalLink, transformLink, resolveRelative, simplifySlug, FilePath } from "../util/path"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
// import { safeLoad } from 'js-yaml';

export default (() => {
  function Wikitable({fileData, allFiles}: QuartzComponentProps, ) {
    const opts: TransformOptions = {
      strategy: "shortest",
      allSlugs: allFiles.map((fp) => fp.slug as FullSlug)
    }
    let wikitable = fileData.frontmatter?.wiki
    let tableHtml = '<table>';
    if (wikitable) {
      // wikitable = wikitable.replace(/['"\[\]]+/g, '')
      for (const key in wikitable) {
        if (wikitable.hasOwnProperty(key)) {
          tableHtml += `<tr><td>${key}</td><td>${wikitable[key]}</td></tr>`;
        }
      
      }
      tableHtml += '</table>';
      let href = transformLink(fileData.slug!, wikitable, opts)
      return (
        <div class="wikitable">
          <h4 style="margin-bottom:1rem">
            Attributes 
          </h4>
          <table class="tb">{tableHtml}</table>
        </div>
        )
      }
      else {
        return null;
      }
    }
    
    return Wikitable
  }) satisfies QuartzComponentConstructor
  

// function frontmatterToHtmlTable(frontmatter: string): string {
//   const data = safeLoad(frontmatter);
//   let tableHtml = '<table>';

//   for (const key in data) {
//     if (data.hasOwnProperty(key)) {
//       tableHtml += `<tr><td>${key}</td><td>${data[key]}</td></tr>`;
//     }
//   }

//   tableHtml += '</table>';
//   return tableHtml;
// }