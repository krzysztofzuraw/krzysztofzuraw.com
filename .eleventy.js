const { DateTime } = require('luxon');
// const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const sizeOf = require('image-size');
const path = require('path');

module.exports = config => {
  // config.addPassthroughCopy('src/css');
  config.addPassthroughCopy('src/img');
  config.addPassthroughCopy({ 'src/passthrough': '/' });

  // config.addPlugin(syntaxHighlight);
  config.addPlugin(eleventyNavigationPlugin);
  config.addPlugin(pluginRss);

  config.addFilter('humanizeDate', date =>
    DateTime.fromJSDate(date).toLocaleString({
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  config.addFilter('formatDate', date =>
    DateTime.fromJSDate(date).toLocaleString({
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  );

  config.addFilter('getYear', date => {
    return DateTime.fromJSDate(date).toFormat('yyyy');
  });

  config.addShortcode('currentYear', () => {
    return DateTime.now().toLocaleString({ year: 'numeric' });
  });

  config.addShortcode('img', (imgPath, alt, figcaption) => {
    const dimensions = sizeOf(path.resolve(process.cwd(), 'src', 'img', `${imgPath}.webp`));

    return /*html*/ `<figure>
       <a href="/img/${imgPath}.webp" target="_blank" rel="noopener">
        <img src="/img/${imgPath}.webp" loading="lazy" alt="${alt}" height="${dimensions.height}" width="${dimensions.width}">
      </a>
      <figcaption>${figcaption}</figcaption>
    </figure>`;
  });

  return {
    templateFormats: ['md', 'njk', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
