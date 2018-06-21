import "deps/hyperhtml";
import showPeople from "./show-people";
import showLink from "./show-link";
import { pub } from "core/pubsubhub";

function getSpecTitleElem (conf) {
  const specTitleElem =
    document.querySelector("h1#title") || document.createElement("h1");
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
    pub("warn", "The document's title and the `<title>` element differ.");
  }
  return specTitleElem;
}

function getSpecSubTitleElem (conf) {
  let specSubTitleElem = document.querySelector("h2#subtitle");
  
  if (specSubTitleElem && specSubTitleElem.parentElement) {
    specSubTitleElem.remove();
    conf.subtitle = specSubTitleElem.textContent.trim();
  } else if (conf.subtitle) {
    specSubTitleElem = document.createElement ("h2");
    specSubTitleElem.textContent = conf.subtitle;
    specSubTitleElem.id = "subtitle";
  }
  if (specSubTitleElem) {
    specSubTitleElem.classList.add ("subtitle");
  }
  return specSubTitleElem;
}

export default conf => {
  const html = hyperHTML;
  
  return html`<div class='head'>
  ${getSpecTitleElem(conf)}
  ${getSpecSubTitleElem(conf)}
  <h2>${conf.textStatus} <time class='dt-published' datetime='${conf.dashDate}'>${conf.publishHumanDate}</time></h2>
  <dl>
    ${!conf.isNoTrack ? html`
      <dt>${conf.l10n.this_version}</dt>
      <dd><a class='u-url' href='${conf.thisVersion}'>${conf.thisVersion}</a></dd>
      <dt>${conf.l10n.latest_published_version}</dt>
      <dd>${conf.latestVersion ? html`<a href='${conf.latestVersion}'>${conf.latestVersion}</a>` : "none"}</dd>
    ` : ""}
    ${conf.edDraftURI ? html`
      <dt>${conf.l10n.latest_editors_draft}</dt>
      <dd><a href='${conf.edDraftURI}'>${conf.edDraftURI}</a></dd>
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
    ${conf.isED ? html`
      ${conf.prevED ? html`
        <dt>Předchozí draft:</dt>
        <dd><a href='${conf.prevED}'>${conf.prevED}</a></dd>
      ` : ""}
    ` : ""}
    ${conf.showPreviousVersion ? html`
      <dt>Předchozí verze:</dt>
      <dd><a href='${conf.prevVersion}'>${conf.prevVersion}</a></dd>
    ` : ""}
    ${conf.prevRecURI ? html`
      ${conf.isRec ? html`
          <dt>Předchozí doporučení:</dt>
          <dd><a href='${conf.prevRecURI}'>${conf.prevRecURI}</a></dd>
      ` : html`
          <dt>Poslední doporučení:</dt>
          <dd><a href='${conf.prevRecURI}'>${conf.prevRecURI}</a></dd>
      `}
    ` : ""}
    <dt>${conf.multipleEditors ? conf.l10n.editors : conf.l10n.editor}</dt>
    ${showPeople(conf, "Editor", conf.editors)}
    ${Array.isArray(conf.formerEditors) && conf.formerEditors.length > 0 ? html`
      <dt>${conf.multipleFormerEditors ? conf.l10n.former_editors : conf.l10n.former_editor}</dt>
      ${showPeople(conf, "Editor", conf.formerEditors)}
    ` : ""}
    ${conf.authors ? html`
      <dt>${conf.multipleAuthors ? conf.l10n.authors : conf.l10n.author}</dt>
      ${showPeople(conf, "Autor", conf.authors)}
    ` : ""}
    ${conf.otherLinks ? conf.otherLinks.map(showLink) : ""}
  </dl>

  <hr title="Separator for header">
</div>`;
}
