"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_connections_connection_request_js";
exports.ids = ["Development_Server_Requests_requests_connections_connection_request_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/connections/connection_request.js":
/*!********************************************************************************!*\
  !*** ./Development/Server/Requests/requests/connections/connection_request.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  //Cache to temporarily store connection_requests json object to reduce database reads/writes syncronization issues\n  this.temp_cache = {};\n  this.req = (req, res, next) => {\n    let {\n      request_from,\n      request_to,\n      updated_conn_req_sent,\n      alert_id\n    } = req.body;\n    let requirements = [{\n      type: \"string\",\n      key: \"email\",\n      value: request_to.email,\n      conjunc: \"=\"\n    }];\n    let query = this.generate_get_query(\"User_Accounts\", requirements, [\"connection_requests\"]);\n    this.sql.query(query, (err, result) => {\n      if (err || result.length === 0) {\n        console.log(\"No result found\");\n        res.end();\n        return;\n      } else {\n        //If the connection_requests field for the user is not in the temp cache, then add it\n        if (this.temp_cache[request_to.email] === undefined) {\n          this.temp_cache[request_to.email] = JSON.parse(result[0].connection_requests || \"{}\");\n        }\n        let connection_requests = this.temp_cache[request_to.email];\n\n        //If the user has already sent a connection request, then remove it (basically a toggle)\n        if (connection_requests[request_from.email] !== undefined) {\n          delete connection_requests[request_from.email];\n        } else {\n          //Otherwise, add the connection request\n\n          let {\n            id,\n            email,\n            first_name,\n            last_name\n          } = request_from;\n          connection_requests[email] = {\n            id,\n            email,\n            first_name,\n            last_name,\n            sent_on: new Date().toISOString()\n          };\n        }\n        let jsonStr = JSON.stringify(connection_requests);\n        query = `update User_Accounts set connection_requests = '${jsonStr}' where email = '${request_to.email}'`;\n        this.sql.query(query, async (err, result) => {\n          if (err) {\n            console.log(err.sqlMessage);\n\n            //If failed to update connection_requests, then revert the change in connection_requests object\n            delete connection_requests[email];\n            res.end();\n          } else {\n            let {\n              id,\n              first_name,\n              last_name\n            } = request_from;\n            let body = {\n              alert_type: \"connection_request\",\n              user_acc: request_to,\n              alert_data: {\n                request_from_id: id,\n                first_name: first_name,\n                last_name: last_name\n              },\n              updated_request_list: connection_requests\n            };\n            for (let key in body) {\n              req.body[key] = body[key];\n            }\n            if (next) {\n              //Next middleware is update_alerts\n              next();\n            } else {\n              res.end();\n            }\n          }\n          delete this.temp_cache[request_to.email];\n        });\n      }\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/connections/connection_request.js?\n}");

/***/ })

};
;