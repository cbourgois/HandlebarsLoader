###
HandlebarsLoader.js 0.2

(c) 2012-2015 Cyrille Bourgois
https://github.com/cbourgois/HandlebarsLoader
HandlebarsLoader may be freely distributed under the MIT license.

###

handlebarsDefinition = (_, $, Handlebars) ->
  class HandlebarsLoader

    @VERSION: '0.2'

    tpl: {}
    templates: {}
    partials: {}
    callback: {}
    options: {}
    constructor: (options) ->
      @options = _.extend
        baseUrl: 'tpl/',
        partialUrl: 'tpl/partials/',
        extension: 'html'
        options

    getTemplate: (name) ->
      return @tpl[name]

    getAllTemplates: () ->
      return @tpl

    load: (nameTemplates, namePartials, callback) ->
      @templates = nameTemplates
      @partials = namePartials
      @callback = callback
      if @templates.length > 0
        @loadTemplate 0
      else if @partials.length > 0
        @loadPartial 0
      else if @callback
        @callback()

    loadTemplate: (index) ->
      name = @templates[index]
      $.ajax 
        url: @options.baseUrl + name + '.' + @options.extension,
        success: (data) =>
          @tpl[name] = (params) ->
            tpl = Handlebars.compile data
            return tpl(params)

          index++
          if index < @templates.length
            @loadTemplate(index)
          else if @partials.length > 0
            @loadPartial 0
          else if @callback
            @callback()
        dataType: 'html'

    loadPartial: (index) ->
      name = @partials[index]
      $.ajax
        url: @options.partialUrl + name + '.' + @options.extension,
        success: (data) =>
          Handlebars.registerPartial name, data
          index++;
          if index < @partials.length
            @loadPartial index
          else if @callback
            @callback()
        dataType: 'html'

do (definition = handlebarsDefinition, root = window) ->  
  hasDefine  = typeof define is "function" and define.amd?
  hasExports = typeof module isnt "undefined" and module.exports?

  # AMD.
  if hasDefine
    define ["underscore", "jquery", "handlebars"], definition

  # NodeJS/CommonJS.
  else if hasExports
    module.exports = definition require("underscore"), require("jquery"), require("handlebars")

  # root globals.
  else
    root.HandlebarsLoader = definition root._, (root.jQuery || root.Zepto || root.ender || root.$), root.Handlebars
