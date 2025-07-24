(function () {
  var skewTitle = document.querySelector(".skew-title");
  var spans = skewTitle ? skewTitle.querySelectorAll("span") : [];

  spans.forEach(function (span, index) {
    span.addEventListener("mouseenter", function () {
      span.classList.add("flat");
      if ((index + 1) % 2 === 0) {
        if (span.previousElementSibling) {
          span.previousElementSibling.classList.add("flat");
        }
      } else {
        if (!span.classList.contains("last") && span.nextElementSibling) {
          span.nextElementSibling.classList.add("flat");
        }
      }
    });

    span.addEventListener("mouseleave", function () {
      document.querySelectorAll(".flat").forEach(function (el) {
        el.classList.remove("flat");
      });
    });
  });
})();
