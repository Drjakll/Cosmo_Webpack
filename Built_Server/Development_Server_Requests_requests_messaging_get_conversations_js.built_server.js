"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_messaging_get_conversations_js";
exports.ids = ["Development_Server_Requests_requests_messaging_get_conversations_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/messaging/get_conversations.js":
/*!*****************************************************************************!*\
  !*** ./Development/Server/Requests/requests/messaging/get_conversations.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request() {\n  this.req = async (req, res) => {\n    let {\n      user\n    } = req.body;\n    let {\n      id\n    } = user;\n    let data = [id];\n    let query = `\n                    select \n                        users.*\n                    from\n                        Users_In_Private_Conversations as users\n                    where\n                        user_id = ?\n                    `;\n    try {\n      let [results] = await this.sql.query(query, data);\n      console.log(results);\n      res.json({\n        message: `Successfully found ${results.length} results`,\n        results\n      });\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: \"Error fetching conversations\",\n        results: []\n      });\n    }\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/messaging/get_conversations.js?\n}");

/***/ })

};
;