module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/setup/_variables.scss";`
      }
    }
  }
};
