"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_comments_submit_comment_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_comments_submit_comment_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/comments/submit_comment.js":
/*!***********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/comments/submit_comment.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res) => {\n    let {\n      target_id,\n      target_type,\n      comment,\n      user_id,\n      reply_to_id\n    } = req.body;\n    let now = Date.now();\n    let data = [{\n      target_id,\n      target_type,\n      comment,\n      user_id,\n      time_stamp: now,\n      last_updated: now,\n      reply_to_id: reply_to_id ?? null\n    }];\n    let query = `insert into Comments (target_id, target_type, comment, user_id, time_stamp, last_updated, reply_to_id) values ?`;\n    try {\n      await this.sql.query(query, data);\n      res.json({\n        message: \"Successfully submitted a comment\",\n        failed: false\n      });\n    } catch (err) {\n      console.log(err);\n      res.json({\n        message: \"Error submitting a comment\",\n        failed: true\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/comments/submit_comment.js?\n}");

/***/ })

};
;