/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var web_audio_touch_unlock_1 = __webpack_require__(1);
var ui_1 = __webpack_require__(2);
var AudioContext = window.AudioContext || window.webkitAudioContext;
if (!AudioContext) {
    ui_1.printError('Seems like Web Audio API is not supported here :(');
}
else {
    var loaded_1 = false;
    var locked_1 = true;
    var userUnlocked_1 = false;
    var errored_1 = false;
    var context_1 = new AudioContext();
    web_audio_touch_unlock_1.default(context_1).then(function (unlocked) {
        if (errored_1) {
            return;
        }
        locked_1 = false;
        userUnlocked_1 = unlocked;
        if (userUnlocked_1) {
            if (loaded_1) {
                ui_1.setMessage('message', 'there');
                ui_1.setMessage('status', 'playing');
            }
            else {
                ui_1.setMessage('message', 'abit');
            }
        }
        else {
            ui_1.setMessage('message', 'fine');
        }
    }, function (reason) {
        errored_1 = true;
        ui_1.printError(reason);
    });
    var request_1 = new XMLHttpRequest();
    request_1.open('GET', 'assets/copyaudio.mp3', true);
    request_1.responseType = 'arraybuffer';
    request_1.onload = function () {
        if (errored_1) {
            return;
        }
        ui_1.setMessage('status', 'decoding');
        context_1.decodeAudioData(request_1.response, function (buffer) {
            if (errored_1) {
                return;
            }
            var source = context_1.createBufferSource();
            source.buffer = buffer;
            source.connect(context_1.destination);
            source.start();
            loaded_1 = true;
            if (locked_1) {
                ui_1.setMessage('status', 'waiting');
            }
            else {
                if (userUnlocked_1) {
                    ui_1.setMessage('message', 'there');
                }
                ui_1.setMessage('status', 'playing');
            }
        }, function (e) {
            errored_1 = true;
            ui_1.printError(e);
        });
    };
    request_1.send();
    window.onblur = function () {
        if (!locked_1) {
            context_1.suspend();
        }
    };
    window.onfocus = function () {
        if (!locked_1) {
            context_1.resume();
        }
    };
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function webAudioTouchUnlock(context) {
    return new Promise(function (resolve, reject) {
        if (!context || !(context instanceof (window.AudioContext || window.webkitAudioContext))) {
            reject('WebAudioTouchUnlock: You need to pass an instance of AudioContext to this method call');
            return;
        }
        if (context.state === 'suspended' && 'ontouchstart' in window) {
            var unlock_1 = function () {
                context.resume().then(function () {
                    document.body.removeEventListener('touchstart', unlock_1);
                    document.body.removeEventListener('touchend', unlock_1);
					document.body.removeEventListener('keydown', unlock_1);
                    document.body.removeEventListener('click', unlock_1);
					document.body.removeEventListener('open', unlock_1);					
			       resolve(true);
                }, function (reason) {
                    reject(reason);
                });
            };
            document.body.addEventListener('touchstart', unlock_1, false);
            document.body.addEventListener('touchend', unlock_1, false);
			document.body.addEventListener('keydown', unlock_1, false);
            document.body.addEventListener('click', unlock_1, false);
			document.body.addEventListener('open', unlock_1, false);
        }
        else {
            resolve(false);
        }
    });
}
exports.default = webAudioTouchUnlock;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var positionFooter = function () {
    var pre = document.getElementsByTagName('pre')[0];
    var footer = document.getElementsByTagName('footer')[0];
    footer.style.bottom = Math.min(window.innerHeight - pre.offsetHeight, 0) + 'px';
};
exports.hideFooter = function () {
    var footer = document.getElementsByTagName('footer')[0];
    footer.style.display = 'none';
};
exports.setMessage = function (id, key) {
    var messages = {
        tap: "Tap anywhere to unlock...",
        loading: "Loading audio...",
        there: "There you go!",
        playing: "Playing The instruction",
        abit: "Just a bit more...",
        fine: "You're fine here,\ntry it on Your device.",
        decoding: "Decoding audio...",
        waiting: "Waiting for touch unlock..."
    };
    var element = document.getElementById(id);
    element.textContent = messages[key];
    positionFooter();
};
exports.setMessage('message', 'tap');
exports.setMessage('status', 'loading');
var resizeErrors = function () {
    var row = document.getElementById('row');
    var errors = document.getElementsByClassName('error-message');
    for (var i = 0; i < errors.length; i++) {
        errors[i].style.width = (row.offsetWidth * 0.7) + 'px';
    }
};

exports.printError = function (error) {
    var message = document.getElementById('message');
    message.innerHTML = "<span class=\"error\">ERROR!</span><br><br><span class=\"error-message\">" + error + "</span>";
    var status = document.getElementById('status');
    status.innerHTML = "<span class=\"error-message\">Seems like this approach can't be used with current implementation of Web Audio API. We're sorry about that, however you can open an issue <a href=\"https://github.com/pavle-goloskokovic/web-audio-touch-unlock/issues\">here</a> and we'll try to sort it out.</span>";
    resizeErrors();
    exports.hideFooter();
};
window.onload = window.onresize = function (e) {
    var row = document.getElementById('row');
    var scale = 1;
    if (window.innerWidth <= 450) {
        var margin = 8;
        scale = window.innerWidth / (row.offsetWidth + 2 * margin);
    }
    document.body.style.fontSize = scale + "em";
    resizeErrors();
    positionFooter();
};


/***/ })
/******/ ]);
