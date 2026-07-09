"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_connections_get_request_status_js";
exports.ids = ["Development_Server_Requests_requests_connections_get_request_status_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/connections/get_request_status.js"
/*!********************************************************************************!*\
  !*** ./Development/Server/Requests/requests/connections/get_request_status.js ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function (sql, s3, PutObjectCommand) {\n  this.req_path = \"/get_request_status/:from_id/:to_id\";\n  this.req_type = \"get\";\n  this.callbacks = [\"get_request_status\"];\n  this.req = async (req, res) => {\n    let {\n      from_id,\n      to_id\n    } = req.params;\n    let data = [from_id, to_id];\n    let query = `\n            select status from Connections where follower_id = ? and followed_id = ?;\n        `;\n    try {\n      let [result] = await this.sql.query(query, data);\n      if (result.length > 0) {\n        res.json({\n          message: \"Successfully retrieved request status\",\n          success: 1,\n          status: result[0].status\n        });\n      } else {\n        res.json({\n          message: \"No follow request found\",\n          success: 1,\n          status: null\n        });\n      }\n    } catch (err) {\n      console.log(err);\n      res.json({\n        message: \"Error retrieving request status\",\n        success: 0,\n        status: null\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/connections/get_request_status.js?\n}");

/***/ }

};
;