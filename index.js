// node
import { parse, join, dirname, basename } from "node:path"

// npm
import filenamifyUrl from "filenamify-url"
import filenamify from "filenamify"

export default function yo(url) {
  let { pathname, host, search } = typeof url === "string" ? new URL(url) : url
  if (pathname === "/") pathname = "/index.no-path"

  const { dir, base } = parse(
    join(
      filenamifyUrl(host),
      dirname(pathname),
      filenamify(basename(pathname) + search)
    )
  )
  return { dir, filename: base }
}
