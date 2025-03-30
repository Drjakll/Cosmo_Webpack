"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_photos_add_photo_links_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_photos_add_photo_links_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/photos/add_photo_links.js":
/*!**********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/photos/add_photo_links.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res) => {\n    let photo_data = req.body;\n    let count = photo_data.length;\n    let completed = 0;\n    let recursion = index => {\n      if (index >= count) {\n        res.json({\n          message: `Added ${completed} out of ${count} entries`\n        });\n        res.end();\n        return;\n      }\n      let photo = photo_data[index];\n      let query = this.generate_insert_query(\"User_Photo_Links\", photo);\n      this.sql.query(query, (err, results) => {\n        if (err) {\n          console.log(err.sqlMessage);\n        } else {\n          completed++;\n        }\n        recursion(index + 1);\n      });\n    };\n    recursion(0);\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/photos/add_photo_links.js?");

/***/ })

};
;