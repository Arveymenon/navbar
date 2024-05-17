'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var framerMotion = require('framer-motion');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

// import { Item } from '../';
var highlightState = {
    left: 0,
    initial: {
        width: 0,
        widthAnimate: 0
    },
    duration: 1
};
function App(params) {
    var _a = react.useState(0), selectedItem = _a[0], setSelectedItem = _a[1];
    var _b = react.useState(highlightState), highlight = _b[0], setHighlight = _b[1];
    var navBar = react.useRef(null);
    var selectedItemClass = "item active";
    var unselectedItemClass = "item";
    // initial position of the highlight
    react.useEffect(function () {
        updateHighlight(0, true);
    }, []);
    var startTransition = function (index) {
        setSelectedItem(index);
        updateHighlight(index);
    };
    var updateHighlight = function (index, initialSetUp) {
        var _a, _b, _c, _d, _e;
        if (initialSetUp === void 0) { initialSetUp = false; }
        var updatedState = __assign({}, highlight);
        // X translation logic 
        updatedState.left = (_a = navBar === null || navBar === void 0 ? void 0 : navBar.current) === null || _a === void 0 ? void 0 : _a['children'][index]['offsetLeft'];
        // Width Transformation logic
        updatedState.initial.width = (_c = ((_b = navBar === null || navBar === void 0 ? void 0 : navBar.current) === null || _b === void 0 ? void 0 : _b['children'][index])) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect().width;
        updatedState.initial.widthAnimate = updatedState.initial.width;
        if (!initialSetUp) {
            updatedState.initial.width = updatedState.initial.widthAnimate;
            updatedState.initial.widthAnimate = (_e = ((_d = navBar === null || navBar === void 0 ? void 0 : navBar.current) === null || _d === void 0 ? void 0 : _d['children'][index])) === null || _e === void 0 ? void 0 : _e.getBoundingClientRect().width;
        }
        setHighlight(updatedState);
    };
    return (jsxRuntime.jsxs("div", __assign({ className: "App" }, { children: [jsxRuntime.jsx("div", __assign({ className: "columns-2" }, { children: jsxRuntime.jsx("p", { children: "React app with tailwind is ready" }) })), jsxRuntime.jsxs("div", __assign({ className: "navbar" }, { children: [jsxRuntime.jsx(framerMotion.motion.div, { className: "highlight", initial: { width: highlight.initial.width }, animate: { width: [highlight.initial.width - 20, highlight.initial.width + 50, highlight.initial.widthAnimate], x: highlight.left }, transition: { duration: 0.5 } }), jsxRuntime.jsx("div", __assign({ className: "grid grid-flow-col auto-cols-max navbar-items", ref: navBar }, { children: params.items.map(function (item, index) {
                            return jsxRuntime.jsx("div", __assign({ className: selectedItem === index ? selectedItemClass : unselectedItemClass, onClick: function () { return startTransition(index); } }, { children: item.content }), index);
                        }) }))] }))] })));
}

exports.App = App;
