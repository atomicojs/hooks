module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      {
        pattern: "test/**/*.test.js.map",
        included: false
      },
      { pattern: "test/**/*.test.js", type: "module", included: true }
    ],
    preprocessors: {
      "test/**/*.test.js": ["sourcemap"]
    },
    exclude: [],
    reporters: ["spec"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: true,
    concurrency: Infinity
  });
};
