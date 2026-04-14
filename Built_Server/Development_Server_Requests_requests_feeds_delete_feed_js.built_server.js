"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_feeds_delete_feed_js";
exports.ids = ["Development_Server_Requests_requests_feeds_delete_feed_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/feeds/delete_feed.js"
/*!*******************************************************************!*\
  !*** ./Development/Server/Requests/requests/feeds/delete_feed.js ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res) => {\n    let {\n      user_id,\n      target_id,\n      target_type,\n      created_on\n    } = req.body;\n    let values = [user_id, target_id, target_type, created_on];\n    let query = `delete from Feeds where user_id = ? and target_id = ? and target_type = ? and created_on = ?`;\n    try {\n      let result = await this.sql.query(query, values);\n      res.json({\n        message: `Successfully deleted ${result.affectedRows} feeds`\n      });\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: \"Error deleting feeds\"\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/feeds/delete_feed.js?\n}");

/***/ }

};
;