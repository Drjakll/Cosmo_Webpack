"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_comments_photo_comments_submit_pho-4c3b68";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_comments_photo_comments_submit_pho-4c3b68"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/comments/photo_comments/submit_photo_comment.js":
/*!********************************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/comments/photo_comments/submit_photo_comment.js ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res) => {\n    let comment_info = req.body;\n    let query = this.generate_insert_query(\"Photo_Comments\", comment_info);\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(query, err.sqlMessage);\n        res.json({\n          message: \"Error submitting comment\"\n        });\n      } else {\n        res.json({\n          message: `Successfully submitted comment`\n        });\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/comments/photo_comments/submit_photo_comment.js?\n}");

/***/ })

};
;