const express = require("express");
const nodemailer = require("nodemailer");

const path = require("path");
let app = express();

const port = process.env.PORT || 3000;

// const log = function(entry) {
//     fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
// };

// Middleware to parse JSON requests
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Basic route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// const server = http.createServer(function (req, res) {
//   if (req.method === "POST") {
//     let body = "";

//     req.on("data", function (chunk) {
//       body += chunk;
//     });

//     req.on("end", function () {
//       if (req.url === "/") {
//         log("Received a message.");
//       } else if ((req.url = "/scheduled")) {
//         log(
//           "Received task " +
//             req.headers["x-aws-sqsd-taskname"] +
//             " scheduled at " +
//             req.headers["x-aws-sqsd-scheduled-at"]
//         );
//       }

//       res.writeHead(200, "OK", { "Content-Type": "text/plain" });
//       res.end();
//     });
//   } else {
//     res.writeHead(200);
//     res.write(html);
//     res.end();
//   }
// });

// Listen on port 3000, IP defaults to 127.0.0.1
// server.listen(port);

// Start the server
app.listen(port, () => {
  // Put a friendly message on the terminal
  console.log(`Server is running at http://localhost:${port}`);
  console.log("Server running at http://127.0.0.1:" + port + "/");
});
