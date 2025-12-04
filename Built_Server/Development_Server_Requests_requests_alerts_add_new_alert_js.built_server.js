"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_alerts_add_new_alert_js";
exports.ids = ["Development_Server_Requests_requests_alerts_add_new_alert_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/alerts/add_new_alert.js":
/*!**********************************************************************!*\
  !*** ./Development/Server/Requests/requests/alerts/add_new_alert.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  let alert_types = {\n    photo_comment: \"photo_comments_id_ref\",\n    connection_request: \"connection_request_id_ref\"\n  };\n  this.req = (req, res) => {\n    let {\n      owner,\n      alert_data,\n      type,\n      id_ref,\n      target\n    } = req.body;\n    let query = `insert into User_Alerts (owner_email, alert_data, alert_type, ${alert_types[type]}, target_only) values('${owner.email}', '${JSON.stringify(alert_data || {})}', '${type}', ${id_ref}, '${target}')`;\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({\n          message: \"Error adding new alert\"\n        });\n      } else {\n        res.json({\n          message: \"Request added new alert!\"\n        });\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/alerts/add_new_alert.js?\n}");

/***/ })

};
;