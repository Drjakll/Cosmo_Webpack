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

/***/ "./Development/Server/Requests/requests/user_accounts/profile/post_data/get_posts.js"
/*!*******************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/post_data/get_posts.js ***!
  \*******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function (sql, s3, PutObjectCommand) {\n  this.req_path = \"/get_posts\";\n  this.req_type = \"post\";\n  this.callbacks = [\"get_posts\", \"get_reactions\"];\n  this.req = async (req, res, next) => {\n    let {\n      user_id,\n      start,\n      end,\n      id\n    } = req.body;\n\n    //If id exists, that means just find one post, else search the posts within the date range\n    let data = id ? [user_id, id] : [user_id, start, end];\n    let query = `select \n                        pd.*,\n                        (select count(*) from Comments where post_id = pd.id) as comments_count\n                    from\n                        Post_Data as pd\n\n                    where pd.user_id = ?\n                    ${id ? `and pd.id = ? ` : `\n                        and pd.created_on >= ?\n                        and pd.created_on < ?\n                        `}\n                    order by pd.created_on asc`;\n    try {\n      let [results] = await this.sql.query(query, data);\n      req.body.targets = results;\n      req.body.target_id_type = 'post_id';\n\n      //Next should be getting the reactions\n      next();\n    } catch (err) {\n      console.log(err);\n      res.json({\n        message: \"Error retrieving post(s)\",\n        posts: []\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/post_data/get_posts.js?\n}");

/***/ }

};
;