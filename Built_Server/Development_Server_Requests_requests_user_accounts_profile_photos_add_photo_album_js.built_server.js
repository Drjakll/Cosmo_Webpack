"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_photos_add_photo_album_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_photos_add_photo_album_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/photos/add_photo_album.js":
/*!**********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/photos/add_photo_album.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res) => {\n    let album_data = req.body;\n    let query = this.generate_insert_query(\"Photo_Albums\", album_data);\n    let now = this.generate_time_string(new Date());\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({\n          message: \"Error adding album\",\n          result: {}\n        });\n        res.end();\n      } else if (result.affectedRows === 0) {\n        res.json({\n          message: \"Error adding album\",\n          result: {}\n        });\n        res.end();\n      } else {\n        let query = `select * from Photo_Albums where created_on >= '${now}' and owner_email = '${album_data.owner_email}' and title = '${album_data.title}'`;\n        this.sql.query(query, (err, results) => {\n          if (err) {\n            console.log(err.sqlMessage);\n            res.json({\n              messsage: \"Error retrieving created album\",\n              album: {}\n            });\n          } else if (results.length === 0) {\n            res.json({\n              message: \"Error retrieving created album\",\n              album: {}\n            });\n          } else {\n            res.json({\n              message: \"Successfully created album\",\n              album: results[0]\n            });\n          }\n          res.end();\n        });\n      }\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/photos/add_photo_album.js?");

/***/ })

};
;