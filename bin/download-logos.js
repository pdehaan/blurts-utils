#!/usr/bin/env node

const meow = require("meow");
const { downloadBreaches, downloadLogos } = require("../index");
const { options } = require("../package.json");

const usage = `
  Usage:
    $ download-logos

  Options:
    --logoBaseUrl, -u  Breach logo URL.
    --outputDir, -o    Logo output directory.
`;
const flags = {
  logoBaseUrl: {
    type: "string",
    alias: "u",
    default: options.production.logoBaseUrl
  },
  outputDir: {
    type: "string",
    alias: "o",
    default: "logos"
  }
};

async function main() {
  const cli = meow(usage, { flags });
  const { outputDir, logoBaseUrl } = cli.flags;
  downloadLogos(outputDir, logoBaseUrl).catch(err => {
    console.error(err);
    process.exitCode(1);
  });
}

main();
