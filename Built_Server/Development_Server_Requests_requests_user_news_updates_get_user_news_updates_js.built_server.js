"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_news_updates_get_user_news_updates_js";
exports.ids = ["Development_Server_Requests_requests_user_news_updates_get_user_news_updates_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_news_updates/get_user_news_updates.js":
/*!*****************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_news_updates/get_user_news_updates.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  let Modify_Query = (original_query, connection_list) => {\n    for (let i in connection_list) {\n      let {\n        email\n      } = connection_list[i];\n      original_query += `owner_email = '${email}' or `;\n    }\n    return original_query.slice(0, -4);\n  };\n  this.req = (req, res) => {\n    let {\n      connection_list\n    } = req.body;\n    if (Object.keys(connection_list).length === 0) {\n      res.json({\n        message: \"No results found\",\n        results: []\n      });\n      res.end();\n      return;\n    }\n    let query = Modify_Query(`select * from User_News_Updates where `, connection_list);\n    this.sql.query(query, (err, results) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({\n          message: \"Error getting news update\",\n          results: []\n        });\n      } else {\n        res.json({\n          message: \"Successfully retrieved news update!\",\n          results: results\n        });\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_news_updates/get_user_news_updates.js?\n}");

/***/ })

};
;