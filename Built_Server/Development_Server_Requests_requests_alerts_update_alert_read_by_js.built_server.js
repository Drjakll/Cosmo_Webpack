"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_alerts_update_alert_read_by_js";
exports.ids = ["Development_Server_Requests_requests_alerts_update_alert_read_by_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/alerts/update_alert_read_by.js":
/*!*****************************************************************************!*\
  !*** ./Development/Server/Requests/requests/alerts/update_alert_read_by.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  //Temporary store the column read_by to stablize syncronization situation\n  let read_by_cache = {};\n  this.req = (req, res, next) => {\n    let {\n      alert_id,\n      ready_by\n    } = req.body;\n    let query = `insert into Connection_Requests (target_email, from_email) values('${request_to.email}', '${request_from.email}')`;\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({\n          message: \"Error sending connection request\"\n        });\n      } else {\n        res.json({\n          message: \"Request successfully sent!\"\n        });\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/alerts/update_alert_read_by.js?\n}");

/***/ })

};
;