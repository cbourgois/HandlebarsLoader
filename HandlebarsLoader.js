//  HandlebarLoader.js 0.1

//  (c) 2012 Cyrille Bourgois
//	HandlebarLoader may be freely distributed under the MIT license.
//	https://github.com/cbourgois/HandlebarLoader


HandlebarsLoader = function(options)
{
	this._options = _.extend({
			'baseUrl': 'tpl/',
			'partialUrl': 'tpl/partials/',
			'extension': 'html'
		},
		options
	);
	this._tpl = {};
	this._templates = [];
	this._partials = [];
	this._callback = undefined;
};

_.extend( HandlebarsLoader.prototype, {
	loadTemplate : function(index)
	{
		var name = this._templates[ index ];
		var that = this;
    $.ajax({
			url: that._options.baseUrl + name + '.' + that._options.extension,
			success: function (data) {
    		that._tpl[name] = function(params) {
					var tpl = Handlebars.compile(data);
					return tpl(params);
				};
				index++;
				if (index < that._templates.length) {
					that.loadTemplate(index);
				}
				else if (that._partials.length > 0) {
					that.loadPartial(0);
				}
				else if (that._callback) {
					that._callback();
				}
			},
			dataType: 'html'
		});
  },

	loadPartial: function(index) {
		var name = this._partials[index];
		var that = this;
		$.ajax({
			url: that._options.partialUrl + name + '.' + that._options.extension,
			success: function(data) {
				Handlebars.registerPartial(name, data);
				index++;
				if (index < that._partials.length)	{
					that.loadPartial(index);
				}
				else if (that._callback) {
					that._callback();
				}
      },
			dataType: 'html'
		});
	},

	load: function (nameTemplates, namePartials, callback) {
		this._templates = nameTemplates;
		this._partials = namePartials;
		this._callback = callback;
    if (this._templates.length > 0) {
			this.loadTemplate(0);
		}
		else if (this._partials.length > 0) {
			this.loadPartial(0);
		}
		else if (this._callback) {
			this._callback();
		}
  },

	getTemplate : function(name) {
		return this._tpl[name];
	},

	getAllTemplates: function() {
		return this._tpl;
	}

});