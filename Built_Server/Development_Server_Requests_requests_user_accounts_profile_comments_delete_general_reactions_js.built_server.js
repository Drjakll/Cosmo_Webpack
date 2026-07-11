"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_comments_delete_general_reactions_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_comments_delete_general_reactions_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/comments/delete_general_reactions.js"
/*!*********************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/comments/delete_general_reactions.js ***!
  \*********************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function ({\n  sql\n}) {\n  this.req_path = \"/delete_general_reactions\";\n  this.req_type = \"post\";\n  this.callbacks = [\"delete_general_reactions\"];\n  this.req = async (req, res, next) => {\n    let {\n      requirements\n    } = req.body;\n    let query = `delete from General_Reactions where target_id in (?) and target_type in (?)`;\n    try {\n      await sql.query(query, requirements);\n\n      //Should call to delete whatever it needs to delete next, post or photo files\n      next();\n    } catch (err) {\n      console.log(err);\n      res.json({\n        message: \"Failed to delete the comment\",\n        failed: true\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/comments/delete_general_reactions.js?\n}");

/***/ }

};
;