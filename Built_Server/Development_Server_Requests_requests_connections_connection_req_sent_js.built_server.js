"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_connections_connection_req_sent_js";
exports.ids = ["Development_Server_Requests_requests_connections_connection_req_sent_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/connections/connection_req_sent.js":
/*!*********************************************************************************!*\
  !*** ./Development/Server/Requests/requests/connections/connection_req_sent.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res, next) => {\n    let {\n      request_from,\n      request_to\n    } = req.body;\n    let query = `select conn_req_sent from User_Accounts where email = '${request_from.email}'`;\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.end();\n        return;\n      } else {\n        let conn_req_sent = JSON.parse(result[0].conn_req_sent || \"{}\");\n        let {\n          id,\n          email,\n          first_name,\n          last_name\n        } = request_to;\n        let alert_id = Date.now();\n        if (conn_req_sent[email]) {\n          //If the connection request has already been sent, then remove it (basically a toggle)\n          alert_id = conn_req_sent[email].alert_id; //Get the alert_id of the opposing user's alert for this connection request, in order to remove it in update_alerts\n          delete conn_req_sent[email];\n        } else {\n          //alert_id is used to identify the opposing user's alert for this connection request, in order to remove it if needed\n          conn_req_sent[email] = {\n            id,\n            email,\n            first_name,\n            last_name,\n            sent_on: new Date().toISOString(),\n            alert_id\n          };\n        }\n        let jsonStr = JSON.stringify(conn_req_sent);\n        query = `update User_Accounts set conn_req_sent = '${jsonStr}' where email = '${request_from.email}'`;\n        this.sql.query(query, (err, result) => {\n          if (err) {\n            console.log(err.sqlMessage);\n            res.end();\n            return;\n          } else {\n            req.body[\"alert_id\"] = alert_id;\n            req.body[\"updated_conn_req_sent\"] = conn_req_sent;\n            if (next) {\n              //Next middlewarre is connection_request\n              next();\n            } else {\n              res.end();\n            }\n          }\n        });\n      }\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/connections/connection_req_sent.js?\n}");

/***/ })

};
;