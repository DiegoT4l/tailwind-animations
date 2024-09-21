import tailwindcss from 'tailwindcss'
import postcss from 'postcss'
import minify from '@csstools/postcss-minify'
import animationsPlugin from '../src/index.js'

const TAILWIND_BASE = '@tailwind utilities;'

export function generatePluginCSS (options = {}) {
  const { inline = '', content = '', prefix = '' } = options

  return postcss([
    minify(),
    tailwindcss({
      plugins: [animationsPlugin],
      content: [{ raw: content }],
      prefix: prefix ? `${prefix}-` : '' // Aplica el prefijo si se proporciona
    })
  ])
    .process(`${TAILWIND_BASE} ${inline}`, {
      from: undefined
    })
    .then(result => result.css)
}