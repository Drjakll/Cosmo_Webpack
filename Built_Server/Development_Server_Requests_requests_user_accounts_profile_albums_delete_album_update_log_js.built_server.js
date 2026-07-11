"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_albums_delete_album_update_log_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_albums_delete_album_update_log_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/albums/delete_album_update_log.js"
/*!******************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/albums/delete_album_update_log.js ***!
  \******************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function ({\n  sql\n}) {\n  this.req_path = \"/delete_album_update_log\";\n  this.req_type = \"post\";\n  this.callbacks = [\"delete_album_update_log\"];\n  this.req = async (req, res) => {\n    let {\n      time_uploaded,\n      album_info\n    } = req.body;\n    let data = [time_uploaded];\n    let query = `delete from Photo_Album_Update_Logs where time_occured = ?`;\n    try {\n      let [result] = await sql.query(query, data);\n      res.json({\n        message: `All photos on this update has been erased`,\n        photos: [],\n        album_info\n      });\n    } catch (err) {\n      res.json({\n        message: \"Failed to log onto album update!\",\n        failed: true,\n        album_info: {}\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/albums/delete_album_update_log.js?\n}");

/***/ }

};
;