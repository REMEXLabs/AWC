class Component {

  /**
   * constructor - Create a new Adaptive Web Component.
   *
   * @param  {string} _htmlTag   The new HTML tag.
   * @param  {class}  _baseClass The base class (e.g. HTMLElement, HTMLButtonElement, ...).
   * @param  {object} _data      The initial model of the component.
   */
  constructor(_htmlTag, _baseClass, _data, _options) {
    Component.testBroswerSupport();

    this.setHtmlTag(_htmlTag);
    this.setBaseClass(_baseClass);
    let opts = _options || {};
    let key = undefined;
    let data = _data;

    window.customElements.define(_htmlTag, class Tag extends _baseClass {
      constructor() {
        super();
        this.root = this.attachShadow({
          mode: 'open'
        });
        let link = document.querySelectorAll('[data-tag=' + _htmlTag + ']')[0];
        this.template = link.import.getElementsByTagName('template')[0];
        this._buildHtml(data);
      }

      /**
       * connectedCallback - Implementation of the connectedCallback.
       */
      connectedCallback() {
        window.adaptiveElements = window.adaptiveElements || Array();
        this.addEventListener('adaptiveUpdate', this._adaptiveChangeCallback, false);
        window.adaptiveElements.push(this);
        // Atatch callback:
        this._pipeCallback('onCreate');
      }

      /**
       * disconnectedCallback - Implementation of the disconnectedCallback.
       */
      disconnectedCallback() {
        // Atatch callback:
        this._pipeCallback('onDisconnect');
      };

      /**
       * attributeChangedCallback - description
       *
       * @param  {string} attrName The changed attribute.
       * @param  {mix} oldVal   The old value.
       * @param  {mix} newVal   The new value.
       */
      attributeChangedCallback(attrName, oldVal, newVal) {
        // Atatch callback:
        this._pipeCallback('onAttributeChange');
      }

      /**
       * adoptedCallback - Implementation of the adoptedCallback.
       */
      adoptedCallback() {
        // Atatch callback:
        this._pipeCallback('onAdopted');
      }

      /**
       * _adaptiveCallback - Definition of a new
       * callback to make adaptive changes possible.
       *
       * @param  {event} e The event object.
       */
      _adaptiveChangeCallback(e) {
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
      _pipeCallback(key) {
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
      _mergeModels(mdl1, mdl2) {
        let mdl = {};
        for (let x in mdl1) {
          if (mdl1.hasOwnProperty(x)) {
            mdl[x] = mdl1[x];
          }
        }
        for (let x in mdl2) {
          if (mdl2.hasOwnProperty(x)) {
            mdl[x] = mdl2[x];
          }
        }
        return mdl;
      }

      /**
       * _buildHtml - Generate and set the HTML.
       *
       * @param  {object} data The model.
       */
      _buildHtml(data) {
        this.root.innerHTML = '';
        let instance = this.template.content.cloneNode(true);
        let div = document.createElement('div');
        div.appendChild(instance);
        let handlebar = window.Handlebars.compile(div.innerHTML);
        let buildHtml = handlebar(data);
        this.root.innerHTML = buildHtml;
      }
    });
  }

  /**
   * setHtmlTag - Set the name of the new HTML tag.
   *
   * @param  {string} tag The new HTML tag.
   */
  setHtmlTag(tag) {
    if (typeof (tag) !== 'string') {
      let msg = "The assigned tag " + tag + " isn't of type 'string'."
      throw new TypeError(msg);
    }
    this.htmlTag = tag;
  }

  /**
   * getHtmlTag - Get the name of the defined HTML tag.
   *
   * @return {string}  The defined HTML tag.
   */
  getHtmlTag() {
    return this.htmlTag;
  }

  /**
   * setBaseClass - Set the known HTMLElement base class.
   *
   * @param  {type} klass The known base class.
   */
  setBaseClass(klass) {
    if (typeof (klass) !== 'function') {
      let msg = "The assigned class isn't of type 'function'.";
      throw new TypeError(msg);
    }
    this.baseClass = klass;
  }

  /**
   * getBaseClass - Get the defined base class.
   *
   * @return {class}       The defined base class.
   */
  getBaseClass() {
    return this.baseClass;
  }

  /**
   * testBroswerSupport - Test whether the browser support all features.
   *
   * @return {boolean}  Does the browser support all features?
   */
  static testBroswerSupport() {
    // Version == 1.0:
    if ('customElements' in window &&
      !!HTMLElement.prototype.attachShadow) {
      return true;
      // Version < 1.0:
    } else if (
      'registerElement' in document &&
      'import' in document.createElement('link') &&
      'content' in document.createElement('template')) {
      // At frist, do nothing.
      // return true;
    }
    let msg = "The browser doesn't support the required features.";
    throw new TypeError(msg);
    return false;
  }
}
