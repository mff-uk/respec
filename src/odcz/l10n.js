/**
 * Module core/l10n
 *
 * Looks at the lang attribute on the root element and uses it
 * to manage the config.l10n object so that other parts of the system can
 * localize their text.
 */
export const name = "core/l10n";

const html = document.documentElement;
if (html && !html.hasAttribute("lang")) {
  html.lang = "en";
  if (!html.hasAttribute("dir")) {
    html.dir = "ltr";
  }
}

// We use en-US as the base
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
  warning: "Warning",
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
  latest_published_version: "Nejnovější publikovaná verze:",
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
  warning: "Varování",
};

export const l10n = {
  en: { ...base },
  cs: { ...base, ...cs }
};

export const lang = html && html.lang in l10n ? html.lang : "en";

export function run(config) {
  config.l10n = l10n[lang] || l10n.en;
}
