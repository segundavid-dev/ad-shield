export const DEFAULT_MALICIOUS_DOMAINS: string[] = [
  "betting", "casino", "porn", "xxx", "adult", "sex", "cam", "dating", "hookup",
  "ads", "popads", "propellerads", "exoclick", "juicyads", "trafficjunky",
  "ad-maven", "yllix", "revenuehits", "bitmedia", "coinzilla", "a-ads",
  "onclickads", "popcash", "shorte.st", "adf.ly", "ouo.io", "linkvertise",
  "megaurl", "adbull", "clicksfly", "shrinkme", "exe.io", "gplinks"
];

export const isMaliciousUrl = (url: string, maliciousDomains: string[] = DEFAULT_MALICIOUS_DOMAINS): boolean => {
  try {
    const UrlObj = new URL(url);
    const domain = UrlObj.hostname.toLowerCase();
    const search = UrlObj.search.toLowerCase();

    // check domains against common malicious patterns
    const isDomainSuspicious = maliciousDomains.some((pattern) =>
      domain.includes(pattern)
    );

    // check suspicious URL patterns
    const hasSuspiciousParams =
      search.includes("popup") ||
      search.includes("redirect") ||
      search.includes("affiliate");

    const suspiciousTlds = [".tk", ".ml", ".ga", ".cf", ".pw"];
    const hasSuspiciousTld = suspiciousTlds.some((tld) =>
      domain.endsWith(tld)
    );

    return isDomainSuspicious || hasSuspiciousParams || hasSuspiciousTld;
  } catch {
    return false;
  }
};
