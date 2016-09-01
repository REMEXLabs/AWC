'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {

  /**
   * constructor - Create a new Adaptive Web Component.
   *
   * @param  {string} _htmlTag   The new HTML tag.
   * @param  {class}  _baseClass The base class (e.g. HTMLElement, HTMLButtonElement, ...).
   * @param  {object} _data      The initial model of the component.
   */
  function Component(_htmlTag, _baseClass, _data, _options) {
    _classCallCheck(this, Component);

    Component.testBroswerSupport();

    this.setHtmlTag(_htmlTag);
    this.setBaseClass(_baseClass);
    var opts = _options || {};
    var key = undefined;
    var data = _data;

    window.customElements.define(_htmlTag, function (_baseClass2) {
      _inherits(Tag, _baseClass2);

      function Tag() {
        _classCallCheck(this, Tag);

        var _this = _possibleConstructorReturn(this, (Tag.__proto__ || Object.getPrototypeOf(Tag)).call(this));

        _this.root = _this.attachShadow({
          mode: 'open'
        });
        var link = document.querySelectorAll('[data-tag=' + _htmlTag + ']')[0];
        _this.template = link.import.getElementsByTagName('template')[0];
        _this._buildHtml(data);
        return _this;
      }

      /**
       * connectedCallback - Implementation of the connectedCallback.
       */


      _createClass(Tag, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
          window.adaptiveElements = window.adaptiveElements || Array();
          this.addEventListener('adaptiveUpdate', this._adaptiveChangeCallback, false);
          window.adaptiveElements.push(this);
          // Atatch callback:
          this._pipeCallback('onCreate');
        }

        /**
         * disconnectedCallback - Implementation of the disconnectedCallback.
         */

      }, {
        key: 'disconnectedCallback',
        value: function disconnectedCallback() {
          // Atatch callback:
          this._pipeCallback('onDisconnect');
        }
      }, {
        key: 'attributeChangedCallback',


        /**
         * attributeChangedCallback - description
         *
         * @param  {string} attrName The changed attribute.
         * @param  {mix} oldVal   The old value.
         * @param  {mix} newVal   The new value.
         */
        value: function attributeChangedCallback(attrName, oldVal, newVal) {
          // Atatch callback:
          this._pipeCallback('onAttributeChange');
        }

        /**
         * adoptedCallback - Implementation of the adoptedCallback.
         */

      }, {
        key: 'adoptedCallback',
        value: function adoptedCallback() {
          // Atatch callback:
          this._pipeCallback('onAdopted');
        }

        /**
         * _adaptiveCallback - Definition of a new
         * callback to make adaptive changes possible.
         *
         * @param  {event} e The event object.
         */

      }, {
        key: '_adaptiveChangeCallback',
        value: function _adaptiveChangeCallback(e) {
          // Atatch callback:
          this._pipeCallback('onAdaptiveChange');
          // Update HTML:
          data = this._mergeModels(data, e.detail);
          this._buildHtml(data);
        }

        /**
         * _pipeCallback - Call the applied function.
         *
         * @param  {string} key The name of the callback.
         */

      }, {
        key: '_pipeCallback',
        value: function _pipeCallback(key) {
          if (key in opts && typeof opts[key] === "function") {
            opts[key].call(this, this);
          }
        }

        /**
         * _mergeModels - Merge two object literals.
         *
         * @param  {object} mdl1 The old object literal.
         * @param  {object} mdl2 The new object literal.
         * @return {object}      The merged object literal.
         */

      }, {
        key: '_mergeModels',
        value: function _mergeModels(mdl1, mdl2) {
          var mdl = {};
          for (var x in mdl1) {
            if (mdl1.hasOwnProperty(x)) {
              mdl[x] = mdl1[x];
            }
          }
          for (var _x in mdl2) {
            if (mdl2.hasOwnProperty(_x)) {
              mdl[_x] = mdl2[_x];
            }
          }
          return mdl;
        }

        /**
         * _buildHtml - Generate and set the HTML.
         *
         * @param  {object} data The model.
         */

      }, {
        key: '_buildHtml',
        value: function _buildHtml(data) {
          this.root.innerHTML = '';
          var instance = this.template.content.cloneNode(true);
          var div = document.createElement('div');
          div.appendChild(instance);
          var handlebar = window.Handlebars.compile(div.innerHTML);
          var buildHtml = handlebar(data);
          this.root.innerHTML = buildHtml;
        }
      }]);

      return Tag;
    }(_baseClass));
  }

  /**
   * setHtmlTag - Set the name of the new HTML tag.
   *
   * @param  {string} tag The new HTML tag.
   */


  _createClass(Component, [{
    key: 'setHtmlTag',
    value: function setHtmlTag(tag) {
      if (typeof tag !== 'string') {
        var msg = "The assigned tag " + tag + " isn't of type 'string'.";
        throw new TypeError(msg);
      }
      this.htmlTag = tag;
    }

    /**
     * getHtmlTag - Get the name of the defined HTML tag.
     *
     * @return {string}  The defined HTML tag.
     */

  }, {
    key: 'getHtmlTag',
    value: function getHtmlTag() {
      return this.htmlTag;
    }

    /**
     * setBaseClass - Set the known HTMLElement base class.
     *
     * @param  {type} klass The known base class.
     */

  }, {
    key: 'setBaseClass',
    value: function setBaseClass(klass) {
      if (typeof klass !== 'function') {
        var msg = "The assigned class isn't of type 'function'.";
        throw new TypeError(msg);
      }
      this.baseClass = klass;
    }

    /**
     * getBaseClass - Get the defined base class.
     *
     * @return {class}       The defined base class.
     */

  }, {
    key: 'getBaseClass',
    value: function getBaseClass() {
      return this.baseClass;
    }

    /**
     * testBroswerSupport - Test whether the browser support all features.
     *
     * @return {boolean}  Does the browser support all features?
     */

  }], [{
    key: 'testBroswerSupport',
    value: function testBroswerSupport() {
      // Version == 1.0:
      if ('customElements' in window && !!HTMLElement.prototype.attachShadow) {
        return true;
        // Version < 1.0:
      } else if ('registerElement' in document && 'import' in document.createElement('link') && 'content' in document.createElement('template')) {
        // At frist, do nothing.
        // return true;
      }
      var msg = "The browser doesn't support the required features.";
      throw new TypeError(msg);
      return false;
    }
  }]);

  return Component;
}();
//# sourceMappingURL=Component.js.map
