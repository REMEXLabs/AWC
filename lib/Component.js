class Component {

  /**
   * constructor - Create a new Adaptive Web Component.
   *
   * @param  {string} _htmlTag   The new HTML tag.
   * @param  {class}  _baseClass The base class (e.g. HTMLElement, HTMLButtonElement, ...).
   * @param  {object} _data      The initial model of the component.
   */
  constructor(_htmlTag, _baseClass, _data) {
    Component.testBroswerFeatures();

    this.setHtmlTag(_htmlTag);
    this.setBaseClass(_baseClass);
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
      connectedCallback() {
        window.adaptiveElements = window.adaptiveElements || Array();
        this.addEventListener('adaptiveUpdate', this.adaptiveCallback, false);
        window.adaptiveElements.push(this);
      }
      disconnectedCallback() {
        // console.log("disconnectedCallback", this);
      };
      attributeChangedCallback(attrName, oldVal, newVal) {
        // console.log("attributeChangedCallback", this);
      }
      adoptedCallback() {
        // console.log("adoptedCallback", this);
      }
      adaptiveCallback(e) {
        data = this._mergeModels(data, e.detail);
        this._buildHtml(data);
      }
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
   * testBroswerFeatures - Test whether the browser support all features.
   *
   * @return {boolean}  Does the browser support all features?
   */
  static testBroswerFeatures() {
    let canCreateCustomElements = 'customElements' in window;
    let canAttachShadow = !!HTMLElement.prototype.attachShadow;
    let browserSupport = canCreateCustomElements && canAttachShadow;
    if (browserSupport === false) {
      let msg = "The browser doesn't support the required features.";
      throw new TypeError(msg);
    }
    return browserSupport;
  }
}
