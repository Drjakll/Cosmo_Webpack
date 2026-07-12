"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_messaging_initialize_public_channel_js";
exports.ids = ["Development_Server_Requests_requests_messaging_initialize_public_channel_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/messaging/initialize_public_channel.js":
/*!*************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/messaging/initialize_public_channel.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request() {\n  this.req = (req, res) => {\n    let {\n      channel_name,\n      channel_description\n    } = req.body;\n    channel_name = channel_name.replace(/\\\\/g, \"\\\\\\\\\").replace(/\\'/g, \"\\\\'\").replace(/\\\"/g, '\\\\\"');\n    channel_description = channel_description.replace(/\\\\/g, \"\\\\\\\\\").replace(/\\'/g, \"\\\\'\").replace(/\\\"/g, '\\\\\"');\n    let query = `\n            insert into\n                Public_Channels(channel_name, channel_description)\n            values ('${channel_name}', '${channel_description}');`;\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        //This will happen if a duplicate channel name appears\n\n        query = `select * from \n                            Public_Channels\n                        where\n                            channel_name = '${channel_name}';`;\n\n        //If this happens, we will get the entry with the given channel name\n        this.sql.query(query, (err2, result2) => {\n          if (err2 || result2.length === 0) {\n            console.log(query, err2?.sqlMessage);\n            res.json({\n              message: \"Failed to initiate public channel\",\n              public_channel_id: null\n            });\n          } else {\n            res.json({\n              message: \"Successfully initiated the public channel\",\n              public_channel_id: result2[0].id\n            });\n          }\n        });\n      } else {\n        res.json({\n          message: \"Successfully initiated the public channel\",\n          public_channel_id: result.insertId\n        });\n      }\n    });\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/messaging/initialize_public_channel.js?\n}");

/***/ })

};
;