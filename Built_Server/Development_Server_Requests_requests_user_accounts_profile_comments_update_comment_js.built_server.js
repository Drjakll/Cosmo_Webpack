"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_comments_update_comment_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_comments_update_comment_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/comments/update_comment.js"
/*!***********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/comments/update_comment.js ***!
  \***********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function (sql, s3, PutObjectCommand) {\n  this.req_path = \"/update_comment\";\n  this.req_type = \"patch\";\n  this.callbacks = [\"update_comment\"];\n  this.req = async (req, res) => {\n    let {\n      comment,\n      id,\n      target_id_type,\n      target_id,\n      user_id\n    } = req.body;\n    let data = {\n      comment,\n      last_updated: Date.now()\n    };\n    let query = `update Comments set ? where id = ? and ${target_id_type} = ? and user_id = ?`;\n    try {\n      await this.sql.query(query, [data, id, target_id, user_id]);\n      res.json({\n        message: \"Successfully updated the comment\",\n        failed: false\n      });\n    } catch (err) {\n      console.log(err);\n      res.json({\n        message: \"Error updating the comment\",\n        failed: true\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/comments/update_comment.js?\n}");

/***/ }

};
;