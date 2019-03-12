define(["exports", "hyperhtml"], function (_exports, _hyperhtml) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.run = run;
  _exports.name = void 0;
  _hyperhtml = _interopRequireDefault(_hyperhtml);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  // Module odcz/informative
  // Mark specific sections as informative, based on CSS
  const name = "odcz/informative";
  _exports.name = name;

  function run() {
    Array.from(document.querySelectorAll("section.informative")).map(informative => informative.querySelector("h2, h3, h4, h5, h6")).filter(heading => heading).forEach(heading => {
      heading.after(_hyperhtml.default`<p><em>Tato sekce není normativní.</em></p>`);
    });
  }
});
//# sourceMappingURL=informative.js.map