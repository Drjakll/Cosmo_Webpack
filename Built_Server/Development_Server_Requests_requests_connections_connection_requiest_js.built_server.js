"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_connections_connection_requiest_js";
exports.ids = ["Development_Server_Requests_requests_connections_connection_requiest_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/connections/connection_requiest.js":
/*!*********************************************************************************!*\
  !*** ./Development/Server/Requests/requests/connections/connection_requiest.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  //Cache to temporarily store connection requests\n  this.temp_cache = {};\n  this.req = (req, res) => {\n    let {\n      request_from,\n      request_to\n    } = req.body;\n    let requirements = [{\n      type: \"string\",\n      key: \"email\",\n      value: request_to.email,\n      conjunc: \"=\"\n    }];\n    let query = this.generate_get_query(\"User_Accounts\", requirements, [\"connection_requests\"]);\n    this.sql.query(query, (err, result) => {\n      if (err || result.length === 0) {\n        console.log(err.sqlMessage);\n        res.end();\n        return;\n      } else {\n        //If the connection_requests field for the user is not in the temp cache, then add it\n        if (this.temp_cache[request_to.email] === undefined) {\n          this.temp_cache[request_to.email] = JSON.parse(result[0].connection_requests || \"{}\");\n        }\n        let connection_requests = this.temp_cache[request_to.email];\n        connection_requests[request_from.email] = request_from;\n        query = `update User_Accounts set connection_requests = '${JSON.stringify(connection_requests)}' where email = '${request_to.email}'`;\n        this.sql.query(query, (err, result) => {\n          if (err) {\n            console.log(err.sqlMessage);\n            res.json({\n              message: \"Error sending connection request\"\n            });\n          } else {\n            res.json({\n              message: \"Successfully sent connection request\"\n            });\n          }\n          delete this.temp_cache[request_to.email];\n          res.end();\n        });\n      }\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/connections/connection_requiest.js?");

/***/ })

};
;