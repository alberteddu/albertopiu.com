(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/Directory.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _File = require('./File');

var _File2 = _interopRequireDefault(_File);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Directory = function (_React$Component) {
    _inherits(Directory, _React$Component);

    function Directory() {
        _classCallCheck(this, Directory);

        var _this = _possibleConstructorReturn(this, (Directory.__proto__ || Object.getPrototypeOf(Directory)).call(this));

        _this.state = {
            open: true
        };
        return _this;
    }

    _createClass(Directory, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'directory-tree-directory' },
                _react2.default.createElement(
                    'div',
                    { className: 'node-line', onClick: function onClick() {
                            return _this2.setState({
                                open: !_this2.state.open
                            });
                        } },
                    _react2.default.createElement(
                        'span',
                        { className: 'node-name' },
                        _react2.default.createElement('i', { className: 'icon-folder' + (this.state.open ? '-open' : '') }),
                        this.props.name,
                        _react2.default.createElement(
                            'span',
                            { className: 'slash' },
                            '/'
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'node-comment' },
                        this.props.comment
                    )
                ),
                this.state.open ? _react2.default.createElement(
                    'div',
                    { className: 'node-files' },
                    this.props.files.map(function (object) {
                        if (object.type === 'file') {
                            return _react2.default.createElement(_File2.default, { name: object.name, comment: object.comment, fileType: object.fileType });
                        }

                        if (object.type === 'directory') {
                            return _react2.default.createElement(Directory, { name: object.name, comment: object.comment, files: object.files });
                        }
                    })
                ) : null
            );
        }
    }]);

    return Directory;
}(_react2.default.Component);

exports.default = Directory;

});

require.register("components/DirectoryTree.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Directory = require('./Directory');

var _Directory2 = _interopRequireDefault(_Directory);

var _File = require('./File');

var _File2 = _interopRequireDefault(_File);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DirectoryTree = function (_React$Component) {
    _inherits(DirectoryTree, _React$Component);

    function DirectoryTree() {
        _classCallCheck(this, DirectoryTree);

        var _this = _possibleConstructorReturn(this, (DirectoryTree.__proto__ || Object.getPrototypeOf(DirectoryTree)).call(this));

        _this.state = {
            loading: true,
            tree: {}
        };
        return _this;
    }

    _createClass(DirectoryTree, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            _jquery2.default.get(this.props.url, function (result) {
                _this2.setState({
                    loading: false,
                    tree: result
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            if (this.state.loading) return _react2.default.createElement('span', null);

            return _react2.default.createElement(
                'div',
                { className: 'directory-tree-component' },
                _react2.default.createElement(
                    'div',
                    { className: 'directory-tree-content' },
                    this.state.tree.map(function (object) {
                        return _this3.renderFileOrDirectory(object);
                    })
                )
            );
        }
    }, {
        key: 'renderFileOrDirectory',
        value: function renderFileOrDirectory(object) {
            var type = object.type;


            if (type === 'file') {
                return _react2.default.createElement(_File2.default, { name: object.name, comment: object.comment, fileType: object.fileType });
            }

            if (type === 'directory') {
                return _react2.default.createElement(_Directory2.default, { name: object.name, comment: object.comment, files: object.files });
            }
        }
    }]);

    return DirectoryTree;
}(_react2.default.Component);

exports.default = DirectoryTree;

});

require.register("components/File.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var File = function (_React$Component) {
    _inherits(File, _React$Component);

    function File() {
        _classCallCheck(this, File);

        return _possibleConstructorReturn(this, (File.__proto__ || Object.getPrototypeOf(File)).apply(this, arguments));
    }

    _createClass(File, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "directory-tree-file" },
                _react2.default.createElement(
                    "div",
                    { className: "node-line" },
                    _react2.default.createElement(
                        "span",
                        { className: "node-name" },
                        _react2.default.createElement("i", { className: "icon-" + this.props.fileType }),
                        this.props.name
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "node-comment" },
                        this.props.comment
                    )
                )
            );
        }
    }]);

    return File;
}(_react2.default.Component);

exports.default = File;

});

require.register("initialize.jsx", function(exports, require, module) {
'use strict';

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DirectoryTree = require('components/DirectoryTree');

var _DirectoryTree2 = _interopRequireDefault(_DirectoryTree);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
    (0, _jquery2.default)('.directory-tree').each(function () {
        var el = (0, _jquery2.default)(this);

        _reactDom2.default.render(_react2.default.createElement(_DirectoryTree2.default, { url: el.data('url') }), this);
    });
});

});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map