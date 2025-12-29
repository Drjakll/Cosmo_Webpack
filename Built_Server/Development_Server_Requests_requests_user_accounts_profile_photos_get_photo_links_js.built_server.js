"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_photos_get_photo_links_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_photos_get_photo_links_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/photos/get_photo_links.js":
/*!**********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/photos/get_photo_links.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res, next) => {\n    let {\n      target_id,\n      target_type\n    } = req.body;\n    let requirements = [target_id, target_type];\n    let query = `select * from Photo_Links where target_id = ? and target_type = ?`;\n    try {\n      let [results] = await this.sql.query(query, requirements);\n      req.body.results = results;\n      req.body.message = \"Successfully retrieved photo links\";\n      req.body.photos = results; //In case delete_photo_links is the next middleware\n\n      next();\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        result: [],\n        message: \"Error retrieving photo links\"\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/photos/get_photo_links.js?\n}");

/***/ })

};
;