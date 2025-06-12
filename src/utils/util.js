const util = {
  getFileExtension: function (filename) {
    return filename.substring(filename.lastIndexOf(".") + 1);
  },
};

export default util;