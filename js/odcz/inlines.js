define(["exports", "../core/utils", "hyperhtml", "../core/inline-idl-parser", "../core/pubsubhub", "../core/render-biblio"], function (_exports, _utils, _hyperhtml, _inlineIdlParser, _pubsubhub, _renderBiblio) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.run = run;
  _exports.rfc2119Usage = _exports.name = void 0;
  _hyperhtml = _interopRequireDefault(_hyperhtml);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _templateObject2() {
    const data = _taggedTemplateLiteral(["\n              <abbr title=\"", "\">", "</abbr>"]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    const data = _taggedTemplateLiteral(["<em class=\"rfc2119\" title=\"", "\">", "</em>"]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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
    const abbrRx = aKeys.length ? "(?:\\b".concat(aKeys.join("\\b)|(?:\\b"), "\\b)") : null; // PROCESSING

    const txts = (0, _utils.getTextNodes)(document.body, ["pre"]);
    const rx = new RegExp("(".concat(["\\bMUST(?:\\s+NOT)?\\b", "\\bSHOULD(?:\\s+NOT)?\\b", "\\bSHALL(?:\\s+NOT)?\\b", "\\bMAY\\b", "\\b(?:NOT\\s+)?REQUIRED\\b", "\\b(?:NOT\\s+)?RECOMMENDED\\b", "\\bOPTIONAL\\b", "(?:{{3}\\s*.*\\s*}{3})", // inline IDL references,
    "(?:\\[\\[(?:!|\\\\|\\?)?[A-Za-z0-9\\.-]+\\]\\])", ...(abbrRx ? [abbrRx] : [])].join("|"), ")"));

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
            df.appendChild(hyperHTML(_templateObject(), matched, matched)); // remember which ones were used

            rfc2119Usage[matched] = true;
          } else if (matched.startsWith("{{{")) {
            // External IDL references (xref)
            const ref = matched.replace(/^\{{3}/, "").replace(/\}{3}$/, "").trim();

            if (ref.startsWith("\\")) {
              df.appendChild(document.createTextNode("{{{".concat(ref.replace(/^\\/, ""), "}}}")));
            } else {
              df.appendChild((0, _inlineIdlParser.idlStringToHtml)(ref));
            }
          } else if (matched.startsWith("[[")) {
            // BIBREF
            let ref = matched;
            ref = ref.replace(/^\[\[/, "");
            ref = ref.replace(/\]\]$/, "");

            if (ref.startsWith("\\")) {
              df.appendChild(document.createTextNode("[[".concat(ref.replace(/^\\/, ""), "]]")));
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
                "Normative references in informative sections are not allowed. " + "Remove '!' from the start of the reference `[[!".concat(ref, "]]`"));
              }

              if (type === "informative" && !illegal) {
                conf.informativeReferences.add(cleanRef);
              } else {
                conf.normativeReferences.add(cleanRef);
              }
            }
          } else if (abbrMap.has(matched)) {
            // ABBR
            if (txt.parentElement.tagName === "ABBR") df.appendChild(document.createTextNode(matched));else df.appendChild(hyperHTML(_templateObject2(), abbrMap.get(matched), matched));
          } else {
            // FAIL -- not sure that this can really happen
            (0, _pubsubhub.pub)("error", "Found token '".concat(matched, "' but it does not correspond to anything"));
          }
        }
      }

      txt.parentNode.replaceChild(df, txt);
    }
  }
});
//# sourceMappingURL=inlines.js.map