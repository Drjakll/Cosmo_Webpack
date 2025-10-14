"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_connections_get_connection_requests_js";
exports.ids = ["Development_Server_Requests_requests_connections_get_connection_requests_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/connections/get_connection_requests.js":
/*!*************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/connections/get_connection_requests.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res, next) => {\n    let {\n      request,\n      status\n    } = req.body;\n    let query = `select * from Connection_Requests where (target_email='${request.email}' or from_email='${request.email}') and (request_status='${status}')`;\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({\n          message: \"Error retrieving connection requests\",\n          results: []\n        });\n        res.end();\n      } else {\n        let list_of_emails = [];\n        for (let entry of result) {\n          let {\n            target_email,\n            from_email\n          } = entry;\n          let selected_email = from_email === request.email ? target_email : from_email;\n          list_of_emails.push(selected_email);\n        }\n        req.body.list_of_emails = list_of_emails;\n        next();\n      }\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/connections/get_connection_requests.js?\n}");

/***/ })

};
;