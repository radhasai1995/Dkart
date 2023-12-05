const path = require("path");
const alias = require("./alias");

const getRootPath = srcPath => path.resolve(__dirname, srcPath);
const { override, addBabelPlugins, addWebpackAlias } = require("customize-cra");

module.exports = override(addWebpackAlias(alias));
