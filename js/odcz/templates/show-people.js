define(["exports", "hyperhtml"], function (_exports, _hyperhtml) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _hyperhtml = _interopRequireDefault(_hyperhtml);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _templateObject10() {
    const data = _taggedTemplateLiteral(["\n        <a href=\"", "\"></a>\n      "]);

    _templateObject10 = function _templateObject10() {
      return data;
    };

    return data;
  }

  function _templateObject9() {
    const data = _taggedTemplateLiteral(["\n      <span class=\"", "\"></span>\n    "]);

    _templateObject9 = function _templateObject9() {
      return data;
    };

    return data;
  }

  function _templateObject8() {
    const data = _taggedTemplateLiteral(["", ""]);

    _templateObject8 = function _templateObject8() {
      return data;
    };

    return data;
  }

  function _templateObject7() {
    const data = _taggedTemplateLiteral(["\n            (", ")\n          "]);

    _templateObject7 = function _templateObject7() {
      return data;
    };

    return data;
  }

  function _templateObject6() {
    const data = _taggedTemplateLiteral(["\n            (<a class=\"p-org org h-org h-card\" href=\"", "\"\n              >", "</a\n            >)\n          "]);

    _templateObject6 = function _templateObject6() {
      return data;
    };

    return data;
  }

  function _templateObject5() {
    const data = _taggedTemplateLiteral(["\n          <a class=\"p-name orcid\" href=\"", "\"\n            ><svg\n              width=\"16\"\n              height=\"16\"\n              xmlns=\"http://www.w3.org/2000/svg\"\n              viewBox=\"0 0 256 256\"\n            >\n              <style>\n                .st1 {\n                  fill: #fff;\n                }\n              </style>\n              <path\n                d=\"M256 128c0 70.7-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0s128 57.3 128 128z\"\n                fill=\"#a6ce39\"\n              />\n              <path\n                class=\"st1\"\n                d=\"M86.3 186.2H70.9V79.1h15.4v107.1zM108.9 79.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-21.5 53.6-56.8 53.6h-41.8V79.1zm15.4 93.3h24.5c34.9 0 42.9-26.5 42.9-39.7C191.7 111.2 178 93 148 93h-23.7v79.4zM88.7 56.8c0 5.5-4.5 10.1-10.1 10.1s-10.1-4.6-10.1-10.1c0-5.6 4.5-10.1 10.1-10.1s10.1 4.6 10.1 10.1z\"\n              /></svg\n          ></a>\n        "]);

    _templateObject5 = function _templateObject5() {
      return data;
    };

    return data;
  }

  function _templateObject4() {
    const data = _taggedTemplateLiteral(["\n          <span class=\"p-name fn\">", "</span>\n        "]);

    _templateObject4 = function _templateObject4() {
      return data;
    };

    return data;
  }

  function _templateObject3() {
    const data = _taggedTemplateLiteral(["\n        <a class=\"u-url url p-name fn\" href=\"", "\">", "</a>\n      "]);

    _templateObject3 = function _templateObject3() {
      return data;
    };

    return data;
  }

  function _templateObject2() {
    const data = _taggedTemplateLiteral(["\n        <a class=\"ed_mailto u-email email p-name\" href=\"", "\"\n          >", "</a\n        >\n      "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    const data = _taggedTemplateLiteral(["\n      <dd class=\"p-author h-card vcard\" data-editor-id=\"", "\"></dd>\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

  var _default = (items = []) => {
    return items.map(getItem);

    function getItem(p) {
      const personName = [p.name]; // treated as opt-in HTML by hyperHTML

      const company = [p.company];
      const editorid = p.w3cid ? parseInt(p.w3cid, 10) : null;
      /** @type {HTMLElement} */

      const dd = (0, _hyperhtml.default)(_templateObject(), editorid);
      const span = document.createDocumentFragment();
      const contents = [];

      if (p.mailto) {
        contents.push((0, _hyperhtml.default)(_templateObject2(), "mailto:".concat(p.mailto), personName));
      } else if (p.url) {
        contents.push((0, _hyperhtml.default)(_templateObject3(), p.url, personName));
      } else {
        contents.push((0, _hyperhtml.default)(_templateObject4(), personName));
      }

      if (p.orcid) {
        contents.push((0, _hyperhtml.default)(_templateObject5(), p.orcid));
      }

      if (p.company) {
        if (p.companyURL) {
          contents.push((0, _hyperhtml.default)(_templateObject6(), p.companyURL, company));
        } else {
          contents.push((0, _hyperhtml.default)(_templateObject7(), company));
        }
      }

      if (p.note) contents.push(document.createTextNode(" (".concat(p.note, ")")));

      if (p.extras) {
        const results = p.extras // Remove empty names
        .filter(extra => extra.name && extra.name.trim()) // Convert to HTML
        .map(getExtra);

        for (const result of results) {
          contents.push(document.createTextNode(", "), result);
        }
      }

      _hyperhtml.default.bind(span)(_templateObject8(), contents);

      dd.appendChild(span);
      return dd;
    }

    function getExtra(extra) {
      const span = (0, _hyperhtml.default)(_templateObject9(), extra.class || null);
      let textContainer = span;

      if (extra.href) {
        textContainer = (0, _hyperhtml.default)(_templateObject10(), extra.href);
        span.appendChild(textContainer);
      }

      textContainer.textContent = extra.name;
      return span;
    }
  };

  _exports.default = _default;
});
//# sourceMappingURL=show-people.js.map