"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_news_updates_add_user_news_update_js";
exports.ids = ["Development_Server_Requests_requests_user_news_updates_add_user_news_update_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_news_updates/add_user_news_update.js":
/*!****************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_news_updates/add_user_news_update.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  let news_type = {\n    album: \"album_id\",\n    user_accounts: \"user_account_id\",\n    post: \"post_id\"\n  };\n  this.req = (req, res) => {\n    let {\n      owner,\n      news_data,\n      type,\n      id_ref,\n      message\n    } = req.body;\n    let time_created = Date.now();\n    let query = `insert into User_News_Updates (\n                            owner_email, \n                            news_data, \n                            news_type, \n                            ${news_type[type]}, \n                            message,\n                            time_created) \n                        values(\n                            '${owner.email}', \n                            '${JSON.stringify(news_data || {})}', \n                            '${type}', ${id_ref}, '${message}', ${time_created})`;\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({\n          message: \"Error adding a news update\"\n        });\n      } else {\n        res.json({\n          message: \"Successfully added a news update!\"\n        });\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_news_updates/add_user_news_update.js?\n}");

/***/ })

};
;