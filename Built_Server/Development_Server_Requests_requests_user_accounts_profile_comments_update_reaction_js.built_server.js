"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_comments_update_reaction_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_comments_update_reaction_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/comments/update_reaction.js"
/*!************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/comments/update_reaction.js ***!
  \************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res) => {\n    let {\n      target_id,\n      emojis,\n      reaction,\n      user_id,\n      target_type\n    } = req.body;\n    let data = target_type ? [emojis, reaction, target_id, user_id, target_type] : [emojis, reaction, target_id, user_id];\n    let table_name = target_type ? \"General_Reactions\" : \"Comment_Reactions\";\n    let query = `update ${table_name} set emojis = emojis ^ ?, reaction = ? where target_id = ? and user_id = ? ${target_type ? \"and target_type = ?\" : \"\"}`;\n    try {\n      await this.sql.query(query, [data]);\n      res.json({\n        message: \"Successfully submitted a reaction\",\n        failed: false\n      });\n    } catch (err) {\n      console.log(err);\n      res.json({\n        message: \"Error submitting a reaction\",\n        failed: true\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/comments/update_reaction.js?\n}");

/***/ }

};
;