// dependencies
var metalsmith = require("metalsmith");

var autoprefixer = require("metalsmith-autoprefixer");
var branch = require("metalsmith-branch");
var cleanCss = require("metalsmith-clean-css");
var concat = require("metalsmith-concat");
var assets = require("metalsmith-assets");
var layouts = require("metalsmith-layouts");
var markdown = require("metalsmith-markdown");

// setup
metalsmith(__dirname)

  // directories
  .source("posts")
  .destination("build")

  // css
  .use(assets({
    source: "css",
    destination: "css"
  }))
  .use(autoprefixer())
  .use(concat({
    files: "**/*.css",
    output: "css/style.min.css"
  }))
  .use(cleanCss())

  // markdown
  .use(branch("**/*.md")
    .use(markdown())
  )

  // handlebars
  .use(branch("**/*.html")
    .use(layouts({
      engine: "handlebars",
      partials: "includes",
      layouts: "layouts",
      default: "post.html"
    }))
  )

  // meta files
  .use(assets({
    source: "meta",
    destination: "."
  }))

  // build
  .build(function(err){
    if (err) throw err;

    console.log("Successfully built the website");
  });
