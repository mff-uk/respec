define(["exports", "hyperhtml", "../../core/pubsubhub"], function (_exports, _hyperhtml, _pubsubhub) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _hyperhtml = _interopRequireDefault(_hyperhtml);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  const html = _hyperhtml.default;

  var _default = link => {
    if (!link.key) {
      const msg = "Found a link without `key` attribute in the configuration. See dev console.";
      (0, _pubsubhub.pub)("warn", msg);
      console.warn("warn", msg, link);
      return;
    }

    return html`
    <dt class="${link.class ? link.class : null}">${link.key}:</dt>
    ${link.data ? link.data.map(showLinkData) : showLinkData(link)}
  `;
  };

  _exports.default = _default;

  function showLinkData(data) {
    return html`
    <dd class="${data.class ? data.class : null}">
      ${data.href ? html`
            <a href="${data.href}">${data.value || data.href}</a>
          ` : ""}
    </dd>
  `;
  }
});
//# sourceMappingURL=show-link.js.map