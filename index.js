const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
let app = express();

const port = process.env.PORT || 3000;

// Set up CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Basic route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "j.corbett@rowan.nyc",
    pass: "xozpuf-zinki3-Wymneh", // Use App Password if 2-Step Verification is enabled
  },
});

// GOOGLE SMTP METHOD
app.post("/send-pdf", (req, res) => {
  const { pdf, to } = req.body;

  // Setup email data
  const mailOptions = {
    to,
    subject: "RS-101 Submission: {student-name}",
    text: "Attached is a student submission for the {assignment-name} assignment in RS-101.",
    attachments: [
      {
        filename: "sumission-{assignment-name}.pdf",
        contentType: "application/pdf",
        content: pdf,
        encoding: "base64",
      },
    ],
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error.toString() });
    }
    res.status(200).json({ message: "Email sent", messageId: info.messageId });
  });
});

// Start the server
app.listen(port, () => {
  // Put a friendly message on the terminal
  console.log(`Server is running at http://localhost:${port}`);
});
