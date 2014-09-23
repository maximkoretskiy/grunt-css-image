#
# * grunt-css-image
# * https://github.com/lexich/grunt-css-image
# *
# * Copyright (c) 2013 Efremov ALexey (lexich)
# * Licensed under the MIT license.
#
"use strict"
libpath = require("path")
_ = require 'lodash'

class CssImage
  template: _.template """
  .<%= className %>{
    <%= cssDesc %>
  }

  """

  templateDesc: _.template """
    <%= background %>
    width: <%= width%>;
    height: <%= height %>px;
    background-size: <%=width%>px <%=height%>px;
  """

  templateDesc2x: _.template """
    <% if(halfBackground) { %>
    <%= halfBackground %>
    @media  only screen and (min-device-pixel-ratio: 2),
    only screen and (min-resolution: 192dpi) {
      <%= background %>
    }
    <% } else { %>
    <%= background %>
    <% }%>
    width: <%= width/retina %>px;
    height: <%= height/retina %>px;
    background-size: <%= width/retina %>px <%= height/retina %>px;
  """

  constructor: (opts={}) ->
    opts = _.defaults opts, {
      prefix: 'img_'
      images_path: ''
      images_half_path: false
      separator: '_'
      retinaFactor: false
    }
    { @prefix
      @images_path
      @images_half_path
      @separator
      @retinaFactor
    } = opts

  getImageDesc: (opts)->
    if !!@retinaFactor
      (@_getImageStyle opts) + (@_getImageStyle opts, true)
    else
      @_getImageStyle opts

  _getImageStyle: (opts, isRetina=false)->
    {width, height, file} = opts
    ctx = {}
    ctx.className = @_getClassName file, isRetina
    ctx.cssDesc = @_getCssDesc opts, isRetina
    @template ctx

  _getName: (file)-> libpath.basename file

  _getFolder: (file)->
    (libpath.dirname file)
    .replace (RegExp '^' + @images_path), ''


  _getFullSizePath: (path)->
    @images_path +  '/'+ path

  #todo: refactor
  _getHalfSizePath: (path)->
    ext = libpath.extname path
    path = path.replace (RegExp "\\" + ext + '$'), "-50pc#{ext}"
    @images_half_path +  '/'+ path

  _getCssDesc: (opts, isRetina=false)->
    {file} = opts
    ctx = _.extend {}, opts
    ctx.retina = @retinaFactor
    path = @_getFullSizePath file
    ctx.background = "background: url(\"#{path}\") no-repeat;"
    result = ""
    if isRetina
      ctx.halfBackground = ''
      if !!@images_half_path
        halfPath = @_getHalfSizePath file, @images_path, @images_half_path
        ctx.halfBackground = "background: url(\"#{halfPath}\") no-repeat;"
      @templateDesc2x ctx
    else
      @templateDesc ctx

  _getClassName: (file, isRetina)->
    name = (@_getName file)
      .replace /\.(png|jpg|jpeg|gif)/, ""
    folder = (@_getFolder file)
      .replace '/', '_'
    className = "#{@prefix}#{folder}#{@separator}#{name}"
      .replace '.', ''
    className +="-#{@retinaFactor}x" if !!@retinaFactor and isRetina
    className

  module.exports = CssImage
