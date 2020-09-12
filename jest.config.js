const { jestConfig } = require("@salesforce/sfdx-lwc-jest/config");
module.exports = {
  ...jestConfig,
  // add any custom configurations here
  moduleNameMapper: {
    "^lightning/messageService$":
      "<rootDir>/es-space-mgmt/tests/lightning/messageService"
  }
};
