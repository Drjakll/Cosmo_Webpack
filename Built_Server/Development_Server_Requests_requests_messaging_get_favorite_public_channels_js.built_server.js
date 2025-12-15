"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_messaging_get_favorite_public_channels_js";
exports.ids = ["Development_Server_Requests_requests_messaging_get_favorite_public_channels_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/messaging/get_favorite_public_channels.js":
/*!****************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/messaging/get_favorite_public_channels.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request() {\n  this.req = (req, res) => {\n    let {\n      user_id\n    } = req.body;\n    let query = `\n            select channel_name, channel_description, user_channel.public_channel_id from \n                Public_Channels as pc\n            join\n                (select * from \n                    Users_In_Public_Channels\n                where \n                    user_id = ${user_id}) as user_channel\n            where \n                user_channel.public_channel_id = pc.id\n            `;\n    this.sql.query(query, (err, results) => {\n      if (err) {\n        console.log(query, err.sqlMessage);\n        res.json({\n          message: \"Failed to retrieve favorite public channels\",\n          channels: null\n        });\n      } else {\n        res.json({\n          message: \"Successfully retrieved favorite public channels\",\n          channels: results\n        });\n      }\n    });\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/messaging/get_favorite_public_channels.js?\n}");

/***/ })

};
;