define(["exports", "hyperhtml", "./show-link", "./show-logo", "./show-people"], function (_exports, _hyperhtml, _showLink, _showLogo, _showPeople) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _hyperhtml = _interopRequireDefault(_hyperhtml);
  _showLink = _interopRequireDefault(_showLink);
  _showLogo = _interopRequireDefault(_showLogo);
  _showPeople = _interopRequireDefault(_showPeople);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _templateObject14() {
    const data = _taggedTemplateLiteral(["\n            <p>\n              ", "\n              ", "\n            </p>\n          "]);

    _templateObject14 = function _templateObject14() {
      return data;
    };

    return data;
  }

  function _templateObject13() {
    const data = _taggedTemplateLiteral(["\n              <dt>\n                ", "\n              </dt>\n              ", "\n            "]);

    _templateObject13 = function _templateObject13() {
      return data;
    };

    return data;
  }

  function _templateObject12() {
    const data = _taggedTemplateLiteral(["\n              <dt>\n                ", "\n              </dt>\n              ", "\n            "]);

    _templateObject12 = function _templateObject12() {
      return data;
    };

    return data;
  }

  function _templateObject11() {
    const data = _taggedTemplateLiteral(["\n                    <dt>Previous editor's draft:</dt>\n                    <dd><a href=\"", "\">", "</a></dd>\n                  "]);

    _templateObject11 = function _templateObject11() {
      return data;
    };

    return data;
  }

  function _templateObject10() {
    const data = _taggedTemplateLiteral(["\n              ", "\n            "]);

    _templateObject10 = function _templateObject10() {
      return data;
    };

    return data;
  }

  function _templateObject9() {
    const data = _taggedTemplateLiteral(["\n              <dt>Previous version:</dt>\n              <dd><a href=\"", "\">", "</a></dd>\n            "]);

    _templateObject9 = function _templateObject9() {
      return data;
    };

    return data;
  }

  function _templateObject8() {
    const data = _taggedTemplateLiteral(["\n              <dt>", "</dt>\n              <dd>", "</dd>\n            "]);

    _templateObject8 = function _templateObject8() {
      return data;
    };

    return data;
  }

  function _templateObject7() {
    const data = _taggedTemplateLiteral(["\n              <dt>Implementation report:</dt>\n              <dd>\n                <a href=\"", "\"\n                  >", "</a\n                >\n              </dd>\n            "]);

    _templateObject7 = function _templateObject7() {
      return data;
    };

    return data;
  }

  function _templateObject6() {
    const data = _taggedTemplateLiteral(["\n              <dt>Test suite:</dt>\n              <dd><a href=\"", "\">", "</a></dd>\n            "]);

    _templateObject6 = function _templateObject6() {
      return data;
    };

    return data;
  }

  function _templateObject5() {
    const data = _taggedTemplateLiteral(["\n              <dt>", "</dt>\n              <dd><a href=\"", "\">", "</a></dd>\n            "]);

    _templateObject5 = function _templateObject5() {
      return data;
    };

    return data;
  }

  function _templateObject4() {
    const data = _taggedTemplateLiteral(["\n              <dt>", "</dt>\n              <dd>\n                <a href=\"", "\">", "</a>\n              </dd>\n            "]);

    _templateObject4 = function _templateObject4() {
      return data;
    };

    return data;
  }

  function _templateObject3() {
    const data = _taggedTemplateLiteral(["\n              <dt>", "</dt>\n              <dd>\n                <a class=\"u-url\" href=\"", "\"\n                  >", "</a\n                >\n              </dd>\n            "]);

    _templateObject3 = function _templateObject3() {
      return data;
    };

    return data;
  }

  function _templateObject2() {
    const data = _taggedTemplateLiteral(["\n            <h2 id=\"subtitle\">", "</h2>\n          "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    const data = _taggedTemplateLiteral(["\n    <div class=\"head\">\n      ", "\n      <h1 class=\"title p-name\" id=\"title\">", "</h1>\n      ", "\n      <h2>\n        ", "\n        <time class=\"dt-published\" datetime=\"", "\"\n          >", "</time\n        >\n      </h2>\n      <dl>\n        ", "\n        ", "\n        ", "\n        ", "\n        ", "\n        ", "\n        ", "\n        ", "\n        <dt>", "</dt>\n        ", "\n        ", "\n        ", "\n        ", "\n      </dl>\n      ", "\n      \n      <hr title=\"Separator for header\" />\n    </div>\n  "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

  var _default = conf => {
    const html = hyperHTML;
    return html(_templateObject(), conf.logos.map(_showLogo.default), conf.title, conf.subtitle ? html(_templateObject2(), conf.subtitle) : "", conf.longStatus, conf.dashDate, conf.publishHumanDate, conf.thisVersion ? html(_templateObject3(), conf.l10n.this_version, conf.thisVersion, conf.thisVersion) : "", conf.latestVersion ? html(_templateObject4(), conf.l10n.latest_published_version, conf.latestVersion, conf.latestVersion) : "", conf.edDraftURI ? html(_templateObject5(), conf.l10n.latest_editors_draft, conf.edDraftURI, conf.edDraftURI) : "", conf.testSuiteURI ? html(_templateObject6(), conf.testSuiteURI, conf.testSuiteURI) : "", conf.implementationReportURI ? html(_templateObject7(), conf.implementationReportURI, conf.implementationReportURI) : "", conf.bugTrackerHTML ? html(_templateObject8(), conf.l10n.bug_tracker, [conf.bugTrackerHTML]) : "", conf.prevVersion ? html(_templateObject9(), conf.prevVersion, conf.prevVersion) : "", !conf.isCGFinal ? html(_templateObject10(), conf.prevED ? html(_templateObject11(), conf.prevED, conf.prevED) : "") : "", conf.multipleEditors ? conf.l10n.editors : conf.l10n.editor, (0, _showPeople.default)(conf.editors), Array.isArray(conf.formerEditors) && conf.formerEditors.length > 0 ? html(_templateObject12(), conf.multipleFormerEditors ? conf.l10n.former_editors : conf.l10n.former_editor, (0, _showPeople.default)(conf.formerEditors)) : "", conf.authors ? html(_templateObject13(), conf.multipleAuthors ? conf.l10n.authors : conf.l10n.author, (0, _showPeople.default)(conf.authors)) : "", conf.otherLinks ? conf.otherLinks.map(_showLink.default) : "", conf.alternateFormats ? html(_templateObject14(), conf.multipleAlternates ? "This document is also available in these non-normative formats:" : "This document is also available in this non-normative format:", [conf.alternatesHTML]) : "");
  };

  _exports.default = _default;
});
//# sourceMappingURL=cgbg-headers.js.map