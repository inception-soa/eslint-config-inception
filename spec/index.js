'use strict'
/**
 * @file Unit tests for code-style
 *
 * @author Anand Suresh <anandsuresh@gmail.com>
 * @copyright Copyright (C) 2017 Anand Suresh
 * @license Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const node = {
  path: require('path')
}
const eslint = require('eslint')
const chai = require('chai')
const expect = chai.expect

describe('eslint-config-inception', function () {
  const linter = new eslint.CLIEngine({
    configFile: node.path.join(__dirname, '..', 'eslintrc.json')
  })
  const lint = function (code) {
    const res = linter.executeOnText(code)
    return res.results[0].messages[0].message
  }

  it('should complain about long lines', function () {
    const msg = 'Line 1 exceeds the maximum line length of 80.'
    expect(lint('var foo = { "bar": "This is a bar.", "baz": { "qux": "This is a qux" }, "difficult": "to read" }; // very long')).to.equal(msg)
  })

  it('should complain about missing semicolons', function () {
    const msg = 'Missing semicolon.'
    expect(lint("console.log('no semicolon at the end')\n")).to.equal(msg)
  })

  it('should complain about space before parenthesis for anonymous functions', function () {
    const msg = 'Missing space before function parentheses.'
    expect(lint('setTimeout(function() { return }, 100)\n')).to.equal(msg)
  })

  it('should complain about space before function parenthesis', function () {
    const msg = 'Unexpected space before function parentheses.'
    expect(lint('function func () { return }\nfunc()')).to.equal(msg)
  })
})
