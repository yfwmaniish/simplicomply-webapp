const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
const avatarsDir = path.join(uploadsDir, 'avatars');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, avatarsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, `avatar-${req.user.id}-${uniqueSuffix}${extension}`);
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  // Check if file is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1
  },
  fileFilter: fileFilter
});

// Middleware for avatar upload
const uploadAvatar = upload.single('avatar');

// Error handling middleware for upload
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 5MB.'
      });
    }
    
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Only one file allowed.'
      });
    }
    
    return res.status(400).json({
      success: false,
      message: 'Upload error: ' + err.message
    });
  }
  
  if (err.message === 'Only image files are allowed') {
    return res.status(400).json({
      success: false,
      message: 'Only image files (JPEG, PNG, GIF, WebP) are allowed.'
    });
  }
  
  next(err);
};

// Clean up old avatar files
const cleanupOldAvatar = async (userId) => {
  try {
    const files = fs.readdirSync(avatarsDir);
    const userFiles = files.filter(file => file.startsWith(`avatar-${userId}-`));
    
    // Keep only the most recent file and delete older ones
    if (userFiles.length > 1) {
      const sortedFiles = userFiles.sort((a, b) => {
        const statA = fs.statSync(path.join(avatarsDir, a));
        const statB = fs.statSync(path.join(avatarsDir, b));
        return statB.mtime.getTime() - statA.mtime.getTime();
      });
      
      // Delete all but the most recent file
      for (let i = 1; i < sortedFiles.length; i++) {
        const filePath = path.join(avatarsDir, sortedFiles[i]);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }
  } catch (error) {
    console.error('Error cleaning up old avatar files:', error);
  }
};

module.exports = {
  uploadAvatar,
  handleUploadError,
  cleanupOldAvatar
};
