"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_comments_delete_comment_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_comments_delete_comment_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/comments/delete_comment.js":
/*!***********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/comments/delete_comment.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res) => {\n    let {\n      id,\n      target_id,\n      target_type\n    } = req.body;\n    let requirements = [id, target_id, target_type];\n    let query = `delete from Comments where id = ? and target_id = ? and target_type = ?`;\n    try {\n      this.sql.query(query, requirements);\n      res.json({\n        message: \"Succesfully deleted the comment\",\n        failed: false\n      });\n    } catch (err) {\n      console.log(err);\n      res.json({\n        message: \"Failed to delete the comment\",\n        failed: true\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/comments/delete_comment.js?\n}");

/***/ })

};
;