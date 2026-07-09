"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_comments_delete_comments_from_targets_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_comments_delete_comments_from_targets_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/comments/delete_comments_from_targets.js"
/*!*************************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/comments/delete_comments_from_targets.js ***!
  \*************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function (sql, s3, PutObjectCommand) {\n  this.req_path = \"/delete_comments_from_targets\";\n  this.req_type = \"post\";\n  this.callbacks = [\"delete_comments_from_targets\"];\n\n  //Deleting comments from multiple targets\n  this.req = async (req, res, next) => {\n    let {\n      target_ids,\n      target_id_type\n    } = req.body;\n    let query = `delete from Comments where ${target_id_type} in (?)`;\n    try {\n      await this.sql.query(query, [target_ids]);\n      res.json({\n        message: \"Successfully deleted comments\",\n        failed: false\n      });\n    } catch (err) {\n      console.log(err);\n      res.json({\n        message: \"Failed to delete the comment\",\n        failed: true\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/comments/delete_comments_from_targets.js?\n}");

/***/ }

};
;