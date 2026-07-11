"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_alerts_get_follow_request_alert_js";
exports.ids = ["Development_Server_Requests_requests_alerts_get_follow_request_alert_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/alerts/get_follow_request_alert.js"
/*!*********************************************************************************!*\
  !*** ./Development/Server/Requests/requests/alerts/get_follow_request_alert.js ***!
  \*********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function ({\n  sql\n}) {\n  this.req_path = \"/get_follow_request_alert/:user_id\";\n  this.req_type = \"get\";\n  this.callbacks = [\"get_follow_request_alert\"];\n  this.req = async (req, res) => {\n    let {\n      user_id\n    } = req.params;\n    let data = [user_id];\n    let query = `select\n                    ua.first_name as first_name,\n                    ua.last_name as last_name,\n                    ua.id as follower_id,\n                    pl.link as profile_picture_link,\n                    c.timestamp,\n                    c.followed_id as followed_id\n                          \n                from \n                    Connections as c\n\n                join \n                    User_Accounts as ua\n                on\n                    ua.id = c.follower_id and c.status = 'pending'\n\n                left join\n                    Photo_Links as pl\n                on\n                    pl.profile_id = ua.id and pl.is_a_cover = 1\n                \n                where \n                    c.followed_id = ?\n            `;\n    try {\n      let [results] = await sql.query(query, data);\n      res.json({\n        message: \"Successfully retrieved follow requests\",\n        results\n      });\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: \"Error retrieving alerts\",\n        results: []\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/alerts/get_follow_request_alert.js?\n}");

/***/ }

};
;