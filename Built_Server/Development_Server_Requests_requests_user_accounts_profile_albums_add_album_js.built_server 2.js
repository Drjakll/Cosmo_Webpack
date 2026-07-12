"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_albums_add_album_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_albums_add_album_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/albums/add_album.js"
/*!****************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/albums/add_album.js ***!
  \****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res) => {\n    let {\n      title,\n      user_id\n    } = req.body;\n    if (!title || isNaN(parseInt(user_id))) {\n      res.json({\n        message: \"Missing required fields!\",\n        failed: true\n      });\n      return;\n    }\n    let created_on = Date.now();\n    let data = [{\n      title,\n      user_id,\n      created_on\n    }];\n    let query = `insert into Photo_Albums set ?`;\n    try {\n      await this.sql.query(query, data);\n      res.json({\n        message: \"Successfully created an album!\",\n        failed: false\n      });\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: \"Failed to created the album!\",\n        failed: true\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/albums/add_album.js?\n}");

/***/ }

};
;