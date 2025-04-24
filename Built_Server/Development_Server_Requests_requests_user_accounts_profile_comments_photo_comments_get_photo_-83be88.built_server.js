"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_comments_photo_comments_get_photo_-83be88";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_comments_photo_comments_get_photo_-83be88"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/comments/photo_comments/get_photo_comments.js":
/*!******************************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/comments/photo_comments/get_photo_comments.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res) => {\n    let photo_info = req.body;\n    let query = `select * from Photo_Comments where belongs_to_photo_id = ${photo_info.id}`;\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({\n          message: \"Error retrieving comments\",\n          photo_comments: []\n        });\n      } else {\n        res.json({\n          message: `Successfully retrieved ${result.length} comments`,\n          photo_comments: result\n        });\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/comments/photo_comments/get_photo_comments.js?");

/***/ })

};
;