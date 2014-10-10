'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.css_image = {
  setUp: function(done) {
    // setup here if necessary
    this.files = {
      def: grunt.file.read('tmp/_default.css'),
      actual: grunt.file.read('tmp/_custom.css'),
      nullimages: grunt.file.read('tmp/_nullimages.css'),
      mixin: grunt.file.read('tmp/_mixin.css'),
      retina: grunt.file.read('tmp/_retina.css')
    };
    done();
  },
  check_classnames:function(test){
    var actual = this.files.actual;
    test.ok(actual.indexOf(".custom-2") > 0);
    test.ok(actual.indexOf(".custom-cat20090508_025_amazing") > 0);
    test.ok(actual.indexOf(".custom-7151") > 0);
    test.ok(actual.indexOf(".custom-thumbkoshki3912") > 0);
    test.done();
  },
  check_styles: function(test) {
    var actual = this.files.actual;
    test.ok(actual.indexOf("background") > 0);
    test.ok(actual.indexOf("width:") > 0);
    test.ok(actual.indexOf("height:") > 0);
    test.ok(actual.indexOf("http://example.com/") > 0);
    test.ok(actual.indexOf('background-image: url("http://example.com/2.png");') > 0);
    test.done();
  },
  check_nullconfig:function(test){
    var nullimages = this.files.nullimages;
    test.equal(nullimages,"/* This file is generated */\n","file isn't null or bad formed");
    test.done();
  },
  check_retina:function(test){
    var retina = this.files.retina;
    test.ok(retina.indexOf(".img_2") > 0);
    test.ok(retina.indexOf(".img_cat20090508_025_amazing") > 0);
    test.ok(retina.indexOf(".img_7151") > 0);
    test.ok(retina.indexOf(".img_thumbkoshki3912") > 0);
    test.ok(retina.indexOf(".img_2-2x") > 0);
    test.ok(retina.indexOf(".img_cat20090508_025_amazing-2x") > 0);
    test.ok(retina.indexOf(".img_7151-2x") > 0);
    test.ok(retina.indexOf(".img_thumbkoshki3912-2x") > 0);
    test.ok(retina.indexOf("background-size") > 0 );
    test.done();
  },
  check_noretina: function(test){
    var def = this.files.def;
    test.ok(def.indexOf(".custom-2-2x") === -1);
    test.ok(def.indexOf(".custom-cat20090508_025_amazing-2x") === -1);
    test.ok(def.indexOf(".custom-7151-2x") === -1);
    test.ok(def.indexOf(".custom-thumbkoshki3912-2x") === -1);
    test.done();
  },

  check_mixin: function(test){
    var def = this.files.def;
    var mixin = this.files.mixin;
    test.ok(mixin.indexOf(".img_2") > 0);
    test.ok(mixin.indexOf(".img_2-2x") > 0);
    test.ok(mixin.indexOf("@mixin img_2") > 0);
    test.ok(mixin.indexOf("@mixin img_2-2x") > 0);
    test.ok(def.indexOf("@mixin img_2") === -1);
    test.ok(def.indexOf("@mixin img_2-2x") === -1);
    test.done();
  }
};
