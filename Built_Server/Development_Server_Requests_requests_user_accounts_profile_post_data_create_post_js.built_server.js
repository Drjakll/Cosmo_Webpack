"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_post_data_create_post_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_post_data_create_post_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/post_data/create_post.js"
/*!*********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/post_data/create_post.js ***!
  \*********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res, next) => {\n    let {\n      user_id,\n      body,\n      title\n    } = req.body;\n    if (isNaN(parseInt(user_id)) || !body || !title) {\n      res.json({\n        message: \"Missing required fields\",\n        result: null\n      });\n      return;\n    }\n    let created_on = Date.now();\n    let data = [title, body, user_id, created_on, created_on];\n    let query = `insert into Post_Data(title, body, user_id, created_on, last_edited) values (?,?,?,?,?)`;\n    try {\n      let [result] = await this.sql.query(query, data);\n      let post_obj = {\n        id: result.insertId,\n        title,\n        body,\n        user_id,\n        created_on,\n        last_edited: created_on\n      };\n      req.body.target_id = post_obj.id;\n      req.body.target_type = \"post\";\n      req.body.created_on = created_on;\n      req.body.result = post_obj;\n\n      //Should call add_to_feeds.js\n      next();\n    } catch (err) {\n      console.log(err);\n      res.json({\n        message: \"Error adding new post\",\n        result: null\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/post_data/create_post.js?\n}");

/***/ }

};
;