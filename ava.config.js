export default {
  require: ['esm'],
  files: ['./test/**/*.test.js', '!./test/sample/**/*.*'],
  cache: true,
  concurrency: 5,
  failFast: true,
  failWithoutAssertions: false,
  tap: true,
  verbose: true
}
