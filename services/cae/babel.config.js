module.exports = function(api) {
  const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          node: true
        },
        modules: "commonjs"
      }
    ]
  ];
  const plugins = [
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-export-namespace-from"
  ];
  const isTest = api.env("test");

  if (isTest) {
    plugins.push("istanbul");
  }

  return { presets, plugins,
    ignore: [
      "node_modules",
      "packages"
    ]
  };
};
