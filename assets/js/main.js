(function () {
  function lazyloadRunObserver() {
    var lazyloadBackgrounds = document.querySelectorAll(".e-con.e-parent:not(.e-lazyloaded)");
    var lazyloadBackgroundObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var lazyloadBackground = entry.target;
            if (lazyloadBackground) {
              lazyloadBackground.classList.add("e-lazyloaded");
            }
            lazyloadBackgroundObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "200px 0px 200px 0px" }
    );
    lazyloadBackgrounds.forEach(function (el) {
      lazyloadBackgroundObserver.observe(el);
    });
  }

  ["DOMContentLoaded", "elementor/lazyload/observe"].forEach(function (ev) {
    document.addEventListener(ev, lazyloadRunObserver);
  });
})();
