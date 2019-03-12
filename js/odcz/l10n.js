define(["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.run = run;
  _exports.lang = _exports.l10n = _exports.name = void 0;

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  /**
   * Module odcz/l10n
   *
   * Looks at the lang attribute on the root element and uses it
   * to manage the config.l10n object so that other parts of the system can
   * localize their text.
   */
  const name = "../odcz/l10n";
  _exports.name = name;
  const html = document.documentElement;

  if (html && !html.hasAttribute("lang")) {
    html.lang = "en";

    if (!html.hasAttribute("dir")) {
      html.dir = "ltr";
    }
  } // We use en-US as the base


  const base = {
    about_respec: "About",
    abstract: "Abstract",
    author: "Author:",
    authors: "Authors:",
    bug_tracker: "Bug tracker:",
    close_parens: ")",
    commit_history: "Commit history",
    definition_list: "Definitions",
    editor: "Editor:",
    editors_note: "Editor's note",
    editors: "Editors:",
    example: "Example",
    feature_at_risk: "Feature at Risk",
    fig: "Figure ",
    file_a_bug: "File a bug",
    former_editor: "Former editor:",
    former_editors: "Former editors:",
    info_references: "Informative references",
    issue_summary: "Issue Summary",
    issue: "Issue",
    latest_editors_draft: "Latest editor's draft:",
    latest_published_version: "Latest published version:",
    list_of_definitions: "List of Definitions",
    norm_references: "Normative references",
    note: "Note",
    open_bugs: "open bugs",
    open_parens: "(",
    participate: "Participate",
    pull_requests: "Pull requests",
    references: "References",
    save_as: "Save as",
    save_snapshot: "Export",
    search_specref: "Search Specref",
    sotd: "Status of This Document",
    table_of_fig: "Table of Figures",
    this_version: "This version:",
    toc: "Table of Contents",
    warning: "Warning"
  };
  const ko = {
    abstract: "요약",
    author: "저자:",
    authors: "저자:",
    fig: "그림 ",
    latest_published_version: "최신 버전:",
    sotd: "현재 문서의 상태",
    this_version: "현재 버전:"
  };
  const zh = {
    abstract: "摘要",
    bug_tracker: "错误跟踪：",
    editor: "编辑：",
    editors: "编辑们：",
    fig: "圖",
    file_a_bug: "反馈错误",
    latest_editors_draft: "最新编辑草稿：",
    latest_published_version: "最新发布草稿：",
    note: "注",
    open_bugs: "修正中的错误",
    sotd: "关于本文档",
    this_version: "本版本：",
    toc: "内容大纲"
  };
  const ja = {
    abstract: "要約",
    author: "著者：",
    authors: "著者：",
    bug_tracker: "バグの追跡履歴：",
    editor: "編者：",
    editors: "編者：",
    fig: "図",
    latest_editors_draft: "最新の編集用草案：",
    latest_published_version: "最新バージョン：",
    note: "注",
    open_bugs: "改修されていないバグ",
    sotd: "この文書の位置付け",
    this_version: "このバージョン：",
    toc: "目次"
  };
  const nl = {
    about_respec: "Over",
    abstract: "Samenvatting",
    author: "Auteur:",
    authors: "Auteurs:",
    bug_tracker: "Meldingensysteem:",
    commit_history: "Revisiehistorie",
    definition_list: "Lijst van Definities",
    editor: "Redacteur:",
    editors_note: "Redactionele noot",
    editors: "Redacteurs:",
    example: "Voorbeeld",
    fig: "Figuur ",
    file_a_bug: "Dien een melding in",
    info_references: "Informatieve referenties",
    issue_summary: "Lijst met issues",
    latest_editors_draft: "Laatste werkversie:",
    latest_published_version: "Laatst gepubliceerde versie:",
    list_of_definitions: "Lijst van Definities",
    norm_references: "Normatieve referenties",
    note: "Noot",
    open_bugs: "open meldingen",
    participate: "Doe mee",
    references: "Referenties",
    save_as: "Bewaar als",
    save_snapshot: "Bewaar Snapshot",
    search_specref: "Doorzoek Specref",
    sotd: "Status van dit document",
    table_of_fig: "Lijst met figuren",
    this_version: "Deze versie:",
    toc: "Inhoudsopgave",
    warning: "Waarschuwing"
  };
  const es = {
    abstract: "Resumen",
    author: "Autor:",
    authors: "Autores:",
    bug_tracker: "Repositorio de bugs:",
    close_parens: ")",
    commit_history: "Historia de cambios",
    editor: "Editor:",
    editors_note: "Nota de editor",
    editors: "Editores:",
    example: "Ejemplo",
    fig: "Figura ",
    file_a_bug: "Nota un bug",
    info_references: "Referencias informativas",
    issue_summary: "Resumen de la cuestión",
    issue: "Cuestión",
    latest_editors_draft: "Borrador de editor mas reciente:",
    latest_published_version: "Versión publicada mas reciente:",
    norm_references: "Referencias normativas",
    note: "Nota",
    open_bugs: "Bugs abiertos",
    open_parens: "(",
    participate: "Participad",
    references: "Referencias",
    sotd: "Estado de este Document",
    table_of_fig: "Tabla de Figuras",
    this_version: "Ésta versión:",
    toc: "Tabla de Contenidos",
    warning: "Aviso"
  };
  const cs = {
    about_respec: "O ReSpec",
    abstract: "Abstrakt",
    author: "Autor:",
    authors: "Autoři:",
    bug_tracker: "Bug tracker:",
    close_parens: ")",
    commit_history: "Historie commitů",
    definition_list: "Definice",
    editor: "Editor:",
    editors_note: "Poznámka editora",
    editors: "Editoři:",
    example: "Příklad",
    feature_at_risk: "Fíčura v ohrožení",
    fig: "Obraz ",
    file_a_bug: "Nahlaste bug",
    former_editor: "Bývalý editor:",
    former_editors: "Bývalí editoři:",
    info_references: "Informativní reference",
    issue_summary: "Souhrn issues",
    issue: "Issue",
    latest_editors_draft: "Nejnovější draft editora:",
    latest_published_version: "Nejnovější verze:",
    list_of_definitions: "Seznam definic",
    norm_references: "Normativní reference",
    note: "Poznámka",
    open_bugs: "známé bugy",
    open_parens: "(",
    participate: "Zúčastněte se",
    pull_requests: "Pull requesty",
    references: "Reference",
    save_as: "Uložit jako",
    save_snapshot: "Export",
    search_specref: "Hledat v Specref",
    sotd: "Stav tohoto dokumentu",
    table_of_fig: "Seznam obrazů",
    this_version: "Tato verze:",
    toc: "Obsah",
    warning: "Varování"
  };
  const l10n = {
    en: _objectSpread({}, base),
    ko: _objectSpread({}, base, ko),
    zh: _objectSpread({}, base, zh),
    ja: _objectSpread({}, base, ja),
    nl: _objectSpread({}, base, nl),
    es: _objectSpread({}, base, es),
    cs: _objectSpread({}, base, cs)
  };
  _exports.l10n = l10n;
  l10n["zh-hans"] = l10n.zh;
  l10n["zh-cn"] = l10n.zh;
  const lang = html && html.lang in l10n ? html.lang : "en";
  _exports.lang = lang;

  function run(config) {
    config.l10n = l10n[lang] || l10n.en;
  }
});
//# sourceMappingURL=l10n.js.map