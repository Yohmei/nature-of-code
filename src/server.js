import App from './App'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import express from 'express'
import { renderToString } from 'react-dom/server'
import body_parser from 'body-parser'

import doc_load_css from './doc_load/doc_load.css'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const express_server = express()

express_server.use(body_parser.urlencoded({ extended: true }))
express_server.use(body_parser.json())

express_server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {}
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    )

    if (context.url) {
      res.redirect(context.url)
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Nature Of Code</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
        <style>
          body {
            overflow: hidden;
          }
          ${doc_load_css}
        </style>
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
        <script>
          ;(function() {
              function S(attr_name) { return document.querySelector(attr_name) }

              function load_bar() {
                var overlay = S('#overlay');
                var prog = S('#progress');
                var stat = S('#prog_status');
                var videos = document.querySelectorAll('video');
                var images = document.images;
                var c = 0;
                var il = images.length;
                var vl = videos.length;

                if (il + vl == 0) return doneLoading();

                function imgLoaded() {
                  c += 1;
                  var percent = (((100 / (il + vl)) * c) << 0) + '%';
                  prog.style.width = percent;
                  stat.innerHTML = 'Loading ' + percent;
                  if (c === il + vl) return doneLoading();
                }

                function doneLoading() {
                  overlay.style.opacity = 0;

                  setTimeout(function() {
                    overlay.style.display = 'none';
                    document.removeEventListener('DOMContentLoaded', load_bar, false);
                  }, 800)
                }

                for (var i = 0; i < il; i++) {
                  var tImg = new Image();
                  tImg.onload = imgLoaded;
                  tImg.onerror = imgLoaded;
                  tImg.src = images[i].src;
                }

                 for (var i = 0; i < vl; i++) {
                  var tv = videos[i];
                  tv.oncanplaythrough = imgLoaded;
                }
              }

              document.addEventListener('DOMContentLoaded', load_bar, false);
            })();
        </script>
    </head>
    <body>
        <div id="overlay">
          <div id="prog_status"></div>
          <div id="progress"></div>
        </div>
        <div id="root">${markup}</div>
    </body>
</html>`
      )
    }
  })

export default express_server
