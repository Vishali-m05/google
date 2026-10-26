
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const publicDir = path.join(root, "public");

const routes = [
  ["/", "pages/index.js"],
  ["/search/babydoll", "pages/search/babydoll.js"],
  ["/search/cute", "pages/search/cute.js"],
  ["/search/smiles", "pages/search/smiles.js"],
  ["/youtube", "pages/youtube.js"],
  ["/watch", "pages/watch.js"],
  ["/gmail", "pages/gmail.js"],
  ["/music", "pages/music.js"]
];

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".m4a": "audio/mp4"
};

// Serve static files and support HTTP Range requests for audio seeking.
function sendFile(req, res, file) {
  fs.stat(file, (statError, stats) => {
    if (statError || !stats.isFile()) {
      res.writeHead(404, {
        "Content-Type": "text/plain; charset=utf-8"
      });
      res.end("File not found");
      return;
    }

    const fileSize = stats.size;
    const contentType =
      mime[path.extname(file).toLowerCase()] ||
      "application/octet-stream";

    const rangeHeader = req.headers.range;

    // Normal request: send the complete file.
    if (!rangeHeader) {
      res.writeHead(200, {
        "Content-Type": contentType,
        "Content-Length": fileSize,
        "Accept-Ranges": "bytes"
      });

      if (req.method === "HEAD") {
        res.end();
        return;
      }

      const stream = fs.createReadStream(file);

      stream.on("error", error => {
        console.error("File read error:", error);

        if (!res.headersSent) {
          res.writeHead(500);
        }

        res.end();
      });

      stream.pipe(res);
      return;
    }

    // Support one byte range per request.
    const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim());

    if (!match || (!match[1] && !match[2]) || fileSize === 0) {
      res.writeHead(416, {
        "Content-Range": `bytes */${fileSize}`,
        "Accept-Ranges": "bytes"
      });
      res.end();
      return;
    }

    let start;
    let end;

    if (match[1] === "") {
      // Suffix range, for example: bytes=-500
      const suffixLength = Number(match[2]);

      if (
        !Number.isSafeInteger(suffixLength) ||
        suffixLength <= 0
      ) {
        res.writeHead(416, {
          "Content-Range": `bytes */${fileSize}`,
          "Accept-Ranges": "bytes"
        });
        res.end();
        return;
      }

      start = Math.max(fileSize - suffixLength, 0);
      end = fileSize - 1;
    } else {
      start = Number(match[1]);
      end = match[2] === "" ? fileSize - 1 : Number(match[2]);

      if (
        !Number.isSafeInteger(start) ||
        !Number.isSafeInteger(end) ||
        start < 0 ||
        start >= fileSize ||
        end < start
      ) {
        res.writeHead(416, {
          "Content-Range": `bytes */${fileSize}`,
          "Accept-Ranges": "bytes"
        });
        res.end();
        return;
      }

      end = Math.min(end, fileSize - 1);
    }

    const chunkSize = end - start + 1;

    // 206 tells the browser that only the requested part is being sent.
    res.writeHead(206, {
      "Content-Type": contentType,
      "Content-Length": chunkSize,
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes"
    });

    if (req.method === "HEAD") {
      res.end();
      return;
    }

    const stream = fs.createReadStream(file, { start, end });

    stream.on("error", error => {
      console.error("File range read error:", error);

      if (!res.headersSent) {
        res.writeHead(500);
      }

      res.end();
    });

    stream.pipe(res);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" });
    res.end("Method not allowed");
    return;
  }

  let pathname;

  try {
    const url = new URL(req.url, "http://localhost");
    pathname = decodeURIComponent(url.pathname);
  } catch {
    res.writeHead(400);
    res.end("Invalid URL");
    return;
  }

  // Serve lyrics text files from public/lyrics/.
  if (pathname.startsWith("/lyrics/")) {
    const lyricsDir = path.resolve(publicDir, "lyrics");
    const file = path.resolve(publicDir, "." + pathname);

    // Prevent access to files outside public/lyrics/.
    if (
      !file.startsWith(lyricsDir + path.sep) ||
      path.extname(file).toLowerCase() !== ".txt"
    ) {
      res.writeHead(403, {
        "Content-Type": "text/plain; charset=utf-8"
      });
      res.end("Forbidden");
      return;
    }

    sendFile(req, res, file);
    return;
  }

  // Serve files from public/assets, including MP3s.
  if (pathname.startsWith("/assets/")) {
    const file = path.resolve(publicDir, "." + pathname);

    if (!file.startsWith(publicDir + path.sep)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    sendFile(req, res, file);
    return;
  }

  // Serve other public files used by the website.
  if (
    pathname === "/theme.css" ||
    pathname === "/site.js" ||
    pathname === "/config.js" ||
    pathname === "/app.js"
  ) {
    sendFile(req, res, path.join(publicDir, pathname.slice(1)));
    return;
  }

  const match = routes.find(([route]) => route === pathname);
  let pageFile = match?.[1];

  if (pathname.startsWith("/gmail/email/")) {
    pageFile = "pages/gmail/email/[id].js";
    req.params = {
      id: pathname.slice("/gmail/email/".length)
    };
  }

  if (!pageFile) {
    res.writeHead(404, {
      "Content-Type": "text/plain; charset=utf-8"
    });
    res.end("Page not found");
    return;
  }

  try {
    const moduleUrl = pathToFileURL(
      path.join(root, pageFile)
    ).href;

    const page = await import(moduleUrl);

    await page.default(req, {
      send(body) {
        if (!res.headersSent) {
          res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
          });
        }

        res.end(body);
      },

      status(code) {
        res.statusCode = code;
        return this;
      },

      setHeader(name, value) {
        res.setHeader(name, value);
      },

      end(body) {
        res.end(body);
      }
    });
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      res.writeHead(500, {
        "Content-Type": "text/plain; charset=utf-8"
      });
    }

    res.end("Local preview error. Check the VS Code terminal.");
  }
});

const PORT = Number(process.env.PORT) || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Babydoll Google running on port ${PORT}`);
});
