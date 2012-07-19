
/**
 * @fileoverview Serves as the view controller for the moving logo example.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('movingr.MovingLogoController');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.events.KeyCodes');
goog.require('goog.events.EventTarget');
goog.require('goog.debug.Logger');
goog.require('goog.soy');
goog.require('goog.ui.CustomButton');
goog.require('goog.ui.Checkbox');
goog.require('goog.ui.Css3ButtonRenderer');
goog.require('movingr.templates.movinglogo');



/**
 * Connects listeners to the buttons.
 *
 * @param {!Element} contentElement The element for this controller’s content.
 * @constructor
 * @extends {goog.events.EventTarget}
 */
movingr.MovingLogoController = function(contentElement) {
  goog.base(this);
  
  /**
   * Container element for this controller's content.
   * @type {!Element}
   * @private
   */
  this.container_ = contentElement;

  /**
   * Number of pixels between the logo's left edge and the screen's left edge.
   * Note, this variable is for demonstration purposes only.  The elements left
   * value could be read via goog.dom.getElement('logo').offsetLeft.  However,
   * I wanted to demonstrate a simple instance variable.
   * @type {number}
   * @private
   */
  this.logoLeft_ = movingr.MovingLogoController.INITIAL_LOGO_LEFT;

  /**
   * Number of pixels between the logo's top edge and the screen's top edge.
   * Note, this variable is for demonstration purposes only.  The elements top
   * value could be read via goog.dom.getElement('logo').offsetTop.  However,
   * I wanted to demonstrate a simple instance variable.
   * @type {number}
   * @private
   */
  this.logoTop_ = movingr.MovingLogoController.INITIAL_LOGO_TOP;
  
  /**
   * Array of button controls.  Reference held for later disposal.
   * @type {Array.<goog.ui.Control>}
   * @private
   */
  this.buttonControls_ = [];

  /**
   * @type {goog.events.KeyHandler}
   * @private
   */
  this.keyHandler_ = null;
  
  /**
   * Holds events that should only be removed when the controller is disposed.
   * @type {goog.events.EventHandler}
   * @private
   */
  this.eventHandler_ = new goog.events.EventHandler(this);
  
  this.init_();
};
goog.inherits(movingr.MovingLogoController, goog.events.EventTarget);


/**
 * Initial number of pixels between the logo's left edge and the screen left.
 * @type {number}
 * @const
 */
movingr.MovingLogoController.INITIAL_LOGO_LEFT = 100;


/**
 * Initial number of pixels between the logo's top edge and the screen top.
 * @type {number}
 * @const
 */
movingr.MovingLogoController.INITIAL_LOGO_TOP = 100;


/**
 * Movement amount for the logo.
 * @type {number}
 * @const
 */
movingr.MovingLogoController.MOVE_AMOUNT = 50;


/**
 * Logger for this class.
 * @type {goog.debug.Logger}
 */
movingr.MovingLogoController.prototype.logger =
    goog.debug.Logger.getLogger('movingr.MovingLogoController');


/**
 * Initialize the view controller.
 * @private
 */
movingr.MovingLogoController.prototype.init_ = function() {
  // Add the html tags using Soy.
  goog.soy.renderElement(this.container_, movingr.templates.movinglogo.body);
  
  // Add control objects to the buttons.
  var movementButtonEls = goog.dom.getElementsByClass(
      goog.getCssName('button'));
  for (var i = 0; i < movementButtonEls.length; i++) {
    var buttonControl = new goog.ui.CustomButton('',
        goog.ui.Css3ButtonRenderer.getInstance());
    buttonControl.setSupportedState(goog.ui.Component.State.FOCUSED, false);
    buttonControl.setSupportedState(goog.ui.Component.State.DISABLED, false);
    buttonControl.decorate(movementButtonEls[i]);
    this.eventHandler_.listen(buttonControl, goog.ui.Component.EventType.ACTION,
        this.buttonClick_);
    this.buttonControls_.push(buttonControl);
  }

  // Listen for key press events.
  this.keyHandler_ = new goog.events.KeyHandler(goog.dom.getDocument());
  this.eventHandler_.listen(this.keyHandler_,
      goog.events.KeyHandler.EventType.KEY, this.onKeyEvent_);
  
  // Listen for mouse movement events.
  this.eventHandler_.listen(
      goog.dom.getElementByClass(goog.getCssName('mouse-area')),
      goog.events.EventType.MOUSEMOVE, this.mouseMove_);
  
  // Listen for touch movement events (for mobile).
  this.eventHandler_.listen(
      goog.dom.getElementByClass(goog.getCssName('mouse-area')),
      [goog.events.EventType.TOUCHSTART,
       goog.events.EventType.TOUCHMOVE,
       goog.events.EventType.TOUCHEND],
      this.mouseMove_);

  // Listen for resize events.
  this.eventHandler_.listen(window, goog.events.EventType.RESIZE,
      this.handleResize_);
  
  this.resizeElements_();
  this.updateImage_();
};


/**
 * Changes the logo image position based on the id of the button clicked.
 * @param {goog.events.Event} e Click event.
 * @private
 */
