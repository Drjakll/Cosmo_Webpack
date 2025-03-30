"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_profile_data_delete_database_profi-e1f7ec";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_profile_data_delete_database_profi-e1f7ec"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/profile_data/delete_database_profile_photos.js":
/*!*******************************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/profile_data/delete_database_profile_photos.js ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res) => {\n    let {\n      photos\n    } = req.body;\n    if (Object.keys(photos).length === 0) {\n      res.json({\n        message: \"No data deleted\"\n      });\n      res.end();\n      return;\n    }\n    let query = `delete from Profile_Pictures where `;\n    for (let i in photos) {\n      query += `id = ${photos[i].id} or `;\n    }\n    query = query.slice(0, -3);\n    this.sql.query(query, (err, results) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({\n          message: \"Error deleting database\"\n        });\n      } else if (results.affectedRows === 0) {\n        res.json({\n          message: \"No data deleted\"\n        });\n      } else {\n        res.json({\n          message: \"Successfully deleted database\"\n        });\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/profile_data/delete_database_profile_photos.js?");

/***/ })

};
;