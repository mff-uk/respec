define(["exports", "hyperhtml", "../../core/pubsubhub", "./show-link", "./show-logo", "./show-people"], function (_exports, _hyperhtml, _pubsubhub, _showLink, _showLogo, _showPeople) {
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

  function _templateObject13() {
    const data = _taggedTemplateLiteral(["\n    <a rel=\"license\" href=\"", "\" class=\"", "\">", "</a>\n  "]);

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
    const data = _taggedTemplateLiteral(["\n              <dt>\n                ", "\n              </dt>\n              ", "\n            "]);

    _templateObject11 = function _templateObject11() {
      return data;
    };

    return data;
  }

  function _templateObject10() {
    const data = _taggedTemplateLiteral(["\n              <dt>Posledn\xED doporu\u010Den\xED:</dt>\n              <dd><a href=\"", "\">", "</a></dd>\n            "]);

    _templateObject10 = function _templateObject10() {
      return data;
    };

    return data;
  }

  function _templateObject9() {
    const data = _taggedTemplateLiteral(["\n              <dt>Minul\xE9 doporu\u010Den\xED:</dt>\n              <dd><a href=\"", "\">", "</a></dd>\n            "]);

    _templateObject9 = function _templateObject9() {
      return data;
    };

    return data;
  }

  function _templateObject8() {
    const data = _taggedTemplateLiteral(["\n              <dt>Minul\xE1 verze:</dt>\n              <dd><a href=\"", "\">", "</a></dd>\n            "]);

    _templateObject8 = function _templateObject8() {
      return data;
    };

    return data;
  }

  function _templateObject7() {
    const data = _taggedTemplateLiteral(["\n              <dt>Minul\xFD draft:</dt>\n              <dd><a href=\"", "\">", "</a></dd>\n            "]);

    _templateObject7 = function _templateObject7() {
      return data;
    };

    return data;
  }

  function _templateObject6() {
    const data = _taggedTemplateLiteral(["\n              <dt>", "</dt>\n              <dd>", "</dd>\n            "]);

    _templateObject6 = function _templateObject6() {
      return data;
    };

    return data;
  }

  function _templateObject5() {
    const data = _taggedTemplateLiteral(["\n              <dt>Zpr\xE1va o implementaci:</dt>\n              <dd>\n                <a href=\"", "\"\n                  >", "</a\n                >\n              </dd>\n            "]);

    _templateObject5 = function _templateObject5() {
      return data;
    };

    return data;
  }

  function _templateObject4() {
    const data = _taggedTemplateLiteral(["\n              <dt>Sada test\u016F:</dt>\n              <dd><a href=\"", "\">", "</a></dd>\n            "]);

    _templateObject4 = function _templateObject4() {
      return data;
    };

    return data;
  }

  function _templateObject3() {
    const data = _taggedTemplateLiteral(["\n                      <a href=\"", "\">", "</a>\n                    "]);

    _templateObject3 = function _templateObject3() {
      return data;
    };

    return data;
  }

  function _templateObject2() {
    const data = _taggedTemplateLiteral(["\n              <dt>", "</dt>\n              <dd>\n                <a class=\"u-url\" href=\"", "\"\n                  >", "</a\n                >\n              </dd>\n              <dt>", "</dt>\n              <dd>\n                ", "\n              </dd>\n            "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    const data = _taggedTemplateLiteral(["\n    <div class=\"head\">\n      ", " ", "\n      ", "\n      <h2>\n        ", "\n        <time class=\"dt-published\" datetime=\"", "\"\n          >", "</time\n        >\n      </h2>\n      <dl>\n        ", "\n        ", "\n        ", "\n        ", "\n        ", "\n        ", "\n        ", "\n        <dt>", "</dt>\n        ", "\n        ", "\n        ", "\n        ", "\n      </dl>\n      \n      <hr title=\"Separator for header\" />\n    </div>\n  "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

  const ccLicense = "https://creativecommons.org/licenses/by/3.0/";
  const w3cLicense = "https://www.w3.org/Consortium/Legal/copyright-documents";
  const legalDisclaimer = "https://www.w3.org/Consortium/Legal/ipr-notice#Legal_Disclaimer";
  const w3cTrademark = "https://www.w3.org/Consortium/Legal/ipr-notice#W3C_Trademarks";

  function getSpecTitleElem(conf) {
    const specTitleElem = document.querySelector("h1#title") || document.createElement("h1");

    if (specTitleElem.parentElement) {
      specTitleElem.remove();
      conf.title = specTitleElem.textContent.trim();
    } else {
      specTitleElem.textContent = conf.title;
      specTitleElem.id = "title";
    }

    specTitleElem.classList.add("title", "p-name");

    if (document.querySelector("title") === null) {
      document.title = conf.title;
    } else if (document.title !== conf.title) {
      (0, _pubsubhub.pub)("warn", "The document's title and the `<title>` element differ.");
    }

    return specTitleElem;
  }

  function getSpecSubTitleElem(conf) {
    let specSubTitleElem = document.querySelector("h2#subtitle");

    if (specSubTitleElem && specSubTitleElem.parentElement) {
      specSubTitleElem.remove();
      conf.subtitle = specSubTitleElem.textContent.trim();
    } else if (conf.subtitle) {
      specSubTitleElem = document.createElement("h2");
      specSubTitleElem.textContent = conf.subtitle;
      specSubTitleElem.id = "subtitle";
    }

    if (specSubTitleElem) {
      specSubTitleElem.classList.add("subtitle");
    }

    return specSubTitleElem;
  }

  var _default = conf => {
    return (0, _hyperhtml.default)(_templateObject(), conf.logos.map(_showLogo.default), getSpecTitleElem(conf), getSpecSubTitleElem(conf), conf.textStatus, conf.dashDate, conf.publishHumanDate, !conf.isNoTrack ? (0, _hyperhtml.default)(_templateObject2(), conf.l10n.this_version, conf.thisVersion, conf.thisVersion, conf.l10n.latest_published_version, conf.latestVersion ? (0, _hyperhtml.default)(_templateObject3(), conf.latestVersion, conf.latestVersion) : "none") : "", conf.testSuiteURI ? (0, _hyperhtml.default)(_templateObject4(), conf.testSuiteURI, conf.testSuiteURI) : "", conf.implementationReportURI ? (0, _hyperhtml.default)(_templateObject5(), conf.implementationReportURI, conf.implementationReportURI) : "", conf.bugTrackerHTML ? (0, _hyperhtml.default)(_templateObject6(), conf.l10n.bug_tracker, [conf.bugTrackerHTML]) : "", conf.isED && conf.prevED ? (0, _hyperhtml.default)(_templateObject7(), conf.prevED, conf.prevED) : "", conf.showPreviousVersion ? (0, _hyperhtml.default)(_templateObject8(), conf.prevVersion, conf.prevVersion) : "", !conf.prevRecURI ? "" : conf.isRec ? (0, _hyperhtml.default)(_templateObject9(), conf.prevRecURI, conf.prevRecURI) : (0, _hyperhtml.default)(_templateObject10(), conf.prevRecURI, conf.prevRecURI), conf.multipleEditors ? conf.l10n.editors : conf.l10n.editor, (0, _showPeople.default)(conf.editors), Array.isArray(conf.formerEditors) && conf.formerEditors.length > 0 ? (0, _hyperhtml.default)(_templateObject11(), conf.multipleFormerEditors ? conf.l10n.former_editors : conf.l10n.former_editor, (0, _showPeople.default)(conf.formerEditors)) : "", conf.authors ? (0, _hyperhtml.default)(_templateObject12(), conf.multipleAuthors ? conf.l10n.authors : conf.l10n.author, (0, _showPeople.default)(conf.authors)) : "", conf.otherLinks ? conf.otherLinks.map(_showLink.default) : "");
  };
  /**
   * @param {string} text
   * @param {string} url
   * @param {string=} cssClass
   */


  _exports.default = _default;

  function linkLicense(text, url, cssClass) {
    return (0, _hyperhtml.default)(_templateObject13(), url, cssClass, text);
  }

  function linkDocumentUse(conf) {
    if (conf.isCCBY) {
      return linkLicense("document use", "https://www.w3.org/Consortium/Legal/2013/copyright-documents-dual.html");
    }

    if (conf.isW3CSoftAndDocLicense) {
      return linkLicense("permissive document license", "https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document");
    }

    return linkLicense("document use", w3cLicense);
  }
});
//# sourceMappingURL=headers.js.map