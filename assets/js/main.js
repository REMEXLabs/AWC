(function (w, d, Component, Components, undefined) {
  d.addEventListener("DOMContentLoaded", function (loadEvent) {

    let events = d.getElementsByClassName('event');
    for (let idx = 0, l = events.length; idx < l; idx++) {
      let e = events[idx];
      let code = e.getElementsByTagName('code')[0].getAttribute('data-js');
      e.getElementsByTagName('button')[0].addEventListener('click', function (ev) {
        eval(code);
      });
    }

  });
})(window, document, Component, Components);

$(function () {
  $('#sidebar').affix({
    offset: {
      top: 393
    }
  });
});