movingr.MovingLogoController.prototype.buttonClick_ = function(e) {
  switch (e.target.getElement().id) {
    case 'move-up':
      this.logoTop_ -= movingr.MovingLogoController.MOVE_AMOUNT;
      break;
    case 'move-down':
      this.logoTop_ += movingr.MovingLogoController.MOVE_AMOUNT;
      break;
    case 'move-left':
      this.logoLeft_ -= movingr.MovingLogoController.MOVE_AMOUNT;
      break;
    case 'move-right':
      this.logoLeft_ += movingr.MovingLogoController.MOVE_AMOUNT;
      break;
    case 'reset':
      this.logoLeft_ = movingr.MovingLogoController.INITIAL_LOGO_LEFT;
      this.logoTop_ = movingr.MovingLogoController.INITIAL_LOGO_TOP;
      break;
  }
  this.updateImage_();
};


/**
 * Listener for key press events.
 * @param {goog.events.KeyEvent} e Key event.
 * @private
 */
movingr.MovingLogoController.prototype.onKeyEvent_ = function(e) {
  switch (e.keyCode) {
    case goog.events.KeyCodes.UP:
      this.logoTop_ -= movingr.MovingLogoController.MOVE_AMOUNT;
      break;
    case goog.events.KeyCodes.DOWN:
      this.logoTop_ += movingr.MovingLogoController.MOVE_AMOUNT;
      break;
    case goog.events.KeyCodes.LEFT:
      this.logoLeft_ -= movingr.MovingLogoController.MOVE_AMOUNT;
      break;
    case goog.events.KeyCodes.RIGHT:
      this.logoLeft_ += movingr.MovingLogoController.MOVE_AMOUNT;
      break;
    case goog.events.KeyCodes.SPACE:
      this.logoLeft_ = movingr.MovingLogoController.INITIAL_LOGO_LEFT;
      this.logoTop_ = movingr.MovingLogoController.INITIAL_LOGO_TOP;
      break;
    case goog.events.KeyCodes.R:
      goog.dom.classes.add(goog.dom.getElement('logo'), goog.getCssName('rotate'));
      break;
    case goog.events.KeyCodes.S:
      goog.dom.classes.add(goog.dom.getElement('logo'), goog.getCssName('scale'));
      break;
    case goog.events.KeyCodes.U:
      goog.dom.classes.remove(goog.dom.getElement('logo'),
          goog.getCssName('rotate'),
          goog.getCssName('scale'));
      break;
  }
  this.updateImage_();
  e.preventDefault();
};


/**
 * Listener for mouse movement events.
 * @param {goog.events.BrowserEvent} e Mouse movement event.
 * @private
 */
movingr.MovingLogoController.prototype.mouseMove_ = function(e) {
  var logoEl = goog.dom.getElement('logo');
  if (e.type == "touchstart" || e.type == "touchmove" || e.type == "touchend") {
    var touches = e.event_.touches;
    if (touches.length < 1) {
      this.logger.info('No touches. Type = ' + e.type);
      return;
    }
    this.logger.info('Touch position: x = ' + touches[0].clientX +
        '  y = ' + touches[0].clientY);
    this.logoLeft_ = touches[0].clientX - logoEl.offsetWidth / 2;
    this.logoTop_ = touches[0].clientY - logoEl.offsetHeight / 2;
  } else {
    this.logger.info('Mouse position: x = ' + e.clientX + '  y = ' + e.clientY);
    this.logoLeft_ = e.clientX - logoEl.offsetWidth / 2;
    this.logoTop_ = e.clientY - logoEl.offsetHeight / 2;
  }
  this.updateImage_();    
};


/**
 * Updates the logo image position.
 * @private
 */
movingr.MovingLogoController.prototype.updateImage_ = function() {
  var logoEl = goog.dom.getElement('logo');
  goog.style.setStyle(logoEl, 'left', this.logoLeft_ + 'px');
  goog.style.setStyle(logoEl, 'top', this.logoTop_ + 'px'); 
};


/**
 * Listener for a window resize event.
 * @param {goog.events.Event} e The event for the window resize.
 * @private
 */
movingr.MovingLogoController.prototype.handleResize_ = function(e) {
    this.resizeElements_();
};


/**
 * Resize the elements on the screen based on the window width.
 * Allow a few margins
 * @private
 */
movingr.MovingLogoController.prototype.resizeElements_ = function() {
  // Manually resize some elements to fill the screen.
  // Once the CSS3 calc function is standard garbage like this can go into CSS.
  var screenHeight = window.innerHeight;
  var mouseArea = goog.dom.getElementByClass(goog.getCssName('mouse-area'));
  goog.style.setStyle(mouseArea, 'height', (screenHeight - 100) + 'px');
  
  var screenWidth = window.innerWidth;
  if (screenWidth < 500) {
    var title = goog.dom.getElementsByTagNameAndClass('h1')[0];
    title.innerHTML = "Moving Logo";
  }
};


/** @inheritDoc */
movingr.MovingLogoController.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  
  // Remove listeners added.
  this.eventHandler_.removeAll();
  goog.dispose(this.eventHandler_);
  delete this.eventHandler_;
  
  // Remove listeners added by controls.
  for (var i = 0; i < this.buttonControls_.length; i++) {
    goog.dispose(this.buttonControls_[i]);
  }
  delete this.buttonControls_;
  
  // Remove listeners added by key handler.
  goog.dispose(this.keyHandler_);
  delete this.keyHandler_;
  
  // Remove the DOM elements.
  goog.dom.removeChildren(this.container_);
};
