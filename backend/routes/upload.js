const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = path.join(__dirname, '../data/uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

router.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  abortOnLimit: true,
}));

router.post('/', async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ success: false, error: 'No files were uploaded.' });
    }

    const section = req.body.section || 'others';
    const files = req.files.file;
    const filesArray = Array.isArray(files) ? files : [files];

    const savedFiles = [];

    for (const file of filesArray) {
      // Validate file type
      const allowedExtensions = ['.pdf', '.ppt', '.pptx', '.doc', '.docx'];
      const ext = path.extname(file.name).toLowerCase();
      if (!allowedExtensions.includes(ext)) {
        return res.status(400).json({ success: false, error: `File type not allowed: ${file.name}` });
      }

      // Create section directory if not exists
      const sectionDir = path.join(UPLOAD_DIR, section);
      if (!fs.existsSync(sectionDir)) {
        fs.mkdirSync(sectionDir, { recursive: true });
      }

      // Save file
      const filePath = path.join(sectionDir, file.name);
      await file.mv(filePath);

      savedFiles.push({
        name: file.name,
        path: filePath,
        section: section,
        size: file.size,
      });
    }

    res.json({ success: true, files: savedFiles });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, error: 'File upload failed' });
  }
});

module.exports = router;
