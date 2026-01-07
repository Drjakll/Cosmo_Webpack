"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_post_data_delete_post_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_post_data_delete_post_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/post_data/delete_post.js":
/*!*********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/post_data/delete_post.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res, next) => {\n    let {\n      id,\n      user_id\n    } = req.body;\n    let query = `delete from Post_Data where id = ? and user_id = ?`;\n    try {\n      await this.sql.query(query, [id, user_id]);\n\n      //Query to select all the photo links belong to the post\n      query = `select * from Photo_Links where target_id = ? and target_type = ?`;\n      const [rows] = await this.sql.query(query, [id, \"post\"]);\n      req.body.photos = rows;\n\n      //For deleting comments within the post\n      req.body.requirements = [[id], [\"post\"]];\n\n      //On to erasing the post photo links in the data base\n      next();\n    } catch (err) {\n      console.log(err, query);\n      res.json({\n        message: \"Error deleting post...\"\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/post_data/delete_post.js?\n}");

/***/ })

};
;