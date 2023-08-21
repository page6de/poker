const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  outputDir: '../backend/public',
  pages: {
    index: {
      entry: 'src/main.ts',
      title: 'Scrum Poker',
    },
  },
  pwa: {
    name: "Scrum Poker",
    appleMobileWebAppCapable: true,
    themeColor: "#5A9CFF",
    msTileColor: "#5A9CFF",
    manifestOptions: {
      background_color: "#FFFFFF"
    }
  }
})
