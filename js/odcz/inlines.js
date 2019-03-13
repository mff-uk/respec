define(["exports", "../core/utils", "hyperhtml", "../core/inline-idl-parser", "../core/pubsubhub", "../core/render-biblio"], function (_exports, _utils, _hyperhtml, _inlineIdlParser, _pubsubhub, _renderBiblio) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.run = run;
  _exports.rfc2119Usage = _exports.name = void 0;
  _hyperhtml = _interopRequireDefault(_hyperhtml);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  // @ts-check
  // Module core/inlines
  // Process all manners of inline information. These are done together despite it being
  // seemingly a better idea to orthogonalise them. The issue is that processing text nodes
  // is harder to orthogonalise, and in some browsers can also be particularly slow.
  // Things that are recognised are <abbr>/<acronym> which when used once are applied
  // throughout the document, [[REFERENCES]]/[[!REFERENCES]], {{{ IDL }}} and RFC2119 keywords.
  // CONFIGURATION:
  //  These options do not configure the behaviour of this module per se, rather this module
  //  manipulates them (oftentimes being the only source to set them) so that other modules
  //  may rely on them.
  //  - normativeReferences: a map of normative reference identifiers.
  //  - informativeReferences: a map of informative reference identifiers.
  //  - respecRFC2119: a list of the number of times each RFC2119
  //    key word was used.  NOTE: While each member is a counter, at this time
  //    the counter is not used.
  const name = "odcz/inlines";
  _exports.name = name;
  const rfc2119Usage = {};
  _exports.rfc2119Usage = rfc2119Usage;

  function run(conf) {
    document.normalize(); //Disabled for ODCZ profile - we only make normative documents

    /*if (!document.querySelector("section#conformance")) {
      // make the document informative
      document.body.classList.add("informative");
    }*/

    if (!conf.normativeReferences) conf.normativeReferences = new Set();
    if (!conf.informativeReferences) conf.informativeReferences = new Set();
    if (!conf.respecRFC2119) conf.respecRFC2119 = rfc2119Usage; // PRE-PROCESSING

    const abbrMap = new Map();
    /** @type {NodeListOf<HTMLElement>} */

    const abbrs = document.querySelectorAll("abbr[title]");

    for (const abbr of abbrs) {
      abbrMap.set(abbr.textContent, abbr.title);
    }

    const aKeys = [...abbrMap.keys()];
    aKeys.sort((a, b) => b.length - a.length);
    const abbrRx = aKeys.length ? `(?:\\b${aKeys.join("\\b)|(?:\\b")}\\b)` : null; // PROCESSING

    const txts = (0, _utils.getTextNodes)(document.body, ["pre"]);
    const rx = new RegExp(`(${["\\bMUST(?:\\s+NOT)?\\b", "\\bSHOULD(?:\\s+NOT)?\\b", "\\bSHALL(?:\\s+NOT)?\\b", "\\bMAY\\b", "\\b(?:NOT\\s+)?REQUIRED\\b", "\\b(?:NOT\\s+)?RECOMMENDED\\b", "\\bOPTIONAL\\b", "(?:{{3}\\s*.*\\s*}{3})", // inline IDL references,
    "(?:\\[\\[(?:!|\\\\|\\?)?[A-Za-z0-9\\.-]+\\]\\])", ...(abbrRx ? [abbrRx] : [])].join("|")})`);

    for (const txt of txts) {
      const subtxt = txt.data.split(rx);
      if (subtxt.length === 1) continue;
      const df = document.createDocumentFragment();

      while (subtxt.length) {
        const t = subtxt.shift();
        let matched = null;
        if (subtxt.length) matched = subtxt.shift();
        df.appendChild(document.createTextNode(t));

        if (matched) {
          // RFC 2119
          if (/MUST(?:\s+NOT)?|SHOULD(?:\s+NOT)?|SHALL(?:\s+NOT)?|MAY|(?:NOT\s+)?REQUIRED|(?:NOT\s+)?RECOMMENDED|OPTIONAL/.test(matched)) {
            matched = matched.split(/\s+/).join(" ");
            df.appendChild(_hyperhtml.default`<em class="rfc2119" title="${matched}">${matched}</em>`); // remember which ones were used

            rfc2119Usage[matched] = true;
          } else if (matched.startsWith("{{{")) {
            // External IDL references (xref)
            const ref = matched.replace(/^\{{3}/, "").replace(/\}{3}$/, "").trim();

            if (ref.startsWith("\\")) {
              df.appendChild(document.createTextNode(`{{{${ref.replace(/^\\/, "")}}}}`));
            } else {
              df.appendChild((0, _inlineIdlParser.idlStringToHtml)(ref));
            }
          } else if (matched.startsWith("[[")) {
            // BIBREF
            let ref = matched;
            ref = ref.replace(/^\[\[/, "");
            ref = ref.replace(/\]\]$/, "");

            if (ref.startsWith("\\")) {
              df.appendChild(document.createTextNode(`[[${ref.replace(/^\\/, "")}]]`));
            } else {
              const {
                type,
                illegal
              } = (0, _utils.refTypeFromContext)(ref, txt.parentNode);
              const cite = (0, _renderBiblio.renderInlineCitation)(ref);
              const cleanRef = ref.replace(/^(!|\?)/, "");
              df.append(...cite.childNodes);

              if (illegal && !conf.normativeReferences.has(cleanRef)) {
                (0, _utils.showInlineWarning)(cite.childNodes[1], // cite element
                "Normative references in informative sections are not allowed. " + `Remove '!' from the start of the reference \`[[!${ref}]]\``);
              }

              if (type === "informative" && !illegal) {
                conf.informativeReferences.add(cleanRef);
              } else {
                conf.normativeReferences.add(cleanRef);
              }
            }
          } else if (abbrMap.has(matched)) {
            // ABBR
            if (txt.parentElement.tagName === "ABBR") df.appendChild(document.createTextNode(matched));else df.appendChild(_hyperhtml.default`
              <abbr title="${abbrMap.get(matched)}">${matched}</abbr>`);
          } else {
            // FAIL -- not sure that this can really happen
            (0, _pubsubhub.pub)("error", `Found token '${matched}' but it does not correspond to anything`);
          }
        }
      }

      txt.parentNode.replaceChild(df, txt);
    }
  }
});
//# sourceMappingURL=inlines.js.map