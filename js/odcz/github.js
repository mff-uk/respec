define(["exports", "core/l10n", "core/pubsubhub"], function (exports, _l10n, _pubsubhub) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.name = undefined;
  exports.fetchAll = fetchAll;
  exports.fetchIndex = fetchIndex;
  exports.run = run;

  var _l10n2 = _interopRequireDefault(_l10n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  const name = exports.name = "core/github";

  function findNext(header) {
    // Finds the next URL of paginated resources which
    // is available in the Link header. Link headers look like this:
    // Link: <url1>; rel="next", <url2>; rel="foo"; bar="baz"
    // More info here: https://developer.github.com/v3/#link-header
    var m = (header || "").match(/<([^>]+)>\s*;\s*rel="next"/);
    return m && m[1] || null;
  }

  async function fetchAll(url, headers = {}, output = []) {
    const urlObj = new URL(url);
    if (urlObj.searchParams && !urlObj.searchParams.has("per_page")) {
      urlObj.searchParams.append("per_page", "100");
    }
    const request = new Request(urlObj, {
      headers
    });
    request.headers.set("Accept", "application/vnd.github.v3+json");
    const response = await window.fetch(request);
    const json = await response.json();
    if (Array.isArray(json)) {
      output.push(...json);
    }
    const next = findNext(response.headers.get("Link"));
    return next ? fetchAll(next, headers, output) : output;
  }

  function fetchIndex(url, headers) {
    // converts URLs of the form:
    // https://api.github.com/repos/user/repo/comments{/number}
    // into:
    // https://api.github.com/repos/user/repo/comments
    // which is what you need if you want to get the index.
    return fetchAll(url.replace(/\{[^}]+\}/, ""), headers);
  }

  async function run(conf) {
    if (!conf.hasOwnProperty("github") || !conf.github) {
      // nothing to do, bail out.
      return;
    }
    if (typeof conf.github === "object" && !conf.github.hasOwnProperty("repoURL")) {
      const msg = "Config option `[github](https://github.com/w3c/respec/wiki/github)` " + "is missing property `repoURL`.";
      (0, _pubsubhub.pub)("error", msg);
      return;
    }
    let ghURL;
    try {
      ghURL = new URL(conf.github.repoURL || conf.github, "https://github.com");
    } catch (err) {
      (0, _pubsubhub.pub)("error", `\`respecConf.github\` is not a valid URL? (${ghURL})`);
      return;
    }
    if (ghURL.origin !== "https://github.com") {
      const msg = `\`respecConf.github\` must be HTTPS and pointing to GitHub. (${ghURL})`;
      (0, _pubsubhub.pub)("error", msg);
      return;
    }
    const [org, repo] = ghURL.pathname.split("/").filter(item => item);
    if (!org || !repo) {
      const msg = "`respecConf.github` URL needs a path with, for example, w3c/my-spec";
      (0, _pubsubhub.pub)("error", msg);
      return;
    }
    const branch = conf.github.branch || "gh-pages";
    const newProps = {
      edDraftURI: `https://${org.toLowerCase()}.github.io/${repo}/`,
      githubToken: undefined,
      githubUser: undefined,
      githubAPI: `https://api.github.com/repos/${org}/${repo}`,
      issueBase: new URL("./issues/", ghURL).href,
      otherLinks: [],
      pullBase: new URL("./pulls/", ghURL).href,
      shortName: repo
    };
    const otherLink = {
      key: conf.l10n.participate,
      data: [{
        value: `GitHub ${org}/${repo}`,
        href: ghURL
      }, {
        value: conf.l10n.file_a_bug,
        href: newProps.issueBase
      }]
    };
    // Assign new properties, but retain existing ones
    const normalizedGHObj = {
      branch,
      repoURL: ghURL.href
    };
    const normalizedConfig = _extends({}, newProps, conf, { github: normalizedGHObj });
    Object.assign(conf, normalizedConfig);
    conf.otherLinks.unshift(otherLink);
  }
});
//# sourceMappingURL=github.js.map