const path = require("path");
const getRootPath = srcPath => path.resolve(__dirname, srcPath);

module.exports = {
  "@iconsGallery": getRootPath("../src/IconsGallery"),
  "@componentLib": getRootPath("../src/Components"),
  "@apiService": getRootPath("../src/apiServices"),
  "@utils": getRootPath("../src/utils"),
  "@constants": getRootPath("../src/Constants"),
  "@pageConfiguration": getRootPath("../src/pageConfiguration"),
  "@globalFixture": getRootPath("../src/globalFixture"),
};
