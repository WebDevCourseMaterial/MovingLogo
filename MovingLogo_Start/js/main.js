
/**
 * @fileoverview Simple main method.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('movingr.Main');

goog.require('goog.debug.Console');
goog.require('goog.debug.Logger');
goog.require('goog.debug.LogManager');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('movingr.MovingLogoController');


goog.events.listen(goog.dom.getDocument(), "DOMContentLoaded", function(e) {
  goog.debug.LogManager.getRoot().setLevel(goog.debug.Logger.Level.INFO);
  var logconsole = new goog.debug.Console();
  logconsole.setCapturing(true);

  new movingr.MovingLogoController(/** @type {!Element} */
      (window.document.body));  
});