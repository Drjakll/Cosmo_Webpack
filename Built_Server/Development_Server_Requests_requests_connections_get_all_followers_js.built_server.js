"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_connections_get_all_followers_js";
exports.ids = ["Development_Server_Requests_requests_connections_get_all_followers_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/connections/get_all_followers.js":
/*!*******************************************************************************!*\
  !*** ./Development/Server/Requests/requests/connections/get_all_followers.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res) => {\n    let {\n      id: user_id\n    } = req.body;\n    if (!user_id) {\n      return res.status(400).json({\n        message: 'Missing user_id',\n        results: []\n      });\n    }\n    let data = [user_id];\n    let query = `\n            select \n                ua.*,\n                pl.link as profile_picture_link\n            from \n                Connections as c\n\n            join\n                User_Accounts as ua\n            on\n                c.follower_id = ua.id\n\n            left join\n                Photo_Links as pl\n            on\n                pl.target_type = 'profile' and pl.target_id = ua.id and pl.is_a_cover = 1\n\n            where \n                c.followed_id = ? \n        `;\n    try {\n      let [results] = await this.sql.query(query, data);\n      res.json({\n        message: `Found ${results.length} followers`,\n        results\n      });\n    } catch (err) {\n      console.log(err);\n      res.json({\n        message: `Found error retrieving followers`,\n        results: []\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/connections/get_all_followers.js?\n}");

/***/ })

};
;