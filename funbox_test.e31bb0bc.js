// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Card/card.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var getTemplate = function getTemplate(opt) {
  var portion = numeral_format(opt.volume_numeral);
  var mouse = numeral_format(opt.gift_numeral);
  var items = opt.items.map(function (item) {
    var int = item.data.gift;
    var gift = mouse(int) + opt.gift;

    if (int !== 1) {
      gift = int + ' ' + gift;
    }

    var cls;

    if (item.active) {
      cls = item.selected ? 'selected' : '';
    } else {
      cls = 'disabled';
    }

    return "\n          <div class=\"card ".concat(cls, "\" data-target=\"").concat(item.id, "\">\n            <div class=\"back\" data-id=\"").concat(item.id, "\">\n              <div class=\"front\">\n                <div class=\"info\">\n                  <span data-type=\"unless\">").concat(opt.slogan, "</span>\n                  <h1>").concat(opt.brendname, "</h1>\n                  <h3>").concat(item.data.flavor, "</h3>\n                  <p><strong>").concat(item.data.volume, " </strong>").concat(portion(item.data.volume), "<br/>").concat(gift, "<br/>").concat(item.data.happy || '', "</p>\n                </div>\n                <div class=\"circle\">\n                  <h1>").concat(item.data.weight[0], "</h1>\n                  <p>").concat(item.data.weight[1], "</p>\n                </div>\n              </div>\n            </div>\n            <div class=\"under_text\" data-type=\"under\">\n              <p>").concat(opt.appeal[0], "<a data-id=\"").concat(item.id, "\">").concat(opt.appeal[1], "</a><i>.</i></p>\n            </div>\n          </div>\n        ");
  }).join('');
  return items;
};

var _render = new WeakSet();

var _setup = new WeakSet();

