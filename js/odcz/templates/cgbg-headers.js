define(["exports", "./show-people", "./show-link", "deps/hyperhtml"], function (exports, _showPeople, _showLink) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _showPeople2 = _interopRequireDefault(_showPeople);

  var _showLink2 = _interopRequireDefault(_showLink);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = conf => {
    const html = hyperHTML;
    return html`<div class='head'>
  <h1 class='title p-name' id='title'>${conf.title}</h1>
  ${conf.subtitle ? html`
    <h2 id='subtitle'>${conf.subtitle}</h2>
  ` : ""}
  <h2>${conf.longStatus} <time class='dt-published' datetime='${conf.dashDate}'>${conf.publishHumanDate}</time></h2>
  <dl>
    ${conf.thisVersion ? html`
      <dt>${conf.l10n.this_version}</dt>
      <dd><a class='u-url' href='${conf.thisVersion}'>${conf.thisVersion}</a></dd>
    ` : ""}
    ${conf.latestVersion ? html`
      <dt>${conf.l10n.latest_published_version}</dt>
      <dd><a href='${conf.latestVersion}'>${conf.latestVersion}</a></dd>
    ` : ""}
    ${conf.testSuiteURI ? html`
      <dt>Test suite:</dt>
      <dd><a href='${conf.testSuiteURI}'>${conf.testSuiteURI}</a></dd>
    ` : ""}
    ${conf.implementationReportURI ? html`
      <dt>Implementation report:</dt>
      <dd><a href='${conf.implementationReportURI}'>${conf.implementationReportURI}</a></dd>
    ` : ""}
    ${conf.bugTrackerHTML ? html`
      <dt>${conf.l10n.bug_tracker}</dt>
      <dd>${[conf.bugTrackerHTML]}</dd>
    ` : ""}
    ${conf.prevVersion ? html`
      <dt>Předchozí verze:</dt>
      <dd><a href='${conf.prevVersion}'>${conf.prevVersion}</a></dd>
    ` : ""}
    ${!conf.isCGFinal ? html`
      ${conf.prevED ? html`
        <dt>Previous editor's draft:</dt>
        <dd><a href='${conf.prevED}'>${conf.prevED}</a></dd>
      ` : ""}
    ` : ""}
    <dt>${conf.multipleEditors ? conf.l10n.editors : conf.l10n.editor}</dt>
    ${(0, _showPeople2.default)(conf, "Editor", conf.editors)}
    ${Array.isArray(conf.formerEditors) && conf.formerEditors.length > 0 ? html`
      <dt>${conf.multipleFormerEditors ? conf.l10n.former_editors : conf.l10n.former_editor}</dt>
      ${(0, _showPeople2.default)(conf, "Editor", conf.formerEditors)}
    ` : ""}
    ${conf.authors ? html`
      <dt>${conf.multipleAuthors ? conf.l10n.authors : conf.l10n.author}</dt>
      ${(0, _showPeople2.default)(conf, "Author", conf.authors)}
    ` : ""}
    ${conf.otherLinks ? conf.otherLinks.map(_showLink2.default) : ""}
  </dl>
  <hr title="Separator for header">
</div>`;
  };
});
//# sourceMappingURL=cgbg-headers.js.map