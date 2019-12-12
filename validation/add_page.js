const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAddPageInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.content = !isEmpty(data.content) ? data.content : "";

  //Check for Page title
  if (!Validator.isLength(data.title, { min: 3, max: 80 })) {
    errors.title = "title must be between 3 and 80 characters";
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.content)) {
    errors.content = "Page content field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
