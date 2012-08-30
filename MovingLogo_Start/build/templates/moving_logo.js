// This file was automatically generated from moving_logo.soy.
// Please don't edit this file by hand.

goog.provide('movingr.templates.movinglogo');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
movingr.templates.movinglogo.body = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  movingr.templates.movinglogo.topBar(null, output);
  movingr.templates.movinglogo.mouseArea(null, output);
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
movingr.templates.movinglogo.topBar = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'', goog.getCssName('button-group'), '\'><h1>First day demo - Moving Logo</h1></div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
movingr.templates.movinglogo.mouseArea = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<img id=\'logo\' alt="Rose-Logo" src="images/RoseLogo.png"><div class=\'', goog.getCssName('mouse-area'), '\'></div>');
  return opt_sb ? '' : output.toString();
};
