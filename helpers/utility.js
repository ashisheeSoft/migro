exports.validateEmail = function (str) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)) {
      return true;
    } else {
      return false;
    }
  };

  exports.validateNumber = function (str) {
    if (/^\d+\.?\d*$/.test(str)) {
      return true;
    } else {
      return false;
    }
  };