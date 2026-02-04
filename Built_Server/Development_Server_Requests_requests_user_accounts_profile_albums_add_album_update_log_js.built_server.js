"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_albums_add_album_update_log_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_albums_add_album_update_log_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/albums/add_album_update_log.js":
/*!***************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/albums/add_album_update_log.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res, next) => {\n    let {\n      album_id,\n      change_type,\n      changes\n    } = req.body;\n    let time_occured = Date.now();\n    let data = [album_id, change_type, changes, time_occured];\n    let query = `insert into Photo_Album_Update_Logs(album_id, change_type, changes, time_occured) values(?,?,?,?);`;\n    try {\n      let [result] = await this.sql.query(query, data);\n      req.body.target_type = \"album_updates\";\n      req.body.target_id = result.insertId;\n      req.body.created_on = time_occured;\n\n      //Should called add_to_feeds.js\n      next();\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: \"Failed to log onto album update!\",\n        failed: true\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/albums/add_album_update_log.js?\n}");

/***/ })

};
;