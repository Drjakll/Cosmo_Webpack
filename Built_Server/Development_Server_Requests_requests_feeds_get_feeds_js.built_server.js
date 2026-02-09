"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_feeds_get_feeds_js";
exports.ids = ["Development_Server_Requests_requests_feeds_get_feeds_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/feeds/get_feeds.js":
/*!*****************************************************************!*\
  !*** ./Development/Server/Requests/requests/feeds/get_feeds.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res) => {\n    let {\n      user_ids,\n      offset\n    } = req.query;\n    if (user_ids === \"\") {\n      res.json({\n        message: \"No results\",\n        results: []\n      });\n      return;\n    }\n    let users = user_ids !== \"\" ? user_ids.split(\",\") : [];\n    let query = `select * \n                    from \n                        Feeds \n                    where \n                        user_id in (?) and created_on < ?\n                    order by created_on desc\n                    limit 5`;\n    try {\n      let [results] = await this.sql.query(query, [users, parseInt(offset)]);\n\n      ///Return the feeds to the front end and they will retrieve each feed as they scroll down\n      res.json({\n        message: `Found ${results.length} feeds`,\n        results\n      });\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: \"Error while retrieving feeds\",\n        results: null\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/feeds/get_feeds.js?\n}");

/***/ })

};
;