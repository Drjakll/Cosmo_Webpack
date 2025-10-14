"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_alerts_update_alert_data_js";
exports.ids = ["Development_Server_Requests_requests_alerts_update_alert_data_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/alerts/update_alert_data.js":
/*!**************************************************************************!*\
  !*** ./Development/Server/Requests/requests/alerts/update_alert_data.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  let alert_types = {\n    post: \"post_id_ref\",\n    photo_album: \"photo_albums_id_ref\",\n    profile_picture: \"profile_picture_id_ref\",\n    photo_link: \"user_photo_links_id_ref\",\n    photo_comment: \"photo_comments_id_ref\",\n    connection_request: \"connection_request_id_ref\"\n  };\n  this.req = (req, res) => {\n    let {\n      alert_id,\n      data,\n      type,\n      type_id\n    } = req.body;\n    let query = `update User_Alerts set alert_data = '${JSON.stringify(data || {})}' where id = ${alert_id} or ${alert_types[type]} = ${type_id}`;\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({\n          message: \"Error updating alert data\"\n        });\n      } else {\n        res.json({\n          message: \"Successfully updated alert data!\"\n        });\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/alerts/update_alert_data.js?\n}");

/***/ })

};
;