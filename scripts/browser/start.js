// server.mjs
import http from "http";
import fs from "fs/promises";
import path from "path";

const server = http.createServer(async (req, res) => {
  // Get the requested file path
  const filePath = path.join(path.resolve(), "dist", req.url === '/' ? '/index.html' : req.url);

  console.log("filePath", filePath, req.url);

  try {
    // Read the contents of the requested file
    const data = await fs.readFile(filePath);

    // Set the appropriate content type based on the file extension
    const contentType = getContentType(filePath);
    res.writeHead(200, {
      "Content-Type": contentType,
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    });

    // Send the contents of the file as the response
    res.end(data);
  } catch (err) {
    // Handle file read error or file not found
    console.error(err);
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Helper function to determine the content type based on the file extension
function getContentType(filePath) {
  const extname = path.extname(filePath).toLowerCase();
  switch (extname) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "application/javascript";
    case ".png":
      return "image/png";
    case ".wasm":
      return "application/wasm";
    // Add more cases as needed for other file types
    default:
      return "application/octet-stream";
  }
}

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
