const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');


const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
};


const storage = multer.memoryStorage();  


const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    if (extension) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type'), false);
    }
  }
}).single('image');  


const compressImage = async (req, res, next) => {
  if (!req.file) {
    return next();  
  }

  
  const outputPath = path.join(__dirname, '../images', `${Date.now()}-optimized.jpg`);

  try {
    
    await sharp(req.file.buffer)
      .resize(800)  
      .jpeg({ quality: 80 })  
      .toFile(outputPath); 

    
    req.file.filename = path.basename(outputPath);
    req.file.path = outputPath;

    next();  
  } catch (error) {
    return res.status(500).json({ error: 'Image compression failed!' });
  }
};

module.exports = { upload, compressImage };
