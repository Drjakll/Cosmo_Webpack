"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_IO_Namespaces_global_events_events_report_online_js";
exports.ids = ["Development_Server_Websockets_IO_Namespaces_global_events_events_report_online_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/IO_Namespaces/global_events/events/report_online.js"
/*!*******************************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/global_events/events/report_online.js ***!
  \*******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Wrapper = function () {\n  //To log off other sessions of the same account except for the current session\n  let log_off_self = (online_users, this_session_id) => {\n    for (let s_id in online_users) {\n      if (s_id === this_session_id) {\n        continue;\n      }\n      const other_socket = online_users[s_id].socket;\n      other_socket?.emit('log_self_off', {});\n      delete this.online_users_socket[other_socket?.id];\n    }\n  };\n  this.event = ({\n    user_account,\n    followers\n  }) => {\n    if (!user_account) {\n      return;\n    }\n    let {\n      id,\n      session_id\n    } = user_account;\n\n    //Log off self account from other sessions\n    if (id && this.online_users[id]) {\n      log_off_self(this.online_users[id], session_id);\n    }\n\n    //I setup the this.online_users[\"user_id\"][\"session_id\"] = {\"user_account\": some_user_account, socket: this.socket}\n    //Because they maybe using the same account with different session, so log off the one that isn't the current session\n    if (!this.online_users[id]) {\n      this.online_users[id] = {};\n    }\n    this.online_users[id].hidden = false; //Hidden is different from completely offline. Socket is still active\n    this.online_users[id][session_id] = {\n      user_account,\n      socket: this.socket\n    };\n\n    //I made this so that it's easier to access user_account when disconnect event triggers\n    this.online_users_socket[this.socket.id] = {\n      user_account,\n      socket: this.socket,\n      followers\n    };\n\n    //Report to the user's followers that the user is online\n    for (let i in followers) {\n      let {\n        id: follower_id\n      } = followers[i];\n      let follower_sockets = this.online_users[follower_id];\n\n      //The followers may have multiple sessions open\n      for (let s_id in follower_sockets) {\n        follower_sockets[s_id].socket?.emit(\"add_online_user\", {\n          online_user: user_account\n        });\n      }\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wrapper);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/global_events/events/report_online.js?\n}");

/***/ }

};
;