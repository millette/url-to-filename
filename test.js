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

test('with number (dotted)', (t) => {
  const { dir, filename } = yo("https://aiispq.org/a-propos/bottin-des-membres/users-page/1/")
  assert.equal(dir, "aiispq.org/a-propos/bottin-des-membres/users-page")
  assert.notEqual(filename, "0.0.0.1")
})

test('with number', (t) => {
  const { dir, filename } = yo("https://aiispq.org/a-propos/bottin-des-membres/users-page/1/")
  assert.equal(dir, "aiispq.org/a-propos/bottin-des-membres/users-page")
  assert.equal(filename, "1")
})
