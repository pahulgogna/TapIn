import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import puppeteer from 'puppeteer';
import showdown from 'showdown';
import { writeFileSync, unlinkSync } from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors(corsOptions));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); 

cloudinary.config({
    cloud_name: "dhgo1ihsp",
    api_key: "326286395157834",
    api_secret: "7QQPsRQJsN-pFq5DpW9_IcNnJSE",
});


app.post('/convert', async (req, res) => {
    try {
        const { markdown } = req.body;
        if (!markdown) return res.status(400).json({ error: "Markdown content is required" });

        // ✅ Convert Markdown to HTML
        const converter = new showdown.Converter();
        const htmlContent = converter.makeHtml(markdown);

        // ✅ Generate PDF using Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(`<html><body>${htmlContent}</body></html>`);
        const pdfBuffer = await page.pdf({ format: "A4" });
        await browser.close();

        // ✅ Save PDF temporarily
        const pdfPath = join(__dirname, 'output.pdf');
        writeFileSync(pdfPath, pdfBuffer);

        // ✅ Upload PDF to Cloudinary
        const result = await cloudinary.uploader.upload(pdfPath, { resource_type: "raw" });

        // ✅ Delete temp file
        unlinkSync(pdfPath);

        res.status(200).json({ pdfUrl: result.secure_url });
    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
