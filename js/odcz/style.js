define(["exports", "core/utils", "core/pubsubhub"], function (exports, _utils, _pubsubhub) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.name = undefined;
  exports.run = run;
  /*jshint strict: true, browser:true, jquery: true*/
  /*globals define*/
  // Module w3c/style
  // Inserts a link to the appropriate W3C style for the specification's maturity level.
  // CONFIGURATION
  //  - specStatus: the short code for the specification's maturity level or type (required)

  const name = exports.name = "odcz/style";
  function attachFixupScript(doc, version) {
    const script = doc.createElement("script");
    if (location.hash) {
      script.addEventListener("load", () => {
        window.location = location.hash;
      }, { once: true });
    }
    script.src = `https://data.gov.cz/otevřené-formální-normy/static/js/fixup.js`;
    doc.body.appendChild(script);
  }

  // Make a best effort to attach meta viewport at the top of the head.
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
    link.href = "https://data.gov.cz/otevřené-formální-normy/static/css/base.css";
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
      hint: "preconnect", // for styles and scripts.
      href: "https://data.gov.cz"
    }, {
      hint: "preload", // all specs need it, and we attach it on end-all.
      href: "https://data.gov.cz/otevřené-formální-normy/static/js/fixup.js",
      as: "script"
    }, {
      hint: "preload", // all specs include on base.css.
      href: "https://data.gov.cz/otevřené-formální-normy/static/css/base.css",
      as: "style"
    }].map(_utils.createResourceHint).reduce(function (frag, link) {
      frag.appendChild(link);
      return frag;
    }, document.createDocumentFragment());
    return resourceHints;
  }
  // Collect elements for insertion (document fragment)
  const elements = createResourceHints();

  // Opportunistically apply base style
  elements.appendChild(createBaseStyle());
  if (!document.head.querySelector("meta[name=viewport]")) {
    // Make meta viewport the first element in the head.
    elements.insertBefore(createMetaViewport(), elements.firstChild);
  }

  document.head.insertBefore(elements, document.head.firstChild);

  function run(conf, doc, cb) {
    if (!conf.specStatus) {
      const warn = "`respecConfig.specStatus` missing. Defaulting to 'base'.";
      conf.specStatus = "base";
      (0, _pubsubhub.pub)("warn", warn);
    }

    // Select between released styles and experimental style.
    const version = selectStyleVersion(conf.useExperimentalStyles || "2016");
    // Attach W3C fixup script after we are done.
    if (version && !conf.noToc) {
      (0, _pubsubhub.sub)("end-all", function () {
        attachFixupScript(doc, version);
      }, { once: true });
    }
    const finalVersionPath = version ? version + "/" : "";
    const finalStyleURL = `https://data.gov.cz/otevřené-formální-normy/static/css/${conf.specStatus}.css`;

    (0, _utils.linkCSS)(doc, finalStyleURL);
    cb();
  }
});
//# sourceMappingURL=style.js.map