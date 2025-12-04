"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_news_updates_modify_user_news_update_js";
exports.ids = ["Development_Server_Requests_requests_user_news_updates_modify_user_news_update_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_news_updates/modify_user_news_update.js":
/*!*******************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_news_updates/modify_user_news_update.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  let news_type = {\n    album: \"album_id\",\n    user_accounts: \"user_account_id\",\n    post: \"post_id\"\n  };\n  this.req = (req, res) => {\n    let {\n      news_id,\n      news_type_id,\n      type,\n      news_data,\n      message\n    } = req.body;\n    let query = `update User_News_Updates set \n                                news_data = '${typeof news_data === \"object\" ? JSON.stringify(news_data) : news_data}', \n                                message = '${message}' \n                                where id = ${news_id} or\n                                ${news_type[type]} = ${news_type_id}\n                                `;\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({\n          message: \"Error adding a news update\"\n        });\n      } else {\n        res.json({\n          message: \"Successfully added a news update!\"\n        });\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_news_updates/modify_user_news_update.js?\n}");

/***/ })

};
;