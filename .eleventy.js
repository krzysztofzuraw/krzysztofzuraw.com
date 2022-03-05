const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const { DateTime } = require("luxon");
const sizeOf = require("image-size");
const path = require("path");

require("dotenv").config();

module.exports = (config) => {
  config.addPassthroughCopy("src/img");
  config.addPassthroughCopy({ "src/passthrough": "/" });

  config.addPlugin(eleventyNavigationPlugin);
  config.addPlugin(pluginRss);

  config.addFilter("humanizeDate", (date) => {
    return DateTime.fromJSDate(date).toLocaleString({
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Warsaw",
    });
  });

  config.addFilter("formatDate", (date) =>
    DateTime.fromJSDate(date).toLocaleString({
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "Europe/Warsaw",
    })
  );

  config.addFilter("toISO", (date) => DateTime.fromJSDate(date, { zone: "Europe/Warsaw" }).toISO());

  config.addFilter("getYear", (date) =>
    DateTime.fromJSDate(date, { zone: "Europe/Warsaw" }).toFormat("yyyy")
  );

  config.addFilter("getLanguage", (lang) => {
    switch (lang) {
      case "en":
        return "English";
      case "pl":
        return "Polish";
      default:
        return "English";
    }
  });

  config.addShortcode("currentYear", () => DateTime.now().toLocaleString({ year: "numeric" }));

  config.addShortcode("img", (imgPath, alt, figcaption) => {
    const dimensions = sizeOf(path.resolve(process.cwd(), "src", "img", `${imgPath}.webp`));

    return /*html*/ `<figure>
       <a href="/img/${imgPath}.webp" target="_blank" rel="noopener">
        <img src="/img/${imgPath}.webp" loading="lazy" alt="${alt}" height="${dimensions.height}" width="${dimensions.width}">
      </a>
      <figcaption>${figcaption}</figcaption>
    </figure>`;
  });

  return {
    templateFormats: ["md", "njk", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
