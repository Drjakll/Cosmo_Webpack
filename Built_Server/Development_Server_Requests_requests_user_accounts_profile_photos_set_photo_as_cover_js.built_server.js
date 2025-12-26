"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_photos_set_photo_as_cover_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_photos_set_photo_as_cover_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/photos/set_photo_as_cover.js":
/*!*************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/photos/set_photo_as_cover.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res) => {\n    let {\n      photo_id,\n      target_id,\n      target_type\n    } = req.body;\n    let query = `update Photo_Links set is_a_cover = false where target_type = '${target_type}' and target_id = ${target_id} and is_a_cover = true`;\n    let query2 = `update Photo_Links set is_a_cover = true where target_type = '${target_type}' and target_id = ${target_id} and id = ${photo_id}`;\n    try {\n      await this.sql(query);\n      await this.sql(query2);\n    } catch (err) {\n      console.log(err, query);\n    }\n    res.end();\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/photos/set_photo_as_cover.js?\n}");

/***/ })

};
;