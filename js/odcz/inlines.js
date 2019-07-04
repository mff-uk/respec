define(["exports", "../core/utils", "hyperhtml", "../core/inline-idl-parser", "../core/render-biblio"], function (_exports, _utils, _hyperhtml, _inlineIdlParser, _renderBiblio) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.run = run;
  _exports.rfc2119Usage = _exports.name = void 0;
  _hyperhtml = _interopRequireDefault(_hyperhtml);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _templateObject8() {
    const data = _taggedTemplateLiteral(["<code>", "</code>"]);

    _templateObject8 = function _templateObject8() {
      return data;
    };

    return data;
  }

  function _templateObject7() {
    const data = _taggedTemplateLiteral(["<a data-link-for=\"", "\" data-xref-for=\"", "\">", "</a>"]);

    _templateObject7 = function _templateObject7() {
      return data;
    };

    return data;
  }

  function _templateObject6() {
    const data = _taggedTemplateLiteral(["<var data-type=\"", "\">", "</var>"]);

    _templateObject6 = function _templateObject6() {
      return data;
    };

    return data;
  }

  function _templateObject5() {
    const data = _taggedTemplateLiteral(["<abbr title=\"", "\">", "</abbr>"]);

    _templateObject5 = function _templateObject5() {
      return data;
    };

    return data;
  }

  function _templateObject4() {
    const data = _taggedTemplateLiteral(["<span>", "</span>"]);

    _templateObject4 = function _templateObject4() {
      return data;
    };

    return data;
  }

  function _templateObject3() {
    const data = _taggedTemplateLiteral(["<a href=\"", "\"></a>"]);

    _templateObject3 = function _templateObject3() {
      return data;
    };

    return data;
  }

  function _templateObject2() {
    const data = _taggedTemplateLiteral(["<a data-cite=\"", "\"></a>"]);

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
  const rfc2119Usage = {}; // Inline `code`
  // TODO: Replace (?!`) at the end with (?:<!`) at the start when Firefox + Safari
  // add support.

  _exports.rfc2119Usage = rfc2119Usage;
  const inlineCodeRegExp = /(?:`[^`]+`)(?!`)/; // `code`

  const inlineIdlReference = /(?:{{[^}]+}})/; // {{ WebIDLThing }}

  const inlineVariable = /\B\|\w[\w\s]*(?:\s*:[\w\s&;<>]+)?\|\B/; // |var : Type|

  const inlineCitation = /(?:\[\[(?:!|\\|\?)?[A-Za-z0-9.-]+\]\])/; // [[citation]]

  const inlineExpansion = /(?:\[\[\[(?:!|\\|\?)?#?[\w-.]+\]\]\])/; // [[[expand]]]

  const inlineAnchor = /(?:\[=[^=]+=\])/; // Inline [= For/link =]

  /**
   * @param {string} matched
   * @return {HTMLElement}
   */

  function inlineRFC2119Matches(matched) {
    const normalize = matched.split(/\s+/).join(" ");
    const nodeElement = (0, _hyperhtml.default)(_templateObject(), normalize, normalize); // remember which ones were used

    rfc2119Usage[normalize] = true;
    return nodeElement;
  }
  /**
   * @param {string} matched
   * @return {HTMLElement}
   */


  function inlineRefMatches(matched) {
    // slices "[[[" at the beginning and "]]]" at the end
    const ref = matched.slice(3, -3).trim();

    if (!ref.startsWith("#")) {
      return (0, _hyperhtml.default)(_templateObject2(), ref);
    }

    if (document.querySelector(ref)) {
      return (0, _hyperhtml.default)(_templateObject3(), ref);
    }

    const badReference = (0, _hyperhtml.default)(_templateObject4(), matched);
    (0, _utils.showInlineError)(badReference, // cite element
    "Wasn't able to expand ".concat(matched, " as it didn't match any id in the document."), "Please make sure there is element with id ".concat(ref, " in the document."));
    return badReference;
  }
  /**
   * @param {string} matched
   */


  function inlineXrefMatches(matched) {
    // slices "{{" at the beginning and "}}" at the end
    const ref = matched.slice(2, -2).trim();
    return ref.startsWith("\\") ? matched.replace("\\", "") : (0, _inlineIdlParser.idlStringToHtml)(ref);
  }
  /**
   * @param {string} matched
   * @param {Text} txt
   * @param {Object} conf
   * @return {Iterable<string | Node>}
   */


  function inlineBibrefMatches(matched, txt, conf) {
    // slices "[[" at the start and "]]" at the end
    const ref = matched.slice(2, -2);

    if (ref.startsWith("\\")) {
      return ["[[".concat(ref.slice(1), "]]")];
    }

    const {
      type,
      illegal
    } = (0, _utils.refTypeFromContext)(ref, txt.parentNode);
    const cite = (0, _renderBiblio.renderInlineCitation)(ref);
    const cleanRef = ref.replace(/^(!|\?)/, "");

    if (illegal && !conf.normativeReferences.has(cleanRef)) {
      (0, _utils.showInlineWarning)(cite.childNodes[1], // cite element
      "Normative references in informative sections are not allowed. " + "Remove '!' from the start of the reference `[[".concat(ref, "]]`"));
    }

    if (type === "informative" && !illegal) {
      conf.informativeReferences.add(cleanRef);
    } else {
      conf.normativeReferences.add(cleanRef);
    }

    return cite.childNodes;
  }
  /**
   * @param {string} matched
   * @param {Text} txt
   * @param {Map<string, string>} abbrMap
   */


  function inlineAbbrMatches(matched, txt, abbrMap) {
    return txt.parentElement.tagName === "ABBR" ? matched : (0, _hyperhtml.default)(_templateObject5(), abbrMap.get(matched), matched);
  }
  /**
   * @example |varName: type| => <var data-type="type">varName</var>
   * @example |varName| => <var>varName</var>
   * @param {string} matched
   */


  function inlineVariableMatches(matched) {
    // remove "|" at the beginning and at the end, then split at an optional `:`
    const matches = matched.slice(1, -1).split(":", 2);
    const [varName, type] = matches.map(s => s.trim());
    return (0, _hyperhtml.default)(_templateObject6(), type, varName);
  }

  function inlineLinkMatches(matched) {
    const parts = matched.slice(2, -2) // Chop [= =]
    .split("/", 2).map(s => s.trim());
    const [isFor, content] = parts.length === 2 ? parts : ["", parts[0]];
    const processedContent = processInlineContent(content);
    return (0, _hyperhtml.default)(_templateObject7(), isFor, isFor, processedContent);
  }

  function inlineCodeMatches(matched) {
    const clean = matched.slice(1, -1); // Chop ` and `

    return (0, _hyperhtml.default)(_templateObject8(), clean);
  }

  function processInlineContent(text) {
    if (inlineCodeRegExp.test(text)) {
      // We use a capture group to split, so we can process all the parts.
      return text.split(/(`[^`]+`)(?!`)/).map(part => {
        return part.startsWith("`") ? inlineCodeMatches(part) : processInlineContent(part);
      });
    }

    return document.createTextNode(text);
  }

  function run(conf) {
    const abbrMap = new Map();
    document.normalize(); //Disabled for ODCZ profile - we only make normative documents

    /*if (!document.querySelector("section#conformance")) {
      // make the document informative
      document.body.classList.add("informative");
    }*/

    conf.normativeReferences = new _utils.InsensitiveStringSet();
    conf.informativeReferences = new _utils.InsensitiveStringSet();
    if (!conf.respecRFC2119) conf.respecRFC2119 = rfc2119Usage; // PRE-PROCESSING

    /** @type {NodeListOf<HTMLElement>} */

    const abbrs = document.querySelectorAll("abbr[title]");

    for (const abbr of abbrs) {
      abbrMap.set(abbr.textContent, abbr.title);
    }

    const aKeys = [...abbrMap.keys()];
    const abbrRx = aKeys.length ? "(?:\\b".concat(aKeys.join("\\b)|(?:\\b"), "\\b)") : null; // PROCESSING
    // Don't gather text nodes for these:

    const exclusions = ["#respec-ui", ".head", "pre"];
    const txts = (0, _utils.getTextNodes)(document.body, exclusions, {
      wsNodes: false // we don't want nodes with just whitespace

    });
    const keywords = new RegExp(["\\bMUST(?:\\s+NOT)?\\b", "\\bSHOULD(?:\\s+NOT)?\\b", "\\bSHALL(?:\\s+NOT)?\\b", "\\bMAY\\b", "\\b(?:NOT\\s+)?REQUIRED\\b", "\\b(?:NOT\\s+)?RECOMMENDED\\b", "\\bOPTIONAL\\b"].join("|"));
    const rx = new RegExp("(".concat([keywords.source, inlineIdlReference.source, inlineVariable.source, inlineCitation.source, inlineExpansion.source, inlineAnchor.source, inlineCodeRegExp.source, ...(abbrRx ? [abbrRx] : [])].join("|"), ")"));

    for (const txt of txts) {
      const subtxt = txt.data.split(rx);
      if (subtxt.length === 1) continue;
      const df = document.createDocumentFragment();
      let matched = true;

      for (const t of subtxt) {
        matched = !matched;

        if (!matched) {
          df.append(t);
        } else if (t.startsWith("{{")) {
          const node = inlineXrefMatches(t);
          df.append(node);
        } else if (t.startsWith("[[[")) {
          const node = inlineRefMatches(t);
          df.append(node);
        } else if (t.startsWith("[[")) {
          const nodes = inlineBibrefMatches(t, txt, conf);
          df.append(...nodes);
        } else if (t.startsWith("|")) {
          const node = inlineVariableMatches(t);
          df.append(node);
        } else if (t.startsWith("[=")) {
          const node = inlineLinkMatches(t);
          df.append(node);
        } else if (t.startsWith("`")) {
          const node = inlineCodeMatches(t);
          df.append(node);
        } else if (abbrMap.has(t)) {
          const node = inlineAbbrMatches(t, txt, abbrMap);
          df.append(node);
        } else if (keywords.test(t)) {
          const node = inlineRFC2119Matches(t);
          df.append(node);
        } else {
          // FAIL -- not sure that this can really happen
          throw new Error("Found token '".concat(t, "' but it does not correspond to anything"));
        }
      }

      txt.replaceWith(df);
    }
  }
});
//# sourceMappingURL=inlines.js.map