"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_comments_delete_multiple_comments_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_comments_delete_multiple_comments_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/comments/delete_multiple_comments.js"
/*!*********************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/comments/delete_multiple_comments.js ***!
  \*********************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function ({\n  sql\n}) {\n  this.req_path = \"/delete_multiple_comments\";\n  this.req_type = \"post\";\n  this.callbacks = [\"delete_multiple_comments\"];\n  this.req = async (req, res) => {\n    let {\n      comment_ids\n    } = req.body;\n    if (comment_ids.length === 0) {\n      res.json({\n        message: \"No comments to delete\",\n        failed: true\n      });\n      return;\n    }\n    let query = `delete from Comments where id in (?)`;\n    try {\n      await sql.query(query, comment_ids);\n      res.json({\n        message: \"Successfully deleted comments\",\n        failed: false\n      });\n    } catch (err) {\n      console.log(err);\n      res.json({\n        message: \"Failed to delete the comment\",\n        failed: true\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/comments/delete_multiple_comments.js?\n}");

/***/ }

};
;