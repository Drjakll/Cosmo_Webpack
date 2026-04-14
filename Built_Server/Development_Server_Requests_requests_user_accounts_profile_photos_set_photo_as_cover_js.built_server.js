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

/***/ "./Development/Server/Requests/requests/user_accounts/profile/photos/set_photo_as_cover.js"
/*!*************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/photos/set_photo_as_cover.js ***!
  \*************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res) => {\n    let {\n      last_cover_id,\n      photo_cover_id\n    } = req.body;\n    if (photo_cover_id <= 0 || photo_cover_id === last_cover_id) {\n      res.json({\n        message: null\n      });\n      return;\n    }\n    last_cover_id = last_cover_id === \"\" ? 0 : last_cover_id;\n    let query = `\n            update Photo_Links \n            set \n                is_a_cover = \n                    case id\n                        when ${last_cover_id} then false\n                        when ${photo_cover_id} then true\n                    end\n            where id in (${last_cover_id},${photo_cover_id})\n        `;\n    try {\n      await this.sql.query(query);\n      res.json({\n        message: \"Successfully updated cover photo\"\n      });\n    } catch (err) {\n      console.log(err, query);\n      res.json({\n        message: null\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/photos/set_photo_as_cover.js?\n}");

/***/ }

};
;