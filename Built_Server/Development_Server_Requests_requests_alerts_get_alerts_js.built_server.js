"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_alerts_get_alerts_js";
exports.ids = ["Development_Server_Requests_requests_alerts_get_alerts_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/alerts/get_alerts.js":
/*!*******************************************************************!*\
  !*** ./Development/Server/Requests/requests/alerts/get_alerts.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  let gather_group = (query, connection_list) => {\n    query += \"(\";\n    for (let connection of connection_list) {\n      query += `owner_email = '${connection.email}' or `;\n    }\n    query = query.slice(0, -4) + \") \";\n    return query;\n  };\n  this.req = (req, res) => {\n    let {\n      connection_list,\n      request,\n      status\n    } = req.body;\n    let query = `select * from User_Alerts where `;\n    if (connection_list.length < 1) {\n      res.json({\n        message: \"No results found\",\n        results: []\n      });\n      res.end();\n      return;\n    } else {\n      query = gather_group(query, connection_list);\n      query += \" and \";\n      query += status === \"pending\" ? `(target_only = '${request.email}' )` : `(target_only = '${request.email}' or target_only = 'everyone' or target_only = 'connection_list')`;\n    }\n    this.sql.query(query, (err, results) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({\n          message: \"Error retrieving alerts\",\n          results: []\n        });\n      } else {\n        res.json({\n          message: `Successfully retrieved ${results.length} alerts!`,\n          results: results\n        });\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/alerts/get_alerts.js?\n}");

/***/ })

};
;