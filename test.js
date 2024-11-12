// node
import test from 'node:test'
import assert from 'node:assert'

// self
import yo from "./index.js"

const str = "http://www.google.com:82/more/index.php?that=all"
const invalidUrlRe = /^TypeError: Invalid URL$/

test('just a string, it throws', (t) => assert.throws(() => yo("bob"), invalidUrlRe))

test('just a string-like domain, it throws', (t) => assert.throws(() => yo("bob.com"), invalidUrlRe))

test('as domain', (t) => {
  const { dir, filename } = yo("http://www.google.com")
  assert.equal(dir, "google.com")
  assert.equal(filename, "index.no-path")
})

test('as string', (t) => {
  const { dir, filename } = yo(str)
  assert.equal(dir, "google.com!82/more")
  assert.equal(filename, "index.php!that=all")
})

test('as url', (t) => {
  const { dir, filename } = yo(new URL(str))
  assert.equal(dir, "google.com!82/more")
  assert.equal(filename, "index.php!that=all")
})
