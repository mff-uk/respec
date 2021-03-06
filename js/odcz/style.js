define(["exports", "../core/utils", "../core/pubsubhub"], function (_exports, _utils, _pubsubhub) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.run = run;
  _exports.name = void 0;

  /* jshint strict: true, browser:true, jquery: true */
  // Module w3c/style
  // Inserts a link to the appropriate W3C style for the specification's maturity level.
  // CONFIGURATION
  //  - specStatus: the short code for the specification's maturity level or type (required)
  const name = "odcz/style.js";
  _exports.name = name;

  function attachFixupScript(doc, version) {
    const script = doc.createElement("script");

    if (location.hash) {
      script.addEventListener("load", () => {
        window.location = location.hash;
      }, {
        once: true
      });
    }

    script.src = "https://ofn.gov.cz/static/js/fixup.js";
    doc.body.appendChild(script);
  } // Make a best effort to attach meta viewport at the top of the head.
  // Other plugins might subsequently push it down, but at least we start
  // at the right place. When ReSpec exports the HTML, it again moves the
  // meta viewport to the top of the head - so to make sure it's the first
  // thing the browser sees. See js/ui/save-html.js.


  function createMetaViewport() {
    const meta = document.createElement("meta");
    meta.name = "viewport";
    const contentProps = {
      width: "device-width",
      "initial-scale": "1",
      "shrink-to-fit": "no"
    };
    meta.content = (0, _utils.toKeyValuePairs)(contentProps).replace(/\"/g, "");
    return meta;
  }

  function createBaseStyle() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://ofn.gov.cz/static/css/base.css";
    link.classList.add("removeOnSave");
    return link;
  }

  function selectStyleVersion(styleVersion) {
    let version = "";

    switch (styleVersion) {
      case null:
      case true:
        version = "2016";
        break;

      default:
        if (styleVersion && !isNaN(styleVersion)) {
          version = styleVersion.toString().trim();
        }

    }

    return version;
  }

  function createResourceHints() {
    const resourceHints = [{
      hint: "preconnect",
      // for styles and scripts.
      href: "https://data.gov.cz"
    }, {
      hint: "preload",
      // all specs need it, and we attach it on end-all.
      href: "https://ofn.gov.cz/static/js/fixup.js",
      as: "script"
    }, {
      hint: "preload",
      // all specs include on base.css.
      href: "https://ofn.gov.cz/static/css/base.css",
      as: "style"
    }, {
      hint: "preload",
      // all specs show the logo.
      href: "https://ofn.gov.cz/static/images/logo.png",
      as: "image"
    }].map(_utils.createResourceHint).reduce(function (frag, link) {
      frag.appendChild(link);
      return frag;
    }, document.createDocumentFragment());
    return resourceHints;
  } // Collect elements for insertion (document fragment)


  const elements = createResourceHints(); // Opportunistically apply base style

  elements.appendChild(createBaseStyle());

  if (!document.head.querySelector("meta[name=viewport]")) {
    // Make meta viewport the first element in the head.
    elements.prepend(createMetaViewport());
  }

  document.head.prepend(elements);

  function styleMover(linkURL) {
    return exportDoc => {
      const odczStyle = exportDoc.querySelector("head link[href=\"".concat(linkURL, "\"]"));
      exportDoc.querySelector("head").append(odczStyle);
    };
  }

  function run(conf) {
    if (!conf.specStatus) {
      const warn = "`respecConfig.specStatus` missing. Defaulting to 'base'.";
      conf.specStatus = "base";
      (0, _pubsubhub.pub)("warn", warn);
    } // Select between released styles and experimental style.


    const version = selectStyleVersion(conf.useExperimentalStyles || "2016"); // Attach W3C fixup script after we are done.

    if (version && !conf.noToc) {
      (0, _pubsubhub.sub)("end-all", function () {
        attachFixupScript(document, version);
      }, {
        once: true
      });
    }

    const finalVersionPath = version ? "".concat(version, "/") : "";
    const finalStyleURL = "https://ofn.gov.cz/static/css/".concat(conf.specStatus, ".css");
    (0, _utils.linkCSS)(document, finalStyleURL); // Make sure the ODCZ stylesheet is the last stylesheet, as required by W3C Pub Rules.

    const moveStyle = styleMover(finalStyleURL);
    (0, _pubsubhub.sub)("beforesave", moveStyle);
  }
});
//# sourceMappingURL=style.js.map