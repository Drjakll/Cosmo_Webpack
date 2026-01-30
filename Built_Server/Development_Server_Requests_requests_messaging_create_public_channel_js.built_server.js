"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_messaging_create_public_channel_js";
exports.ids = ["Development_Server_Requests_requests_messaging_create_public_channel_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/messaging/create_public_channel.js":
/*!*********************************************************************************!*\
  !*** ./Development/Server/Requests/requests/messaging/create_public_channel.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request() {\n  this.req = async (req, res, next) => {\n    let {\n      channel_name,\n      channel_description\n    } = req.body;\n    let data = [channel_name, channel_description];\n    let query = `\n                insert into \n                    Public_Channels(channel_name, channel_description)\n                values (?, ?)\n                on duplicate key update \n                    id = last_insert_id(id)\n                `;\n    try {\n      let [result] = await this.sql.query(query, data);\n      req.body.public_channel_id = result.insertId;\n\n      //Should call join_public_channel\n      next();\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: \"Error creating channel\"\n      });\n    }\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/messaging/create_public_channel.js?\n}");

/***/ })

};
;