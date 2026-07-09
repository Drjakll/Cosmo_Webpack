"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_messaging_edit_private_conversation_name_js";
exports.ids = ["Development_Server_Requests_requests_messaging_edit_private_conversation_name_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/messaging/edit_private_conversation_name.js"
/*!******************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/messaging/edit_private_conversation_name.js ***!
  \******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request(sql, s3, PutObjectCommand) {\n  this.req_path = \"/edit_private_conversation_name\";\n  this.req_type = \"patch\";\n  this.callbacks = [\"edit_private_conversation_name\"];\n  this.req = async (req, res) => {\n    let {\n      user_id,\n      conversation_id,\n      conversation_name\n    } = req.body;\n    let query = `update Users_In_Private_Conversations set conversation_name = ? where user_id = ? and conversation_id = ?`;\n    try {\n      await this.sql.query(query, [conversation_name, user_id, conversation_id]);\n      res.json({\n        message: \"Successfully updated the conversation name.\"\n      });\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: \"Error updating the conversation name!\"\n      });\n    }\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/messaging/edit_private_conversation_name.js?\n}");

/***/ }

};
;