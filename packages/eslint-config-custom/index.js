module.exports = {
  extends: [
    'next',
    'turbo',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['simple-import-sort', '@typescript-eslint'],
  rules: {
    // OFF
    '@next/next/no-html-link-for-pages': 'off',
    'turbo/no-undeclared-env-vars': 'off',
    '@typescript-eslint/no-namespace': 'off',
    
    // ERRORS
    semi: ['error', 'never'],
    indent: ['error', 2],
    camelcase: ['error', { properties: 'never' }],
    '@typescript-eslint/no-explicit-any': ['error', { 'ignoreRestArgs': true }],
    '@typescript-eslint/type-annotation-spacing': ['error', { 'before': false, 'after': true }],
    'space-infix-ops': ['error', { 'int32Hint': false }],
    'comma-dangle': ['error', 'always-multiline'],
    'react/prop-types': ['error'],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'comma-style': ['error', 'last'],
    'no-caller': 'error',
    'no-empty': ['error', { 'allowEmptyCatch': true }],
    'no-await-in-loop': 'error',
    'no-else-return': 'error',
    'no-constant-condition': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'error',
    'prefer-arrow-callback': 'error',
    'func-style': ['error', 'expression'],
    'keyword-spacing': ['error',
      {
        before: true,
        after: true,
      }],
    'key-spacing': ['error',
      {
        beforeColon: false,
        afterColon: true,
      }],
    'spaced-comment': ['error', 'always'],
    'no-mixed-operators': ['error',
      {
        'groups': [
          ['==',
            '!=',
            '===',
            '!==',
            '>',
            '>=',
            '<',
            '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        'allowSamePrecedence': true,
      }],
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
        ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
      },
    ],
    'array-element-newline': ['error',
      {
        ArrayExpression: { multiline: true, minItems: 4 },
        ArrayPattern: { multiline: true, minItems: 4 },
      }],
    '@typescript-eslint/no-unused-vars': [
      'error', { argsIgnorePattern: '^_.*' },
    ],
    'object-curly-spacing': ['error', 'always'],
    'prefer-const': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Prioritized Packages.
          // React and Next.js
          ['^\\breact(?!-)\\b(?:\\/\\S*)?', '^\\bnext(?!-)\\b(?:\\/\\S*)?'],
          // Express, Apollo, GraphQL, etc.
          ['^\\bexpress\\b(?:\\/\\S*)?',
            '^graphql-yoga$',
            '^\\bapollo\\b(?:\\/\\S*)?',
            '^\\bgraphql\\b(?:\\/\\S*)?'],
          // Internal packages.
          ['^@/'],
          // External packages.
          ['^[^.]'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],

    // JSX
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-curly-spacing': ['error', 'never'],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-max-props-per-line': ['error', { 'maximum': 1 }],
    'react/jsx-tag-spacing': ['error',
      {
        'closingSlash': 'never',
        'beforeSelfClosing': 'always',
        'afterOpening': 'never',
        'beforeClosing': 'never',
      }],
    'react/jsx-wrap-multilines': ['error',
      {
        'declaration': 'parens-new-line',
        'assignment': 'parens-new-line',
        'return': 'parens-new-line',
        'arrow': 'parens-new-line',
        'condition': 'parens-new-line',
        'logical': 'parens-new-line',
        'prop': 'parens-new-line',
      }],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-curly-newline': ['error', { multiline: 'consistent', singleline: 'consistent' }],
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/jsx-uses-vars': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-sort-props': ['error',
      {
        'callbacksLast': true,
        'shorthandFirst': true,
        'shorthandLast': false,
        'ignoreCase': true,
        'noSortAlphabetically': true,
        'reservedFirst': true,
      }],
    'react/function-component-definition': ['error',
      {
        'namedComponents': 'arrow-function',
        'unnamedComponents': 'arrow-function',
      }],
    'jsx-quotes': ['error', 'prefer-double'],
  },
}