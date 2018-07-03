const meow = require("meow");
const { downloadBreaches } = require("../index");
const { options } = require("../package.json");

const usage = `
  Usage:
    $ download-breaches

  Options:
    --breachUrl, -u  Breach JSON URL.
    --output, -o     Output filename.
`;
const flags = {
  breachUrl: {
    type: "string",
    alias: "u",
    default: options.production.breachesUrl
  },
  output: {
    type: "string",
    alias: "o",
    default: "breaches.json"
  }
};

async function main() {
  const cli = meow(usage, { flags });
  const { output, breachUrl } = cli.flags;
  downloadBreaches(output, breachUrl).catch(err => {
    console.error(err);
    process.exitCode(1);
  });
}

main();
