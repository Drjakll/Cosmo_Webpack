"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_feeds_add_to_feeds_js";
exports.ids = ["Development_Server_Requests_requests_feeds_add_to_feeds_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/feeds/add_to_feeds.js"
/*!********************************************************************!*\
  !*** ./Development/Server/Requests/requests/feeds/add_to_feeds.js ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function (sql, s3, PutObjectCommand) {\n  this.req_path = \"/add_to_feeds\";\n  this.req_type = \"post\";\n  this.callbacks = [\"add_to_feeds\"];\n  this.req = async (req, res) => {\n    let {\n      user_id,\n      target_id,\n      target_id_type,\n      created_on,\n      result\n    } = req.body;\n    let values = [user_id, target_id, target_id_type, target_id, created_on];\n    let query = `insert into Feeds(user_id, ${target_id_type}, target_id_type, target_id, created_on) values(?,?,?,?,?)`;\n    try {\n      await this.sql.query(query, values);\n      res.json({\n        message: \"Successfully added to feeds\",\n        result: result ?? null\n      });\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: \"Error adding to feeds\",\n        result: null\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/feeds/add_to_feeds.js?\n}");

/***/ }

};
;