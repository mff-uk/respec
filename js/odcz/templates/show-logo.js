define(["exports", "hyperhtml", "../../core/utils"], function (_exports, _hyperhtml, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _hyperhtml = _interopRequireDefault(_hyperhtml);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _templateObject2() {
    const data = _taggedTemplateLiteral(["\n    <img\n      id=\"", "\"\n      alt=\"", "\"\n      width=\"", "\"\n      height=\"", "\"\n    />\n  "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    const data = _taggedTemplateLiteral(["\n    <a href=\"", "\" class=\"logo\"></a>\n  "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

  var _default = obj => {
    /** @type {HTMLAnchorElement} */
    const a = (0, _hyperhtml.default)(_templateObject(), obj.url || "");

    if (!obj.alt) {
      (0, _utils.showInlineWarning)(a, "Found spec logo without an `alt` attribute");
    }
    /** @type {HTMLImageElement} */


    const img = (0, _hyperhtml.default)(_templateObject2(), obj.id, obj.alt, obj.width, obj.height); // avoid triggering 404 requests from dynamically generated
    // hyperHTML attribute values

    img.src = obj.src;
    a.append(img);
    return a;
  };

  _exports.default = _default;
});
//# sourceMappingURL=show-logo.js.map