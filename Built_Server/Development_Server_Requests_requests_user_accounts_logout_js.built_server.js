"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_logout_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_logout_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/logout.js"
/*!**********************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/logout.js ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request({\n  sql,\n  verify_encrypted_password\n}) {\n  this.req_path = \"/logout\";\n  this.req_type = \"get\";\n\n  //User will try to login with an email, and then it will try to create a session, if an existing session\n  //already exists, then it will login with the existing sessions, else it will continue creating a new session\n  this.callbacks = [\"logout\"];\n  this.req = (req, res) => {\n    const item_to_be_cleared = ['session_id', 'id'];\n    for (const item of item_to_be_cleared) {\n      res.clearCookie(item, {\n        httpOnly: true,\n        secure: \"development\" === \"production\",\n        sameSite: \"lax\",\n        path: \"/\"\n      });\n    }\n    res.end();\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/logout.js?\n}");

/***/ }

};
;