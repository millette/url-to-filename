// node
import { parse, join, dirname, basename } from "node:path"

// npm
import filenamifyUrl from "filenamify-url"

export default function yo(url) {
  let { pathname, host, search } = typeof url === "string" ? new URL(url) : url
  if (pathname === "/") pathname = "/index.no-path"
  const { dir, base } = parse(
    join(
      filenamifyUrl(host),
      dirname(pathname),
      filenamifyUrl(basename(pathname) + search)
    )
  )
  return { dir, filename: base }
}
