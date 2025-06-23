const util = {
  getFileExtension: function (filename) {
    return filename.substring(filename.lastIndexOf(".") + 1);
  },
  replaceCharAt: function (str, index, replacement) {
    if (index < 0 || index >= str.length) {
      return str;
    }
    return str.slice(0, index) + replacement + str.slice(index + 1);
  }
};

export default util;