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

/***/ "./Development/Server/Requests/requests/user_accounts/profile/post_data/delete_post.js"
/*!*********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/post_data/delete_post.js ***!
  \*********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function ({\n  sql\n}) {\n  this.req_path = \"/delete_post\";\n  this.req_type = \"post\";\n  this.callbacks = [\"delete_post\", \"delete_photo_files\"];\n  this.req = async (req, res, next) => {\n    //created_on parameter isn't needed here but will need it when deleting the feed\n    let {\n      id,\n      user_id,\n      created_on\n    } = req.body;\n\n    //Query to select all the photo links belong to the post before it gets automatically deleted\n    let query = `select * from Photo_Links where post_id = ?`;\n    try {\n      const [photos] = await sql.query(query, [id, user_id]);\n      query = `delete from Post_Data where id = ? and user_id = ?`;\n      await this.sql.query(query, [id]);\n      req.body.photos = photos;\n\n      //On to deleting the files with delete_photo_files.js\n      next();\n    } catch (err) {\n      console.log(err, query);\n      res.json({\n        message: \"Error deleting post...\"\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/post_data/delete_post.js?\n}");

/***/ }

};
;