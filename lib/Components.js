class Components {

  /**
   * updateAll - Update all Adaptive Web Components.
   *
   * @param  {object} data The model data.
   */
  static updateAll(data) {
    if (Components._hasAdaptiveWebComps()) {
      let event = new CustomEvent('adaptiveUpdate', {
        detail: data
      });
      for (let idx in window.adaptiveElements) {
        let el = window.adaptiveElements[idx];
        el.dispatchEvent(event);
      }
    }
  }

  /**
   * update - Update a specific Adaptive Web Component.
   *
   * @param  {string} htmlTag The HTML tag.
   * @param  {object} data    The model data.
   */
  static update(htmlTag, data) {
    if (Components._hasAdaptiveWebComps()) {
      for (let idx in window.adaptiveElements) {
        let el = window.adaptiveElements[idx];
        if (el.tagName.toLowerCase() == htmlTag) {
          let event = new CustomEvent('adaptiveUpdate', {
            detail: data
          });
          el.dispatchEvent(event);
        }
      }
    }
  }

  /**
   * _hasAdaptiveWebComps - Whether the browser support all features or not.
   *
   * @return {boolean}  Whether the browser support all features or not.
   */
  static _hasAdaptiveWebComps() {
    // ≠ window.customElements
    return 'adaptiveElements' in window && window.adaptiveElements.length > 0;
  }
}
