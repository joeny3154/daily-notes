
 sasslint-webpack-plugin
 ================

https://github.com/alleyinteractive/sasslint-webpack-plugin


### webpack 配置

```
import sassLintPlugin from 'sasslint-webpack-plugin';

new sassLintPlugin(
  {
    configFile: '.sass-lint.yml',
    context: ['./src/assets/common/scss'],
    ignoreFiles: ['./node_modules'],
    ignorePlugins: ['extract-text-webpack-plugin', 'html-webpack-plugin'],
    glob: '**/*.s?(a|c)ss',
    quiet: false,
    failOnWarning: false,
    failOnError: false,
    testing: false
  }
)
```

### 制定规则，创建sass-lint.yml

```
options:
  formatter: stylish
  merge-default-rules: false
files:
  include: './src/assets/**/*.scss'
rules:
  # Extends
  extends-before-declarations: 2
  extends-before-mixins: 2
  placeholder-in-extend: 0

  # Mixins
  mixins-before-declarations: 0

  # Line Spacing
  empty-line-between-blocks: 0
  one-declaration-per-line: 2
  single-line-per-selector: 0

  # Disallows
  no-color-keywords: 0
  no-color-literals: 0
  no-css-comments: 0
  no-debug: 2
  no-duplicate-properties: [0, {exclude: ['background-image']}]
  no-empty-rulesets: 2
  no-extends: 0
  no-ids: 0
  no-important: 0
  no-invalid-hex: 2
  no-mergeable-selectors: 2
  no-misspelled-properties: 0
  no-qualifying-elements: 0
  no-trailing-whitespace: 0
  no-trailing-zero: 0
  no-transition-all: 2
  no-url-protocols: 2
  no-vendor-prefixes:
    - 0
    -
      excluded-identifiers:
        - 'webkit'
  no-warn: 2
  property-units: 0

  # Nesting
  force-attribute-nesting: 0
  force-element-nesting: 0
  force-pseudo-nesting: 0

  # Name Formats
  class-name-format:
    - 0
    -
      allow-leading-underscore: false
      convention: 'hyphenatedlowercase'
  function-name-format:
    - 0
    -
      allow-leading-underscore: false
      convention: 'hyphenatedlowercase'
  id-name-format:
    - 0
    -
      allow-leading-underscore: false
      convention: 'hyphenatedlowercase'
  mixin-name-format:
    - 0
    -
      allow-leading-underscore: false
      convention: 'hyphenatedlowercase'
  placeholder-name-format:
    - 0
    -
      allow-leading-underscore: false
      convention: 'hyphenatedlowercase'
  variable-name-format:
    - 0
    -
      allow-leading-underscore: false
      convention: 'camelcase'

  # Style Guide
  bem-depth: 0
  border-zero:
    - 0
    -
      convention: '0'
  brace-style:
    - 2
    -
      style: '1tbs'
      allow-single-line: false
  clean-import-paths: 0
  empty-args:
    - 0
    -
      include: true
  hex-length: 0
  hex-notation:
    - 0
    -
      style: 'lowercase'
  indentation:
    - 0
    -
      size: 'tab'
  leading-zero: 0
  nesting-depth: 0
  property-sort-order: 0
  quotes:
    - 0
    -
      style: 'double'
  shorthand-values: 0
  url-quotes: 0
  variable-for-property: 0
  zero-unit:
    - 0
    -
      include: false

  # Inner Spacing
  space-after-bang:
    - 0
    -
      include: false
  space-after-colon:
    - 0
    -
      include: true
  space-after-comma:
    - 0
    -
      include: true
  space-around-operator:
    - 0
    -
      include: true
  space-before-bang:
    - 0
    -
      include: true
  space-before-brace:
    - 0
    -
      include: true
  space-before-colon:
    - 0
    -
      include: false
  space-between-parens:
    - 0
    -
      include: false

  # Final Items
  final-newline:
    - 0
    -
      include: true
  trailing-semicolon:
    - 0
    -
      include: true

```