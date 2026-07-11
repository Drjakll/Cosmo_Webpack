"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_security_login_with_auth_token_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_security_login_with_auth_token_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/security/login_with_auth_token.js"
/*!**********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/security/login_with_auth_token.js ***!
  \**********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request({\n  sql\n}) {\n  this.req_path = '/login_with_auth_token/:email/:auth_token';\n  this.req_type = 'get';\n  this.callbacks = ['login_with_auth_token'];\n  this.req = async (req, res) => {\n    let {\n      email,\n      auth_token\n    } = req.params;\n    let query = `update User_Accounts set email_verified = 1 where email = ? and verification_code = ?`;\n    try {\n      let [result] = await sql.query(query, [email, code]);\n      if (result.affectedRows === 0) {\n        res.json({\n          message: \"Error verifying account\",\n          failed: true\n        });\n        return;\n      }\n      res.json({\n        message: \"Successfully verified account\",\n        failed: false\n      });\n    } catch (err) {\n      console.log(err);\n      res.json({\n        message: \"Error verifying account\",\n        failed: true\n      });\n    }\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/security/login_with_auth_token.js?\n}");

/***/ }

};
;