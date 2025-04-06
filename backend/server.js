import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import { connectDB } from "./config/db.js";
import medicineRouter from "./routes/medicineRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import path from "path";
import fs from "fs"; // Import fs at the top

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors()); // Enable CORS
app.use(express.urlencoded({ extended: true }));

// db connection
connectDB();

// Serve static files from uploads directory
app.use("/image", express.static(path.resolve("uploads")));
app.use("/uploads", express.static(path.resolve("uploads")));

// api endpoints
app.use("/api/medicine", medicineRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter); // Primary order routes

// default route
app.get("/", (req, res) => {
  res.json({ message: 'CORS is enabled!' });
});

// Define schema and model
const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  filePath: { type: String, required: true },
  fileType: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const File = mongoose.model("File", fileSchema);

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure the "uploads" directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload route
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = new File({
      filename: req.file.filename,
      filePath: `/uploads/${req.file.filename}`,
      fileType: req.file.mimetype,
    });
    await file.save();
    res.status(200).json({ message: "File uploaded successfully", file });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Error uploading file" });
  }
});

// Get all files route
app.get("/files", async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    console.error("Error retrieving files:", error);
    res.status(500).json({ error: "Error retrieving files" });
  }
});

// Delete file route
app.delete("/files/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // Delete the file from the server
    const filePath = path.resolve(`.${file.filePath}`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete the file record from the database
    await File.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: "Error deleting file" });
  }
});

// Define the Contact schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create the Contact model
const Contact = mongoose.model('Contact', contactSchema);

// API to handle form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ success: true, message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit contact form', error });
  }
});

// API to fetch all contact submissions (for admin panel)
app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch contact submissions', error });
  }
});


// start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
