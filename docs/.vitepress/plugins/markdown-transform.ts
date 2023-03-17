import type { Plugin } from 'vite'
import path from 'path'

type Append = Record<'headers' | 'footers' | 'scriptSetups', string[]>

export function MarkdownTransform(): Plugin {
  return {
    name: 'hanav-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.md')) return
      console.log('md')
      const componentId = path.basename(id, '.md')
      const append: Append = {
        headers: [],
        footers: [],
        scriptSetups: [
          `const demos = import.meta.glob('../../examples/${componentId}/*.vue', { eager: true , import: 'default'})`,
        ],
      }
      code = transformVpScriptSetup(code, append)
      console.log(combineMarkdown(
        code,
        [combineScriptSetup(append.scriptSetups), ...append.headers],
        append.footers
      ))
      return combineMarkdown(
        code,
        [combineScriptSetup(append.scriptSetups), ...append.headers],
        append.footers
      )
    }
  }
}

const vpScriptSetupRE = /<vp-script\s(.*\s)?setup(\s.*)?>([\s\S]*)<\/vp-script>/

const transformVpScriptSetup = (code: string, append: Append) => {
  const matches = code.match(vpScriptSetupRE)
  if (matches) code = code.replace(matches[0], '')
  const scriptSetup = matches?.[3] ?? ''
  if (scriptSetup) append.scriptSetups.push(scriptSetup)
  return code
}

const combineMarkdown = (
  code: string,
  headers: string[],
  footers: string[]
) => {
  const frontmatterEnds = code.indexOf('---\n\n') + 4
  const firstSubheader = code.search(/\n## \w/)
  const sliceIndex = firstSubheader < 0 ? frontmatterEnds : firstSubheader

  if (headers.length > 0)
    code =
      code.slice(0, sliceIndex) + headers.join('\n') + code.slice(sliceIndex)
  code += footers.join('\n')

  return `${code}\n`
}


const combineScriptSetup = (codes: string[]) =>
  `\n<script setup>
${codes.join('\n')}
</script>
`