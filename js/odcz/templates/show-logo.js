define(["exports", "hyperhtml", "../../core/utils"], function (_exports, _hyperhtml, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _hyperhtml = _interopRequireDefault(_hyperhtml);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var _default = obj => {
    const a = document.createElement("a");

    if (!obj.alt) {
      (0, _utils.showInlineWarning)(a, "Found spec logo without an `alt` attribute");
    }

    a.href = obj.url || "";
    a.classList.add("logo");
    _hyperhtml.default.bind(a)`
      <img
        id="${obj.id}"
        alt="${obj.alt}"
        width="${obj.width}"
        height="${obj.height}">
  `; // avoid triggering 404 requests from dynamically generated
    // hyperHTML attribute values

    a.querySelector("img").src = obj.src;
    return a;
  };

  _exports.default = _default;
});
//# sourceMappingURL=show-logo.js.map