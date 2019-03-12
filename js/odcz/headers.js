define(["exports", "../core/utils", "./templates/cgbg-headers", "./templates/headers", "hyperhtml", "../core/pubsubhub"], function (_exports, _utils, _cgbgHeaders, _headers, _hyperhtml, _pubsubhub) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.run = run;
  _exports.name = void 0;
  _cgbgHeaders = _interopRequireDefault(_cgbgHeaders);
  _headers = _interopRequireDefault(_headers);
  _hyperhtml = _interopRequireDefault(_hyperhtml);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  const name = "odcz/headers";
  _exports.name = name;
  const W3CDate = new Intl.DateTimeFormat(["cs-cz"], {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "2-digit"
  });
  const status2maturity = {
    FPWD: "WD",
    LC: "WD",
    FPLC: "WD",
    "FPWD-NOTE": "NOTE",
    "WD-NOTE": "WD",
    "LC-NOTE": "LC",
    "IG-NOTE": "NOTE",
    "WG-NOTE": "NOTE"
  };
  const status2rdf = {
    NOTE: "w3p:NOTE",
    WD: "w3p:WD",
    LC: "w3p:LastCall",
    CR: "w3p:CR",
    PR: "w3p:PR",
    REC: "w3p:REC",
    PER: "w3p:PER",
    RSCND: "w3p:RSCND"
  };
  const status2text = {
    ED: "Draft",
    REC: "Doporučení"
  };

  const status2long = _objectSpread({}, status2text, {
    "FPWD-NOTE": "First Public Working Group Note",
    "LC-NOTE": "Last Call Working Draft"
  });

  const recTrackStatus = ["FPWD", "WD", "FPLC", "LC", "CR", "PR", "PER", "REC"];
  const noTrackStatus = ["MO", "unofficial", "base", "finding", "draft-finding", "CG-DRAFT", "CG-FINAL", "BG-DRAFT", "BG-FINAL"];
  const cgbg = ["CG-DRAFT", "CG-FINAL", "BG-DRAFT", "BG-FINAL"];
  const precededByAn = ["ED", "IG-NOTE"];
  const licenses = {
    cc0: {
      name: "Creative Commons 0 Public Domain Dedication",
      short: "CC0",
      url: "https://creativecommons.org/publicdomain/zero/1.0/"
    },
    "cc-by": {
      name: "Creative Commons Attribution 4.0 International Public License",
      short: "CC-BY",
      url: "https://creativecommons.org/licenses/by/4.0/legalcode"
    }
  };
  const baseLogo = Object.freeze({
    id: "",
    alt: "",
    href: "",
    src: "",
    height: "64",
    width: "64"
  });
  /**
   * @param {*} conf
   * @param {string} prop
   * @param {string | number | Date} fallbackDate
   */

  function validateDateAndRecover(conf, prop, fallbackDate = new Date()) {
    const date = conf[prop] ? new Date(conf[prop]) : new Date(fallbackDate); // if date is valid

    if (Number.isFinite(date.valueOf())) {
      const formattedDate = _utils.ISODate.format(date);

      return new Date(formattedDate);
    }

    const msg = `[\`${prop}\`](https://github.com/w3c/respec/wiki/${prop}) ` + `is not a valid date: "${conf[prop]}". Expected format 'YYYY-MM-DD'.`;
    (0, _pubsubhub.pub)("error", msg);
    return new Date(_utils.ISODate.format(new Date()));
  }

  function run(conf) {
    conf.isUnofficial = conf.specStatus === "unofficial";

    if (conf.isUnofficial && !Array.isArray(conf.logos)) {
      conf.logos = [];
    }

    conf.isCCBY = conf.license === "cc-by";
    conf.licenseInfo = licenses[conf.license];
    conf.isCGBG = cgbg.includes(conf.specStatus);
    conf.isCGFinal = conf.isCGBG && conf.specStatus.endsWith("G-FINAL");
    conf.isBasic = conf.specStatus === "base";
    conf.isRegular = !conf.isCGBG && !conf.isBasic;

    if (!conf.specStatus) {
      (0, _pubsubhub.pub)("error", "Missing required configuration: `specStatus`");
    }

    if (conf.isRegular && !conf.shortName) {
      (0, _pubsubhub.pub)("error", "Missing required configuration: `shortName`");
    }

    if (conf.testSuiteURI) {
      const url = new URL(conf.testSuiteURI, location.href);
      const {
        host,
        pathname
      } = url;

      if (host === "github.com" && pathname.startsWith("/w3c/web-platform-tests/")) {
        const msg = "Web Platform Tests have moved to a new Github Organization at https://github.com/web-platform-tests. " + "Please update your [`testSuiteURI`](https://github.com/w3c/respec/wiki/testSuiteURI) to point to the " + `new tests repository (e.g., https://github.com/web-platform-tests/wpt/${conf.shortName} ).`;
        (0, _pubsubhub.pub)("warn", msg);
      }
    }

    conf.title = document.title || "No Title";
    if (!conf.subtitle) conf.subtitle = "";
    conf.publishDate = validateDateAndRecover(conf, "publishDate", document.lastModified);
    conf.publishYear = conf.publishDate.getUTCFullYear();
    conf.publishHumanDate = W3CDate.format(conf.publishDate);
    conf.isNoTrack = noTrackStatus.includes(conf.specStatus);
    conf.isRecTrack = conf.noRecTrack ? false : recTrackStatus.includes(conf.specStatus);
    conf.isMemberSubmission = conf.specStatus === "Member-SUBM";

    if (conf.isMemberSubmission) {
      const memSubmissionLogo = {
        alt: "W3C Member Submission",
        href: "https://www.w3.org/Submission/",
        src: "https://www.w3.org/Icons/member_subm-v.svg",
        width: "211"
      };
      conf.logos.push(_objectSpread({}, baseLogo, memSubmissionLogo));
    }

    conf.isTeamSubmission = conf.specStatus === "Team-SUBM";

    if (conf.isTeamSubmission) {
      const teamSubmissionLogo = {
        alt: "W3C Team Submission",
        href: "https://www.w3.org/TeamSubmission/",
        src: "https://www.w3.org/Icons/team_subm-v.svg",
        width: "211"
      };
      conf.logos.push(_objectSpread({}, baseLogo, teamSubmissionLogo));
    }

    conf.isSubmission = conf.isMemberSubmission || conf.isTeamSubmission;
    conf.anOrA = precededByAn.includes(conf.specStatus) ? "an" : "a";
    conf.isTagFinding = conf.specStatus === "finding" || conf.specStatus === "draft-finding";

    if (!conf.edDraftURI) {
      conf.edDraftURI = "";
      if (conf.specStatus === "ED") (0, _pubsubhub.pub)("warn", "Editor's Drafts should set edDraftURI.");
    }

    conf.maturity = status2maturity[conf.specStatus] ? status2maturity[conf.specStatus] : conf.specStatus;
    let publishSpace = "TR";
    if (conf.specStatus === "Member-SUBM") publishSpace = "Submission";else if (conf.specStatus === "Team-SUBM") publishSpace = "TeamSubmission";
    if (conf.isRegular) conf.thisVersion = `https://www.w3.org/${publishSpace}/${conf.publishDate.getUTCFullYear()}/${conf.maturity}-${conf.shortName}-${(0, _utils.concatDate)(conf.publishDate)}/`;
    if (conf.specStatus === "ED") conf.thisVersion = conf.edDraftURI;
    if (conf.isRegular) conf.latestVersion = `https://www.w3.org/${publishSpace}/${conf.shortName}/`;

    if (conf.isTagFinding) {
      conf.latestVersion = `https://www.w3.org/2001/tag/doc/${conf.shortName}`;
      conf.thisVersion = `${conf.latestVersion}-${_utils.ISODate.format(conf.publishDate)}`;
    }

    if (conf.previousPublishDate) {
      if (!conf.previousMaturity && !conf.isTagFinding) {
        (0, _pubsubhub.pub)("error", "`previousPublishDate` is set, but not `previousMaturity`.");
      }

      conf.previousPublishDate = validateDateAndRecover(conf, "previousPublishDate");
      const pmat = status2maturity[conf.previousMaturity] ? status2maturity[conf.previousMaturity] : conf.previousMaturity;

      if (conf.isTagFinding) {
        conf.prevVersion = `${conf.latestVersion}-${_utils.ISODate.format(conf.previousPublishDate)}`;
      } else if (conf.isCGBG) {
        conf.prevVersion = conf.prevVersion || "";
      } else if (conf.isBasic) {
        conf.prevVersion = "";
      } else {
        conf.prevVersion = `https://www.w3.org/TR/${conf.previousPublishDate.getUTCFullYear()}/${pmat}-${conf.shortName}-${(0, _utils.concatDate)(conf.previousPublishDate)}/`;
      }
    } else {
      if (!conf.specStatus.endsWith("NOTE") && conf.specStatus !== "FPWD" && conf.specStatus !== "FPLC" && conf.specStatus !== "ED" && !conf.noRecTrack && !conf.isNoTrack && !conf.isSubmission) (0, _pubsubhub.pub)("error", "Document on track but no previous version:" + " Add `previousMaturity`, and `previousPublishDate` to ReSpec's config.");
      if (!conf.prevVersion) conf.prevVersion = "";
    }

    if (conf.prevRecShortname && !conf.prevRecURI) conf.prevRecURI = `https://www.w3.org/TR/${conf.prevRecShortname}`;
    if (!conf.editors || conf.editors.length === 0) (0, _pubsubhub.pub)("error", "At least one editor is required");

    const peopCheck = function peopCheck(it) {
      if (!it.name) (0, _pubsubhub.pub)("error", "All authors and editors must have a name.");
    };

    if (conf.editors) {
      conf.editors.forEach(peopCheck);
    }

    if (conf.formerEditors) {
      conf.formerEditors.forEach(peopCheck);
    }

    if (conf.authors) {
      conf.authors.forEach(peopCheck);
    }

    conf.multipleEditors = conf.editors && conf.editors.length > 1;
    conf.multipleFormerEditors = Array.isArray(conf.formerEditors) && conf.formerEditors.length > 1;
    conf.multipleAuthors = conf.authors && conf.authors.length > 1;
    (conf.alternateFormats || []).forEach(it => {
      if (!it.uri || !it.label) {
        (0, _pubsubhub.pub)("error", "All alternate formats must have a uri and a label.");
      }
    });
    conf.multipleAlternates = conf.alternateFormats && conf.alternateFormats.length > 1;
    conf.alternatesHTML = conf.alternateFormats && (0, _utils.joinAnd)(conf.alternateFormats, alt => {
      let optional = alt.hasOwnProperty("lang") && alt.lang ? ` hreflang='${alt.lang}'` : "";
      optional += alt.hasOwnProperty("type") && alt.type ? ` type='${alt.type}'` : "";
      return `<a rel='alternate' href='${alt.uri}'${optional}>${alt.label}</a>`;
    });

    if (conf.bugTracker) {
      if (conf.bugTracker.new && conf.bugTracker.open) {
        conf.bugTrackerHTML = `<a href='${conf.bugTracker.new}'>${conf.l10n.file_a_bug}</a> ${conf.l10n.open_parens}<a href='${conf.bugTracker.open}'>${conf.l10n.open_bugs}</a>${conf.l10n.close_parens}`;
      } else if (conf.bugTracker.open) {
        conf.bugTrackerHTML = `<a href='${conf.bugTracker.open}'>open bugs</a>`;
      } else if (conf.bugTracker.new) {
        conf.bugTrackerHTML = `<a href='${conf.bugTracker.new}'>file a bug</a>`;
      }
    }

    if (conf.copyrightStart && conf.copyrightStart == conf.publishYear) conf.copyrightStart = "";
    conf.longStatus = status2long[conf.specStatus];
    conf.textStatus = status2text[conf.specStatus];

    if (status2rdf[conf.specStatus]) {
      conf.rdfStatus = status2rdf[conf.specStatus];
    }

    conf.showThisVersion = !conf.isNoTrack || conf.isTagFinding;
    conf.showPreviousVersion = conf.specStatus !== "FPWD" && conf.specStatus !== "FPLC" && conf.specStatus !== "ED" && !conf.isNoTrack && !conf.isSubmission;
    if (conf.specStatus.endsWith("NOTE") && !conf.prevVersion) conf.showPreviousVersion = false;
    if (conf.isTagFinding) conf.showPreviousVersion = conf.previousPublishDate ? true : false;
    conf.notYetRec = conf.isRecTrack && conf.specStatus !== "REC";
    conf.isRec = conf.isRecTrack && conf.specStatus === "REC";
    if (conf.isRec && !conf.errata) (0, _pubsubhub.pub)("error", "Recommendations must have an errata link.");
    conf.notRec = conf.specStatus !== "REC";
    conf.prependW3C = !conf.isUnofficial;
    conf.isED = conf.specStatus === "ED";
    conf.isCR = conf.specStatus === "CR";
    conf.isPR = conf.specStatus === "PR";
    conf.isPER = conf.specStatus === "PER";
    conf.isMO = conf.specStatus === "MO";
    conf.isNote = ["FPWD-NOTE", "WG-NOTE"].includes(conf.specStatus);
    conf.isIGNote = conf.specStatus === "IG-NOTE";
    conf.dashDate = _utils.ISODate.format(conf.publishDate);
    conf.publishISODate = conf.publishDate.toISOString();
    conf.shortISODate = _utils.ISODate.format(conf.publishDate);
    Object.defineProperty(conf, "wgId", {
      get() {
        if (!this.hasOwnProperty("wgPatentURI")) {
          return "";
        } // it's always at "pp-impl" + 1


        const urlParts = this.wgPatentURI.split("/");
        const pos = urlParts.findIndex(item => item === "pp-impl") + 1;
        return urlParts[pos] || "";
      }

    }); // configuration done - yay!
    // insert into document

    const header = (conf.isCGBG ? _cgbgHeaders.default : _headers.default)(conf);
    document.body.prepend(header);
    document.body.classList.add("h-entry"); // NOTE:
    //  When arrays, wg and wgURI have to be the same length (and in the same order).
    //  Technically wgURI could be longer but the rest is ignored.
    //  However wgPatentURI can be shorter. This covers the case where multiple groups
    //  publish together but some aren't used for patent policy purposes (typically this
    //  happens when one is foolish enough to do joint work with the TAG). In such cases,
    //  the groups whose patent policy applies need to be listed first, and wgPatentURI
    //  can be shorter — but it still needs to be an array.

    const wgPotentialArray = [conf.wg, conf.wgURI, conf.wgPatentURI];

    if (wgPotentialArray.some(item => Array.isArray(item)) && !wgPotentialArray.every(item => Array.isArray(item))) {
      (0, _pubsubhub.pub)("error", "If one of '`wg`', '`wgURI`', or '`wgPatentURI`' is an array, they all have to be.");
    }

    if (conf.isCGBG && !conf.wg) {
      (0, _pubsubhub.pub)("error", "[`wg`](https://github.com/w3c/respec/wiki/wg)" + " configuration option is required for this kind of document.");
    }

    if (Array.isArray(conf.wg)) {
      conf.multipleWGs = conf.wg.length > 1;
      conf.wgHTML = (0, _utils.joinAnd)(conf.wg, (wg, idx) => {
        return `the <a href='${conf.wgURI[idx]}'>${wg}</a>`;
      });
      const pats = [];

      for (let i = 0, n = conf.wg.length; i < n; i++) {
        pats.push(`a <a href='${conf.wgPatentURI[i]}' rel='disclosure'>` + `public list of any patent disclosures  (${conf.wg[i]})</a>`);
      }

      conf.wgPatentHTML = (0, _utils.joinAnd)(pats);
    } else {
      conf.multipleWGs = false;
      conf.wgHTML = `the <a href='${conf.wgURI}'>${conf.wg}</a>`;
    }

    if (conf.specStatus === "PR" && !conf.crEnd) {
      (0, _pubsubhub.pub)("error", `\`specStatus\` is "PR" but no \`crEnd\` is specified (needed to indicate end of previous CR).`);
    }

    if (conf.specStatus === "CR" && !conf.crEnd) {
      (0, _pubsubhub.pub)("error", `\`specStatus\` is "CR", but no \`crEnd\` is specified in Respec config.`);
    }

    conf.crEnd = validateDateAndRecover(conf, "crEnd");
    conf.humanCREnd = W3CDate.format(conf.crEnd);

    if (conf.specStatus === "PR" && !conf.prEnd) {
      (0, _pubsubhub.pub)("error", `\`specStatus\` is "PR" but no \`prEnd\` is specified.`);
    }

    conf.prEnd = validateDateAndRecover(conf, "prEnd");
    conf.humanPREnd = W3CDate.format(conf.prEnd);

    if (conf.specStatus === "PER" && !conf.perEnd) {
      (0, _pubsubhub.pub)("error", "Status is PER but no perEnd is specified");
    }

    conf.perEnd = validateDateAndRecover(conf, "perEnd");
    conf.humanPEREnd = W3CDate.format(conf.perEnd);
    conf.recNotExpected = conf.recNotExpected ? true : !conf.isRecTrack && conf.maturity == "WD" && conf.specStatus !== "FPWD-NOTE";
    if (conf.isIGNote && !conf.charterDisclosureURI) (0, _pubsubhub.pub)("error", "IG-NOTEs must link to charter's disclosure section using `charterDisclosureURI`."); //hyperHTML.bind(sotd)`${populateSoTD(conf, sotd)}`;

    if (!conf.implementationReportURI && conf.isCR) {
      (0, _pubsubhub.pub)("error", "CR documents must have an [`implementationReportURI`](https://github.com/w3c/respec/wiki/implementationReportURI) " + "that describes [implementation experience](https://www.w3.org/2019/Process-20190301/#implementation-experience).");
    }

    if (!conf.implementationReportURI && conf.isPR) {
      (0, _pubsubhub.pub)("warn", "PR documents should include an " + " [`implementationReportURI`](https://github.com/w3c/respec/wiki/implementationReportURI)" + " that describes [implementation experience](https://www.w3.org/2019/Process-20190301/#implementation-experience).");
    } // Requested by https://github.com/w3c/respec/issues/504
    // Makes a record of a few auto-generated things.


    (0, _pubsubhub.pub)("amend-user-config", {
      publishISODate: conf.publishISODate,
      generatedSubtitle: `${conf.longStatus} ${conf.publishHumanDate}`
    });
  }
  /**
   * @param {Node} node
   * @return {node is Element}
   */


  function isElement(node) {
    return node.nodeType === Node.ELEMENT_NODE;
  }
});
//# sourceMappingURL=headers.js.map