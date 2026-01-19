"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_connections_update_follow_request_js";
exports.ids = ["Development_Server_Requests_requests_connections_update_follow_request_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/connections/update_follow_request.js":
/*!***********************************************************************************!*\
  !*** ./Development/Server/Requests/requests/connections/update_follow_request.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res) => {\n    let {\n      follwer_id,\n      followed_id,\n      status\n    } = req.body;\n    let data = [status, follwer_id, followed_id];\n    let query = `\n            update\n                Connections\n            set\n                status = ?\n            where\n                follower_id = ? \n                and followed_id = ?;\n        `;\n    try {\n      await this.sql.query(query, data);\n      res.json({\n        message: \"Successfully updated connection request!\"\n      });\n    } catch (err) {\n      console.log(err);\n      res.json({\n        message: \"Error updating connection request!\"\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/connections/update_follow_request.js?\n}");

/***/ })

};
;