"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_IO_Namespaces_messaging_events_join_public_channels_js";
exports.ids = ["Development_Server_Websockets_IO_Namespaces_messaging_events_join_public_channels_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/IO_Namespaces/messaging/events/join_public_channels.js":
/*!**********************************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/messaging/events/join_public_channels.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Wrapper = function () {\n  this.event = ({\n    public_channels,\n    user_data\n  }) => {\n    for (let i in public_channels) {\n      let {\n        channel_name\n      } = public_channels[i];\n      this.socket.join(channel_name);\n\n      //Keep a record of the specific socket to have all the public channels joined\n      this.socket.public.rooms_joined[channel_name] = channel_name;\n\n      //If no channel name is attached to public channel yet\n      if (!this.public_channel_list[channel_name]) {\n        this.public_channel_list[channel_name] = {\n          online_users: {}\n        };\n\n        //Must have a \"key\" field for storage purposes\n        public_channels[i].key = channel_name;\n        this.channel_storage.Store(public_channels[i]);\n      }\n      this.public_channel_list[channel_name].online_users[user_data.email] = user_data;\n      let {\n        online_users\n      } = this.public_channel_list[channel_name];\n      this.io.to(channel_name).emit('update_public_online_users', {\n        online_users,\n        channel_name\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wrapper);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/messaging/events/join_public_channels.js?\n}");

/***/ })

};
;