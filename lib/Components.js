'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Components = function () {
  function Components() {
    _classCallCheck(this, Components);
  }

  _createClass(Components, null, [{
    key: 'updateAll',


    /**
     * updateAll - Update all Adaptive Web Components.
     *
     * @param  {object} data The model data.
     */
    value: function updateAll(data) {
      if (Components._hasAdaptiveWebComps()) {
        var event = new CustomEvent('adaptiveUpdate', {
          detail: data
        });
        for (var idx in window.adaptiveElements) {
          var el = window.adaptiveElements[idx];
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

  }, {
    key: 'update',
    value: function update(htmlTag, data) {
      if (Components._hasAdaptiveWebComps()) {
        for (var idx in window.adaptiveElements) {
          var el = window.adaptiveElements[idx];
          if (el.tagName.toLowerCase() == htmlTag) {
            var event = new CustomEvent('adaptiveUpdate', {
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

  }, {
    key: '_hasAdaptiveWebComps',
    value: function _hasAdaptiveWebComps() {
      // ≠ window.customElements
      return 'adaptiveElements' in window && window.adaptiveElements.length > 0;
    }
  }]);

  return Components;
}();
//# sourceMappingURL=Components.js.map
