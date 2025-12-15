"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_post_data_delete_post_photo_links_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_post_data_delete_post_photo_links_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/post_data/delete_post_photo_links.js":
/*!*********************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/post_data/delete_post_photo_links.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res) => {\n    let photos = req.body;\n    if (Object.keys(photos).length === 0) {\n      res.json({\n        message: \"No photo data has been deleted\"\n      });\n      res.end();\n      return;\n    }\n    let query = `delete from Post_Photos where `;\n    for (let i in photos) {\n      query += ` id = ${photos[i].id} or`;\n    }\n    query = query.slice(0, -3);\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(query, err.sqlMessage);\n        res.json({\n          message: \"Error deleting photo\"\n        });\n      } else {\n        res.json({\n          message: `Successfully deleted ${result.affectedRows} photo links`\n        });\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/post_data/delete_post_photo_links.js?\n}");

/***/ })

};
;