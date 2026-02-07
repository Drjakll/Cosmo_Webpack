"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_albums_get_album_update_logs_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_albums_get_album_update_logs_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/albums/get_album_update_logs.js":
/*!****************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/albums/get_album_update_logs.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res, next) => {\n    let {\n      id\n    } = req.body;\n    let data = [id];\n    let query = `select * from Photo_Album_Update_Logs where id = ?`;\n    try {\n      let [result] = await this.sql.query(query, data);\n      if (result.length === 0) {\n        res.json({\n          message: \"Error fetching photo album update logs\"\n        });\n        return;\n      }\n      let {\n        album_id,\n        time_occurred\n      } = result[0];\n      req.body.album_id = album_id;\n      req.body.time_uploaded = time_occurred;\n      next();\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: \"Failed to log onto album update!\",\n        failed: true\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/albums/get_album_update_logs.js?\n}");

/***/ })

};
;