
/*
HandlebarsLoader.js 0.2

(c) 2012-2015 Cyrille Bourgois
https://github.com/cbourgois/HandlebarsLoader
HandlebarsLoader may be freely distributed under the MIT license.
 */
var handlebarsDefinition;

handlebarsDefinition = function(_, $, Handlebars) {
  var HandlebarsLoader;
  return HandlebarsLoader = (function() {
    HandlebarsLoader.VERSION = '0.2.0';

    HandlebarsLoader.prototype.tpl = {};

    HandlebarsLoader.prototype.templates = {};

    HandlebarsLoader.prototype.partials = {};

    HandlebarsLoader.prototype.callback = {};

    HandlebarsLoader.prototype.options = {};

    function HandlebarsLoader(options) {
      this.options = _.extend({
        baseUrl: 'tpl/',
        partialUrl: 'tpl/partials/',
        extension: 'html'
      }, options);
    }

    HandlebarsLoader.prototype.getTemplate = function(name) {
      return this.tpl[name];
    };

    HandlebarsLoader.prototype.getAllTemplates = function() {
      return this.tpl;
    };

    HandlebarsLoader.prototype.load = function(nameTemplates, namePartials, callback) {
      this.templates = nameTemplates;
      this.partials = namePartials;
      this.callback = callback;
      if (this.templates.length > 0) {
        return this.loadTemplate(0);
      } else if (this.partials.length > 0) {
        return this.loadPartial(0);
      } else if (this.callback) {
        return this.callback();
      }
    };

    HandlebarsLoader.prototype.loadTemplate = function(index) {
      var name;
      name = this.templates[index];
      return $.ajax({
        url: this.options.baseUrl + name + '.' + this.options.extension,
        success: (function(_this) {
          return function(data) {
            _this.tpl[name] = function(params) {
              var tpl;
              tpl = Handlebars.compile(data);
              return tpl(params);
            };
            index++;
            if (index < _this.templates.length) {
              return _this.loadTemplate(index);
            } else if (_this.partials.length > 0) {
              return _this.loadPartial(0);
            } else if (_this.callback) {
              return _this.callback();
            }
          };
        })(this),
        dataType: 'html'
      });
    };

    HandlebarsLoader.prototype.loadPartial = function(index) {
      var name;
      name = this.partials[index];
      return $.ajax({
        url: this.options.partialUrl + name + '.' + this.options.extension,
        success: (function(_this) {
          return function(data) {
            Handlebars.registerPartial(name, data);
            index++;
            if (index < _this.partials.length) {
              return _this.loadPartial(index);
            } else if (_this.callback) {
              return _this.callback();
            }
          };
        })(this),
        dataType: 'html'
      });
    };

    return HandlebarsLoader;

  })();
};

(function(definition, root) {
  var hasDefine, hasExports;
  hasDefine = typeof define === "function" && (define.amd != null);
  hasExports = typeof module !== "undefined" && (module.exports != null);
  if (hasDefine) {
    return define(["underscore", "jquery", "handlebars"], definition);
  } else if (hasExports) {
    return module.exports = definition(require("underscore"), require("jquery"), require("handlebars"));
  } else {
    return root.HandlebarsLoader = definition(root._, root.jQuery || root.Zepto || root.ender || root.$, root.Handlebars);
  }
})(handlebarsDefinition, window);
