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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request() {\n  this.req = async (req, res) => {\n    let {\n      user_id\n    } = req.body;\n    let data = [user_id];\n    let query = `\n            select \n                pc.channel_name, \n                pc.channel_description, \n                users.public_channel_id as public_channel_id\n            from \n                Public_Channels as pc\n            join\n                Users_In_Public_Channels as users\n            on\n                users.public_channel_id = pc.id\n            \n            where \n                users.user_id = ?\n            `;\n    try {\n      let [results] = await this.sql.query(query, data);\n      res.json({\n        message: \"Successfully retrieved favorite public channels\",\n        channels: results\n      });\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: \"Failed to retrieve favorite public channels\",\n        channels: null\n      });\n    }\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/messaging/get_favorite_public_channels.js?\n}");

/***/ })

};
;