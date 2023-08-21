const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  outputDir: '../backend/public',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Scrum Poker',
    },
  }
})
