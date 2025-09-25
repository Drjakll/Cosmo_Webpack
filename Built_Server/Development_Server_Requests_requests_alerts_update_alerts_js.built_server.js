"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_alerts_update_alerts_js";
exports.ids = ["Development_Server_Requests_requests_alerts_update_alerts_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/alerts/update_alerts.js":
/*!**********************************************************************!*\
  !*** ./Development/Server/Requests/requests/alerts/update_alerts.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  //This is to temporarily store user's alerts json object to reduce database reads/writes syncronization issues\n  this.temp_cache = {};\n  this.req = (req, res, next) => {\n    let {\n      alert_type,\n      user_acc,\n      alert_data,\n      alert_id\n    } = req.body;\n    let query = `select * from User_Accounts where email = '${user_acc.email}'`;\n    this.sql.query(query, (err, result) => {\n      if (err || result.length === 0) {\n        console.log(err.sqlMessage);\n        res.end();\n      } else {\n        if (this.temp_cache[user_acc.email] === undefined) {\n          this.temp_cache[user_acc.email] = JSON.parse(result[0].alerts || \"{}\");\n        }\n        let alerts = this.temp_cache[user_acc.email];\n\n        //If the alert with alert_id already exists, then remove it (basically a toggle)\n        if (alerts[alert_id]) {\n          delete alerts[alert_id];\n        } else {\n          let new_alert = {\n            type: alert_type,\n            data: alert_data\n          };\n          alerts[alert_id] = new_alert;\n        }\n        query = `update User_Accounts set alerts = '${JSON.stringify(alerts)}' where email = '${user_acc.email}'`;\n        this.sql.query(query, (err, result) => {\n          let json_res = {\n            message: \"\",\n            updated_alerts: alerts\n          };\n\n          //Also include all other fields in req.body in the response\n          for (let key in req.body) {\n            json_res[key] = req.body[key];\n          }\n          if (err) {\n            console.log(err.sqlMessage);\n          } else {\n            json_res.message = \"Successfully updated alerts\";\n            res.json(json_res);\n          }\n          delete this.temp_cache[user_acc.email];\n          res.end();\n        });\n      }\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/alerts/update_alerts.js?\n}");

/***/ })

};
;