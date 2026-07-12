"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_comments_post_comments_get_post_co-8a2cff";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_comments_post_comments_get_post_co-8a2cff"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/comments/post_comments/get_post_comments.js":
/*!****************************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/comments/post_comments/get_post_comments.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res) => {\n    let post_info = req.body;\n    let {\n      id\n    } = post_info;\n    let query = `select \n                pc.*,\n                ua.first_name,\n                ua.last_name,\n                ua.profile_picture_link \n            from \n                Post_Comments as pc\n            join\n                User_Accounts as ua\n            on\n                pc.email = ua.email\n            where \n                pc.belongs_to_post_id = ${id}`;\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(query, err.sqlMessage);\n        res.json({\n          message: \"Error retrieving comments\",\n          post_comments: []\n        });\n      } else {\n        res.json({\n          message: `Successfully retrieved ${result.length} comments`,\n          post_comments: result\n        });\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/comments/post_comments/get_post_comments.js?\n}");

/***/ })

};
;