const auth = require("./auth.middleware");
const validation = require("./validation.middleware");

module.exports = {
    ...auth,
    ...validation
};
