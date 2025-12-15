"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_connections_search_within_followers_js";
exports.ids = ["Development_Server_Requests_requests_connections_search_within_followers_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/connections/search_within_followers.js":
/*!*************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/connections/search_within_followers.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res) => {\n    let {\n      requirements,\n      id\n    } = req.body;\n    let query = `\n            select \n                ua.* \n            from\n                (${this.generate_get_query(\"User_Accounts\", requirements, ['id', 'email', 'first_name', 'last_name', 'profile_picture_link', 'date_of_birth', 'gender', 'professions', 'schools', 'marital_status', 'hobbies', 'current_location'])}) as ua\n            join\n                Connections as c\n            on\n                c.follower_id = ua.id and c.followed_id = ${id}\n            where\n                c.status = 'accepted';\n        `;\n    this.sql.query(query, (err, results) => {\n      if (err) {\n        console.log(query, err.sqlMessage);\n        res.json({\n          \"message\": \"Error retreiving followers list\",\n          results: []\n        });\n      } else {\n        res.json({\n          \"message\": `Retreived ${results.length} results`,\n          results\n        });\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/connections/search_within_followers.js?\n}");

/***/ })

};
;