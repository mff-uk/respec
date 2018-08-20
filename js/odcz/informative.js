define(["exports", "deps/hyperhtml"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.name = undefined;
  exports.run = run;
  const name = exports.name = "odcz/informative"; // Module odcz/informative
  // Mark specific sections as informative, based on CSS
  function run() {
    Array.from(document.querySelectorAll("section.informative")).map(informative => informative.querySelector("h2, h3, h4, h5, h6")).filter(heading => heading).forEach(heading => {
      heading.parentNode.insertBefore(hyperHTML`<p><em>Tato sekce není normativní.</em></p>`, heading.nextSibling);
    });
  }
});
//# sourceMappingURL=informative.js.map