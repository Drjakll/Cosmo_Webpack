"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_messaging_join_public_channel_js";
exports.ids = ["Development_Server_Requests_requests_messaging_join_public_channel_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/messaging/join_public_channel.js":
/*!*******************************************************************************!*\
  !*** ./Development/Server/Requests/requests/messaging/join_public_channel.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request() {\n  this.req = (req, res) => {\n    let {\n      public_channel_id,\n      user_id\n    } = req.body;\n    let now = Date.now();\n    let query = `\n                insert into \n                    Users_In_Public_Channels(user_id, public_channel_id, joined_time)\n                values (${user_id}, ${public_channel_id}, ${now});\n                `;\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(query, err.sqlMessage);\n        res.json({\n          message: \"Error joining the public channel\"\n        });\n      } else {\n        res.json({\n          message: \"Successfully joined the public channel\"\n        });\n      }\n    });\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/messaging/join_public_channel.js?\n}");

/***/ })

};
;