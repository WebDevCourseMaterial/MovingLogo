
/**
 * @fileoverview Unit tests for the moving_logo_controller.js file.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */


/** Objects under test. */
var movingLogoController;
var stubs = new goog.testing.PropertyReplacer();

function setUpPage() {
}


function setUp() {
  stubs.replace(movingr.MovingLogoController.prototype,
      'resizeElements_', function() {});
  stubs.replace(movingr.MovingLogoController.prototype,
      'updateImage_', function() {});
  var testDivEl = goog.dom.getElement('testDiv');
  movingLogoController = new movingr.MovingLogoController(testDivEl);
}


function tearDown() {
  movingLogoController.dispose();
  // Make sure dispose removes all listeners and DOM elements.
  var testDivEl = goog.dom.getElement('testDiv');
  assertEquals(0, goog.dom.getChildren(testDivEl).length);
  assertEquals(0, goog.events.getTotalListenerCount());
}


function testInit() {
  var testDivEl = goog.dom.getElement('testDiv');
  assertTrue('No DOM elements added',
      goog.dom.getChildren(testDivEl).length > 0);
  assertTrue('No button controls added',
      movingLogoController.buttonControls_.length > 0);
  assertTrue('No event listeners added beyond controls',
      movingLogoController.eventHandler_.getListenerCount() > 0);
}


function testInit_functionCalls() {
  var mockControl = new goog.testing.MockControl();
  var mockUpdateImageFn = mockControl.createFunctionMock();
  stubs.replace(movingr.MovingLogoController.prototype,
      'updateImage_', mockUpdateImageFn);
  mockUpdateImageFn();
  var mockResizeElementsFn = mockControl.createFunctionMock();
  stubs.replace(movingr.MovingLogoController.prototype,
      'resizeElements_', mockResizeElementsFn);
  mockResizeElementsFn();
  mockControl.$replayAll();
  var anotherTestDivEl = goog.dom.createDom('div');
  anotherController = new movingr.MovingLogoController(anotherTestDivEl);
  mockControl.$verifyAll();
  anotherController.dispose();
  mockControl.$tearDown();
}


function testButtonClick_up() {
  var e = {target: {getElement: function() {return {id: 'move-up'};}}};
  movingLogoController.buttonClick_(e);
  assertEquals(movingr.MovingLogoController.INITIAL_LOGO_TOP -
      movingr.MovingLogoController.MOVE_AMOUNT,
      movingLogoController.logoTop_);
}


function testButtonClick_upupup() {
  var e = {target: {getElement: function() {return {id: 'move-up'};}}};
  movingLogoController.buttonClick_(e);
  movingLogoController.buttonClick_(e);
  movingLogoController.buttonClick_(e);
  assertEquals(movingr.MovingLogoController.INITIAL_LOGO_TOP -
      3 * movingr.MovingLogoController.MOVE_AMOUNT,
      movingLogoController.logoTop_);
}


function testButtonClick_reset() {
  var e = {target: {getElement: function() {return {id: 'move-up'};}}};
  movingLogoController.buttonClick_(e);
  var e = {target: {getElement: function() {return {id: 'move-left'};}}};
  movingLogoController.buttonClick_(e);
  var e = {target: {getElement: function() {return {id: 'reset'};}}};
  movingLogoController.buttonClick_(e);
  assertEquals(movingr.MovingLogoController.INITIAL_LOGO_TOP,
      movingLogoController.logoTop_);
  assertEquals(movingr.MovingLogoController.INITIAL_LOGO_LEFT,
      movingLogoController.logoLeft_);
}


function testButtonClick_functionCall() {
  var mockControl = new goog.testing.MockControl();
  var mockUpdateImageFn = mockControl.createFunctionMock();
  stubs.replace(movingr.MovingLogoController.prototype,
    'updateImage_', mockUpdateImageFn);
  mockUpdateImageFn();
  mockControl.$replayAll();
  var e = {target: {getElement: function() {return {id: 'move-up'};}}};
  movingLogoController.buttonClick_(e);
  mockControl.$verifyAll();
  mockControl.$tearDown();
}

function testOnKeyEvent_Right() {
  var e = {preventDefault: function(){}};
  e.keyCode = goog.events.KeyCodes.RIGHT;
  movingLogoController.onKeyEvent_(e);
  assertEquals(movingr.MovingLogoController.INITIAL_LOGO_LEFT +
      movingr.MovingLogoController.MOVE_AMOUNT,
      movingLogoController.logoLeft_);
}

function testOnKeyEvent_R() {
  var e = {preventDefault: function(){}};
  e.keyCode = goog.events.KeyCodes.R;
  movingLogoController.onKeyEvent_(e);
  var logo = goog.dom.getElement('logo');
  assertTrue(goog.dom.classes.has(logo, 'rotate'));
}


function testOnKeyEvent_U() {
  var e = {preventDefault: function(){}};
  e.keyCode = goog.events.KeyCodes.S;
  movingLogoController.onKeyEvent_(e);
  e.keyCode = goog.events.KeyCodes.R;
  movingLogoController.onKeyEvent_(e);
  var logo = goog.dom.getElement('logo');
  assertTrue(goog.dom.classes.has(logo, 'scale'));
  assertTrue(goog.dom.classes.has(logo, 'rotate'));
  e.keyCode = goog.events.KeyCodes.U;
  movingLogoController.onKeyEvent_(e);
  assertFalse(goog.dom.classes.has(logo, 'scale'));
  assertFalse(goog.dom.classes.has(logo, 'rotate'));
}

function testMouseMove() {
  var e = {clientX: 300, clientY: 200};
  movingLogoController.mouseMove_(e);
  var logoEl = goog.dom.getElement('logo');
  assertEquals(300 - logoEl.offsetWidth / 2, movingLogoController.logoLeft_);
  assertEquals(200 - logoEl.offsetHeight / 2, movingLogoController.logoTop_);
}
