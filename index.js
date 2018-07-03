const { createWriteStream, writeFileSync } = require("fs");
const { join } = require("path");
const got = require("got");
const { options } = require("./package.json");

async function downloadBreaches(output = "breaches.json", breachUrl = options.production.breachUrl) {
  const response = await got(breachUrl, { json: true });
  if (output) {
    return writeFileSync(output, JSON.stringify(response.body, null, 0));
  }
  return await response.body;
}

async function downloadLogo(logoUrl, outputFile) {
  return await got.stream(logoUrl).pipe(createWriteStream(outputFile));
}

async function downloadLogos(outputDir = "logos", logoBaseUrl = options.production.logoBaseUrl) {
  const breaches = await downloadBreaches(false);
  for (const { Name, LogoType } of breaches) {
    const logoFilename = [Name, LogoType].join(".");
    const logoUrl = [logoBaseUrl, logoFilename].join("/");
    const outputFile = join(outputDir, logoFilename);

    await downloadLogo(logoUrl, outputFile);
  }
}

module.exports = {
  downloadBreaches,
  downloadLogos
};
