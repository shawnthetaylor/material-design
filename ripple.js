const ripple = (function() {
  const rippleSVG = document.querySelectorAll('.js-ripple');

  function rippleAnimation(event, timing) {
    const tlm = new TimelineMax(),
          x = event.offsetX, // distance from pointer to padding edge of target (left to right)
          y = event.offsetY, // distance from pointer to padding edge of target (top to bottom)
          w = event.target.offsetWidth, // width of target + border + padding
          h = event.target.offsetHeight, // height of target + border + padding
          offsetX = Math.abs( (w/2) - x), // distance from click to center of target
          offsetY = Math.abs( (h/2) - y),
          deltaX = (w/2) + offsetX, // distance from click to furthest edge (the min radius needed to cover the target)
          deltaY = (h/2) + offsetY,
          scaleRatio = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)); // Pythagoream theorem to calculate distance to furthest corner of target

    tlm.fromTo(rippleSVG, timing, {
      x: x,
      y: y,
      transformOrigin: '50% 50%',
      scale: 0,
      opacity: 1,
      ease: Linear.easeIn,
    }, {
      scale: scaleRatio,
      opacity: 0
    });
    return tlm;
  }

  return {
    init: function(target, timing) {
      const button = document.getElementById(target);

      button.addEventListener('click', function(event) {
        rippleAnimation.call(this, event, timing);
      });
    }
  };
})();

ripple.init('js-ripple-btn', 0.75);
