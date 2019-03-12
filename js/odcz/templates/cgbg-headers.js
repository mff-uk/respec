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

  var _default = conf => {
    const html = _hyperhtml.default;
    return html`
    <div class="head">
      ${conf.logos.map(_showLogo.default)}
      <h1 class="title p-name" id="title">${conf.title}</h1>
      ${conf.subtitle ? html`
            <h2 id="subtitle">${conf.subtitle}</h2>
          ` : ""}
      <h2>
        ${conf.longStatus}
        <time class="dt-published" datetime="${conf.dashDate}"
          >${conf.publishHumanDate}</time
        >
      </h2>
      <dl>
        ${conf.thisVersion ? html`
              <dt>${conf.l10n.this_version}</dt>
              <dd>
                <a class="u-url" href="${conf.thisVersion}"
                  >${conf.thisVersion}</a
                >
              </dd>
            ` : ""}
        ${conf.latestVersion ? html`
              <dt>${conf.l10n.latest_published_version}</dt>
              <dd>
                <a href="${conf.latestVersion}">${conf.latestVersion}</a>
              </dd>
            ` : ""}
        ${conf.edDraftURI ? html`
              <dt>${conf.l10n.latest_editors_draft}</dt>
              <dd><a href="${conf.edDraftURI}">${conf.edDraftURI}</a></dd>
            ` : ""}
        ${conf.testSuiteURI ? html`
              <dt>Test suite:</dt>
              <dd><a href="${conf.testSuiteURI}">${conf.testSuiteURI}</a></dd>
            ` : ""}
        ${conf.implementationReportURI ? html`
              <dt>Implementation report:</dt>
              <dd>
                <a href="${conf.implementationReportURI}"
                  >${conf.implementationReportURI}</a
                >
              </dd>
            ` : ""}
        ${conf.bugTrackerHTML ? html`
              <dt>${conf.l10n.bug_tracker}</dt>
              <dd>${[conf.bugTrackerHTML]}</dd>
            ` : ""}
        ${conf.prevVersion ? html`
              <dt>Previous version:</dt>
              <dd><a href="${conf.prevVersion}">${conf.prevVersion}</a></dd>
            ` : ""}
        ${!conf.isCGFinal ? html`
              ${conf.prevED ? html`
                    <dt>Previous editor's draft:</dt>
                    <dd><a href="${conf.prevED}">${conf.prevED}</a></dd>
                  ` : ""}
            ` : ""}
        <dt>${conf.multipleEditors ? conf.l10n.editors : conf.l10n.editor}</dt>
        ${(0, _showPeople.default)(conf, "Editor", conf.editors)}
        ${Array.isArray(conf.formerEditors) && conf.formerEditors.length > 0 ? html`
              <dt>
                ${conf.multipleFormerEditors ? conf.l10n.former_editors : conf.l10n.former_editor}
              </dt>
              ${(0, _showPeople.default)(conf, "Editor", conf.formerEditors)}
            ` : ""}
        ${conf.authors ? html`
              <dt>
                ${conf.multipleAuthors ? conf.l10n.authors : conf.l10n.author}
              </dt>
              ${(0, _showPeople.default)(conf, "Author", conf.authors)}
            ` : ""}
        ${conf.otherLinks ? conf.otherLinks.map(_showLink.default) : ""}
      </dl>
      ${conf.alternateFormats ? html`
            <p>
              ${conf.multipleAlternates ? "This document is also available in these non-normative formats:" : "This document is also available in this non-normative format:"}
              ${[conf.alternatesHTML]}
            </p>
          ` : ""}
      
      <hr title="Separator for header" />
    </div>
  `;
  };

  _exports.default = _default;
});
//# sourceMappingURL=cgbg-headers.js.map