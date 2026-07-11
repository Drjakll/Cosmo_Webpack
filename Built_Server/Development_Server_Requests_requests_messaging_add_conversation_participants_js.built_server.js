"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_messaging_add_conversation_participants_js";
exports.ids = ["Development_Server_Requests_requests_messaging_add_conversation_participants_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/messaging/add_conversation_participants.js"
/*!*****************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/messaging/add_conversation_participants.js ***!
  \*****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request({\n  sql\n}) {\n  this.req_path = \"/add_conversation_participants\";\n  this.req_type = \"post\";\n  this.callbacks = [\"add_conversation_participants\"];\n  this.req = async (req, res) => {\n    let {\n      new_users,\n      conversation_id\n    } = req.body;\n    let now = Date.now();\n    let query = `insert into Users_In_Private_Conversations(conversation_id, time_joined, user_id, seen_last) values ?`;\n    let values = [];\n    for (let user_id of new_users) {\n      values.push([conversation_id, now, user_id, 0]);\n    }\n    try {\n      await sql.query(query, [values]);\n      res.json({\n        message: \"Successfully joined the conversation!\",\n        success: true\n      });\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: \"Error joining the conversation\",\n        success: false\n      });\n    }\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/messaging/add_conversation_participants.js?\n}");

/***/ }

};
;