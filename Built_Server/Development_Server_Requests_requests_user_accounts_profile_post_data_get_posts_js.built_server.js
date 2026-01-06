"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_post_data_get_posts_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_post_data_get_posts_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/post_data/get_posts.js":
/*!*******************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/post_data/get_posts.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res) => {\n    let {\n      user_id,\n      date_interval\n    } = req.body;\n    let query = `select * from Post_Data where user_id = ${user_id} \n                                               and created_on >= ${date_interval.start}\n                                               and created_on <= ${date_interval.end}\n                                               order by created_on asc`;\n    try {\n      let [results] = await this.sql.query(query);\n      res.json({\n        message: `Successfully retrieved ${results.length} posts`,\n        posts: results\n      });\n    } catch (err) {\n      console.log(err);\n      res.json({\n        message: \"Error retrieving post(s)\",\n        posts: []\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/post_data/get_posts.js?\n}");

/***/ })

};
;