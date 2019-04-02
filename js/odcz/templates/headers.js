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
    return _hyperhtml.default`
    <div class="head">
      ${conf.logos.map(_showLogo.default)} ${getSpecTitleElem(conf)}
      ${getSpecSubTitleElem(conf)}
      <h2>
        ${conf.textStatus}
        <time class="dt-published" datetime="${conf.dashDate}"
          >${conf.publishHumanDate}</time
        >
      </h2>
      <dl>
        ${!conf.isNoTrack ? _hyperhtml.default`
              <dt>${conf.l10n.this_version}</dt>
              <dd>
                <a class="u-url" href="${conf.thisVersion}"
                  >${conf.thisVersion}</a
                >
              </dd>
              <dt>${conf.l10n.latest_published_version}</dt>
              <dd>
                ${conf.latestVersion ? _hyperhtml.default`
                      <a href="${conf.latestVersion}">${conf.latestVersion}</a>
                    ` : "none"}
              </dd>
            ` : ""}
        ${conf.edDraftURI ? _hyperhtml.default`
              <dt>${conf.l10n.latest_editors_draft}</dt>
              <dd><a href="${conf.edDraftURI}">${conf.edDraftURI}</a></dd>
            ` : ""}
        ${conf.testSuiteURI ? _hyperhtml.default`
              <dt>Test suite:</dt>
              <dd><a href="${conf.testSuiteURI}">${conf.testSuiteURI}</a></dd>
            ` : ""}
        ${conf.implementationReportURI ? _hyperhtml.default`
              <dt>Implementation report:</dt>
              <dd>
                <a href="${conf.implementationReportURI}"
                  >${conf.implementationReportURI}</a
                >
              </dd>
            ` : ""}
        ${conf.bugTrackerHTML ? _hyperhtml.default`
              <dt>${conf.l10n.bug_tracker}</dt>
              <dd>${[conf.bugTrackerHTML]}</dd>
            ` : ""}
        ${conf.isED && conf.prevED ? _hyperhtml.default`
              <dt>Previous editor's draft:</dt>
              <dd><a href="${conf.prevED}">${conf.prevED}</a></dd>
            ` : ""}
        ${conf.showPreviousVersion ? _hyperhtml.default`
              <dt>Previous version:</dt>
              <dd><a href="${conf.prevVersion}">${conf.prevVersion}</a></dd>
            ` : ""}
        ${!conf.prevRecURI ? "" : conf.isRec ? _hyperhtml.default`
              <dt>Previous Recommendation:</dt>
              <dd><a href="${conf.prevRecURI}">${conf.prevRecURI}</a></dd>
            ` : _hyperhtml.default`
              <dt>Latest Recommendation:</dt>
              <dd><a href="${conf.prevRecURI}">${conf.prevRecURI}</a></dd>
            `}
        <dt>${conf.multipleEditors ? conf.l10n.editors : conf.l10n.editor}</dt>
        ${(0, _showPeople.default)(conf, "Editor", conf.editors)}
        ${Array.isArray(conf.formerEditors) && conf.formerEditors.length > 0 ? _hyperhtml.default`
              <dt>
                ${conf.multipleFormerEditors ? conf.l10n.former_editors : conf.l10n.former_editor}
              </dt>
              ${(0, _showPeople.default)(conf, "Editor", conf.formerEditors)}
            ` : ""}
        ${conf.authors ? _hyperhtml.default`
              <dt>
                ${conf.multipleAuthors ? conf.l10n.authors : conf.l10n.author}
              </dt>
              ${(0, _showPeople.default)(conf, "Author", conf.authors)}
            ` : ""}
        ${conf.otherLinks ? conf.otherLinks.map(_showLink.default) : ""}
      </dl>
      
      <hr title="Separator for header" />
    </div>
  `;
  };
  /**
   * @param {string} text
   * @param {string} url
   * @param {string=} cssClass
   */


  _exports.default = _default;

  function linkLicense(text, url, cssClass) {
    return _hyperhtml.default`
    <a rel="license" href="${url}" class="${cssClass}">${text}</a>
  `;
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