var Card = /*#__PURE__*/function () {
  function Card(selector, options) {
    _classCallCheck(this, Card);

    _setup.add(this);

    _render.add(this);

    this.$el = document.querySelector(selector);
    this.options = options;
    this.$target = [];
    this.$unless = [];
    this.$under = [];

    _classPrivateMethodGet(this, _render, _render2).call(this);

    _classPrivateMethodGet(this, _setup, _setup2).call(this);
  }

  _createClass(Card, [{
    key: "isSelected",
    value: function isSelected(id) {
      return this.$target[id - 1].classList.contains('selected');
    }
  }, {
    key: "isDisabled",
    value: function isDisabled(id) {
      return this.$target[id - 1].classList.contains('disabled');
    }
  }, {
    key: "clickHandler",
    value: function clickHandler(event) {
      var id = event.target.dataset.id;

      if (this.isSelected(id)) {
        this.$target[id - 1].classList.remove('selected');
        this.$under[id - 1].innerHTML = "<p>".concat(this.options.appeal[0], "<a data-id=\"").concat(id, "\" data-type=\"appeal\">").concat(this.options.appeal[1], "</a><i>.</i></p>");
        this.$unless[id - 1].innerHTML = "<span data-type=\"unless\">".concat(this.options.slogan, "</span>");
      } else {
        this.$target[id - 1].classList.remove('hover');
        this.$target[id - 1].classList.add('selected');
        this.$under[id - 1].innerHTML = "<p>".concat(this.options.items[id].data.description, "</p>");
      }
    }
  }, {
    key: "mouseoverHandler",
    value: function mouseoverHandler(event) {
      var id = event.target.dataset.id;
      this.$target[id - 1].classList.add('hover');

      if (this.isSelected(id)) {
        this.$unless[id - 1].innerHTML = "<span data-type=\"unless\">".concat(this.options.unless, "</span>");
      }
    }
  }, {
    key: "mouseoutHandler",
    value: function mouseoutHandler(event) {
      var id = event.target.dataset.id;
      this.$target[id - 1].classList.remove('hover');

      if (this.isSelected(id)) {
        this.$unless[id - 1].innerHTML = "<span data-type=\"unless\">".concat(this.options.slogan, "</span>");
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.$el.removeEventListener('click', this.clickHandler);
      this.$el.removeEventListener('mouseover', this.mouseoverHandler);
      this.$el.removeEventListener('mouseout', this.mouseoutHandler);
      this.$el.innerHTML = '';
    }
  }]);

  return Card;
}();

exports.Card = Card;

var _render2 = function _render2() {
  var _this = this;

  this.$el.classList.add('products');
  this.$el.innerHTML = getTemplate(this.options);
  this.options.items.forEach(function (item, i) {
    _this.$target.push(_this.$el.querySelector("[data-target=\"".concat(item.id, "\"]")));

    _this.$unless.push(_this.$target[i].querySelector("[data-type=\"unless\"]"));

    _this.$under.push(_this.$target[i].querySelector("[data-type=\"under\"]"));

    if (_this.isSelected(i + 1)) {
      _this.$under[i].innerHTML = "<p>".concat(_this.options.items[i].data.description, "</p>");
    }

    if (_this.isDisabled(i + 1)) {
      _this.$under[i].innerHTML = "<p>".concat(_this.options.sorry[0]).concat(_this.options.items[i].data.flavor).concat(_this.options.sorry[1], "</p>");
    }
  });
};

var _setup2 = function _setup2() {
  this.clickHandler = this.clickHandler.bind(this);
  this.mouseoverHandler = this.mouseoverHandler.bind(this);
  this.mouseoutHandler = this.mouseoutHandler.bind(this);
  this.$el.addEventListener('click', this.clickHandler);
  this.$el.addEventListener('mouseover', this.mouseoverHandler);
  this.$el.addEventListener('mouseout', this.mouseoutHandler);
};

function numeral_format(arr) {
  return function (int) {
    var one = int % 10;
    var ten = (int % 100 - one) / 10;

    if (one === 1 && ten !== 1) {
      return arr[0];
    } else if (one > 1 && one < 5 && ten !== 1) {
      return arr[1];
    } else {
      return arr[2];
    }
  };
}
},{}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"Card/styles.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\assets\\cat.png":[["cat.200d3a79.png","assets/cat.png"],"assets/cat.png"],"_css_loader":"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"scss/index.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\assets\\fonts\\Exo2-Thin.woff2":[["Exo2-Thin.8969efab.woff2","assets/fonts/Exo2-Thin.woff2"],"assets/fonts/Exo2-Thin.woff2"],"./..\\assets\\fonts\\Exo2-Thin.ttf":[["Exo2-Thin.4a816dd8.ttf","assets/fonts/Exo2-Thin.ttf"],"assets/fonts/Exo2-Thin.ttf"],"./..\\assets\\fonts\\Lato-Thin.woff2":[["Lato-Thin.710076cc.woff2","assets/fonts/Lato-Thin.woff2"],"assets/fonts/Lato-Thin.woff2"],"./..\\assets\\fonts\\Lato-Thin.ttf":[["Lato-Thin.f2e145b7.ttf","assets/fonts/Lato-Thin.ttf"],"assets/fonts/Lato-Thin.ttf"],"./..\\assets\\Pattern.png":[["Pattern.c398e418.png","assets/Pattern.png"],"assets/Pattern.png"],"_css_loader":"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _card = require("./Card/card");

require("./Card/styles.scss");

require("./scss/index.scss");

var card = new _card.Card('#cards', {
  slogan: 'Сказочное заморское яство',
  brendname: 'Нямушка',
  appeal: ['Чего сидишь? Порадуй котэ, ', 'купи'],
  unless: 'Котэ не одобряет?',
  sorry: ['Печалька, ', ' закончился.'],
  volume_numeral: ['порция', 'порции', 'порций'],
  gift_numeral: ['мышь', 'мыши', 'мышей'],
  gift: ' в подарок',
  items: [{
    id: 1,
    active: true,
    selected: false,
    data: {
      flavor: 'с фуа-гра',
      description: 'Печень утки разварная с артишоками.',
      volume: 10,
      gift: 1,
      weight: ['0,5', 'кг']
    }
  }, {
    id: 2,
    active: true,
    selected: true,
    data: {
      flavor: 'с рыбой',
      description: 'Головы щучьи с чесноком да свежайшая сёмгушка.',
      volume: 40,
      gift: 2,
      weight: ['2', 'кг']
    }
  }, {
    id: 3,
    active: false,
    selected: false,
    data: {
      flavor: 'с курой',
      description: 'Филе из цыплят с трюфелями в бульоне.',
      volume: 100,
      gift: 5,
      happy: 'заказчик доволен',
      weight: ['5', 'кг']
    }
  }]
});
},{"./Card/card":"Card/card.js","./Card/styles.scss":"Card/styles.scss","./scss/index.scss":"scss/index.scss"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60809" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/funbox_test.e31bb0bc.js.map