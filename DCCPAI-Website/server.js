// import express from 'express';
// import multer from 'multer';
// import cors from 'cors';
// import { join, extname, parse } from 'path';
// import fs from 'fs';

// const app = express();
// app.use(cors());
// app.use(express.json()); // For parsing JSON request bodies

// // Set storage engine for multer to save to 'public/uploads/temp' temporarily
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const tempDir = join(process.cwd(), 'public/uploads/temp');
//     if (!fs.existsSync(tempDir)) {
//       fs.mkdirSync(tempDir, { recursive: true });
//     }
//     cb(null, tempDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname); // Ensures temp file has a unique name
//   }
// });

// const upload = multer({ storage }).array('images', 10);

// // Route to upload files without overwriting, skipping existing filenames
// app.post('/upload', (req, res) => {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json({ success: false, message: 'Multer error', error: err.message });
//     } else if (err) {
//       return res.status(500).json({ success: false, message: 'Unknown error', error: err.message });
//     }

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ success: false, message: 'No files uploaded' });
//     }

//     const folderName = req.body.foldername || 'default';
//     const filenamePrefix = req.body.filename || 'file'; // Default prefix if not provided
//     const finalFolderPath = join(process.cwd(), 'public/uploads', folderName);

//     if (!fs.existsSync(finalFolderPath)) {
//       fs.mkdirSync(finalFolderPath, { recursive: true });
//     }

//     // Function to find the next available filename
//     const getNextAvailableFilename = (prefix, extension) => {
//       let currentIndex = 1; // Start from 1
//       let availableFilename;

//       while (true) {
//         availableFilename = `${prefix}-${currentIndex}${extension}`;
//         const filePath = join(finalFolderPath, availableFilename);
//         if (!fs.existsSync(filePath)) {
//           return availableFilename; // Return as soon as we find an available filename
//         }
//         currentIndex++; // Increment the index and check the next one
//       }
//     };

//     // Move and rename each file, ensuring unique filenames by skipping existing ones
//     const uploadedFiles = [];
//     req.files.forEach((file) => {
//       const availableFilename = getNextAvailableFilename(filenamePrefix, extname(file.originalname));
//       const finalFilePath = join(finalFolderPath, availableFilename);

//       // Move the file to its final location
//       fs.renameSync(join(process.cwd(), 'public/uploads/temp', file.filename), finalFilePath);
//       uploadedFiles.push(`/uploads/${folderName}/${availableFilename}`);
//     });

//     // Return the list of uploaded files
//     res.json({
//       success: true,
//       files: uploadedFiles
//     });
//   });
// });


// // Route to fetch all filenames (without extensions) in a folder
// app.get('/filenames', (req, res) => {
//   const folderName = req.query.foldername || 'default';
//   const folderPath = join(process.cwd(), 'public/uploads', folderName);

//   // Check if folder exists
//   if (!fs.existsSync(folderPath)) {
//     return res.status(404).json({ success: false, message: 'Folder not found' });
//   }

//   // Read all files from the folder, and return filenames without extensions
//   const files = fs.readdirSync(folderPath).map(file => parse(file).name);
  
//   res.json({
//     success: true,
//     files
//   });
// });

// // Route to fetch all files in a folder
// app.get('/files', (req, res) => {
//   const folderName = req.query.foldername || 'default';
//   const folderPath = join(process.cwd(), 'public/uploads', folderName);

//   // Check if folder exists
//   if (!fs.existsSync(folderPath)) {
//     return res.status(404).json({ success: false, message: 'Folder not found' });
//   }

//   // Read all files from the folder
//   const files = fs.readdirSync(folderPath).map(file => `/uploads/${folderName}/${file}`);
//   res.json({
//     success: true,
//     files
//   });
// });

// // Route to delete specific files without specifying file extension
// app.delete('/delete-file', (req, res) => {
//   const folderName = req.body.foldername || 'default';
//   const deletedFilename = req.body.deletedFilename;

//   if (!deletedFilename) {
//     return res.status(400).json({ success: false, message: 'Filename not provided' });
//   }

//   const folderPath = join(process.cwd(), 'public/uploads', folderName);

//   if (!fs.existsSync(folderPath)) {
//     return res.status(404).json({ success: false, message: 'Folder not found' });
//   }

//   // Find any file that starts with the deletedFilename
//   const matchingFiles = fs.readdirSync(folderPath).filter(file => {
//     return file.startsWith(deletedFilename);
//   });

//   if (matchingFiles.length === 0) {
//     return res.status(404).json({ success: false, message: 'File not found' });
//   }

//   // Delete the matched file(s)
//   matchingFiles.forEach(file => {
//     const filePath = join(folderPath, file);
//     fs.unlinkSync(filePath);
//   });

//   res.json({ success: true, message: `File(s) deleted: ${matchingFiles.join(', ')}` });
// });

// // Route to overwrite a file without specifying file extension
// app.post('/overwrite-file', (req, res) => {
//   const overwriteStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       const tempDir = join(process.cwd(), 'public/uploads/temp');
//       if (!fs.existsSync(tempDir)) {
//         fs.mkdirSync(tempDir, { recursive: true });
//       }
//       cb(null, tempDir);
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname); // Use original file name for temp storage
//     }
//   });

//   const overwriteUpload = multer({ storage: overwriteStorage }).single('file');

//   overwriteUpload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json({ success: false, message: 'Multer error', error: err.message });
//     } else if (err) {
//       return res.status(500).json({ success: false, message: 'Unknown error', error: err.message });
//     }

//     const folderName = req.body.foldername || 'default';
//     const filename = req.body.filename; // Filename without extension
//     const finalFolderPath = join(process.cwd(), 'public/uploads', folderName);

//     if (!filename) {
//       return res.status(400).json({ success: false, message: 'Filename not provided' });
//     }

//     if (!fs.existsSync(finalFolderPath)) {
//       fs.mkdirSync(finalFolderPath, { recursive: true });
//     }

//     // Find any file that starts with the given filename
//     const matchingFiles = fs.readdirSync(finalFolderPath).filter(file => file.startsWith(filename));

//     if (matchingFiles.length === 0) {
//       return res.status(404).json({ success: false, message: 'File not found for overwriting' });
//     }

//     // Overwrite the first matching file (we assume one file should match)
//     const originalFile = matchingFiles[0];
//     const finalFilePath = join(finalFolderPath, originalFile);

//     // Delete the existing file before overwriting
//     if (fs.existsSync(finalFilePath)) {
//       fs.unlinkSync(finalFilePath);
//     }

//     // Move the new file to the correct directory, keeping the original extension
//     const tempFilePath = join(process.cwd(), 'public/uploads/temp', req.file.filename);
//     fs.renameSync(tempFilePath, finalFilePath);

//     res.json({
//       success: true,
//       message: `File overwritten successfully: ${originalFile}`,
//       filePath: `/uploads/${folderName}/${originalFile}`
//     });
//   });
// });


// // Route to fetch specific file(s) by filename without extension
// app.get('/files-by-filename', (req, res) => {
//   const folderName = req.query.foldername || 'default';
//   const filename = req.query.filename; // The filename without extension
//   const folderPath = join(process.cwd(), 'public/uploads', folderName);

//   if (!filename) {
//     return res.status(400).json({ success: false, message: 'Filename not provided' });
//   }

//   // Check if the folder exists
//   if (!fs.existsSync(folderPath)) {
//     return res.status(404).json({ success: false, message: 'Folder not found' });
//   }

//   // Find all files that start with the given filename
//   const matchingFiles = fs.readdirSync(folderPath).filter(file => {
//     return file.startsWith(filename); // Match files that start with the given filename
//   });

//   if (matchingFiles.length === 0) {
//     return res.status(404).json({ success: false, message: 'No matching files found' });
//   }

//   // Return the full paths of the matched files
//   const filesWithPaths = matchingFiles.map(file => `/uploads/${folderName}/${file}`);

//   res.json({
//     success: true,
//     files: filesWithPaths
//   });
// });



// app.use(express.static('public'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { join, extname, parse } from 'path';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON request bodies

// Set storage engine for multer to save to 'public/uploads/temp' temporarily
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = join(process.cwd(), 'public/uploads/temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Ensures temp file has a unique name
  }
});

const upload = multer({ storage }).array('images', 10);

// Route to upload files without overwriting, skipping existing filenames
app.post('/upload', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ success: false, message: 'Multer error', error: err.message });
    } else if (err) {
      return res.status(500).json({ success: false, message: 'Unknown error', error: err.message });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    const folderName = req.body.foldername || 'default';
    const filenamePrefix = req.body.filename || 'file'; // Default prefix if not provided
    const finalFolderPath = join(process.cwd(), 'public/uploads', folderName);

    if (!fs.existsSync(finalFolderPath)) {
      fs.mkdirSync(finalFolderPath, { recursive: true });
    }

    // Function to find the next available filename, considering all file extensions
    const getNextAvailableFilename = (prefix, extension) => {
      const existingFiles = fs.readdirSync(finalFolderPath)
        .filter(file => file.startsWith(prefix)) // Consider all files with the same prefix
        .map(file => parse(file).name); // Extract the base name without extension

      // Find the highest existing index
      let currentIndex = 1;
      if (existingFiles.length > 0) {
        const indices = existingFiles.map(name => {
          const parts = name.split('-');
          const index = parseInt(parts[parts.length - 1], 10);
          return isNaN(index) ? 0 : index;
        });
        currentIndex = Math.max(...indices) + 1; // Get the next available index
      }

      // Return the new filename with the correct index and extension
      return `${prefix}-${currentIndex}${extension}`;
    };

    // Move and rename each file, ensuring unique filenames by skipping existing ones
    const uploadedFiles = [];
    req.files.forEach((file) => {
      const availableFilename = getNextAvailableFilename(filenamePrefix, extname(file.originalname));
      const finalFilePath = join(finalFolderPath, availableFilename);

      // Move the file to its final location
      fs.renameSync(join(process.cwd(), 'public/uploads/temp', file.filename), finalFilePath);
      uploadedFiles.push(`/uploads/${folderName}/${availableFilename}`);
    });

    // Return the list of uploaded files
    res.json({
      success: true,
      files: uploadedFiles
    });
  });
});


// Route to fetch all filenames (without extensions) in a folder
app.get('/filenames', (req, res) => {
  const folderName = req.query.foldername || 'default';
  const folderPath = join(process.cwd(), 'public/uploads', folderName);

  // Check if folder exists
  if (!fs.existsSync(folderPath)) {
    return res.status(404).json({ success: false, message: 'Folder not found' });
  }

  // Read all files from the folder, and return filenames without extensions
  const files = fs.readdirSync(folderPath).map(file => parse(file).name);
  
  res.json({
    success: true,
    files
  });
});

// Route to fetch all files in a folder
app.get('/files', (req, res) => {
  const folderName = req.query.foldername || 'default';
  const folderPath = join(process.cwd(), 'public/uploads', folderName);

  // Check if folder exists
  if (!fs.existsSync(folderPath)) {
    return res.status(404).json({ success: false, message: 'Folder not found' });
  }

  // Read all files from the folder
  const files = fs.readdirSync(folderPath).map(file => `/uploads/${folderName}/${file}`);
  res.json({
    success: true,
    files
  });
});

// Route to delete specific files without specifying file extension
app.delete('/delete-file', (req, res) => {
  const folderName = req.body.foldername || 'default';
  const deletedFilename = req.body.deletedFilename;

  if (!deletedFilename) {
    return res.status(400).json({ success: false, message: 'Filename not provided' });
  }

  const folderPath = join(process.cwd(), 'public/uploads', folderName);

  if (!fs.existsSync(folderPath)) {
    return res.status(404).json({ success: false, message: 'Folder not found' });
  }

  // Find any file that starts with the deletedFilename
  const matchingFiles = fs.readdirSync(folderPath).filter(file => {
    return file.startsWith(deletedFilename);
  });

  if (matchingFiles.length === 0) {
    return res.status(404).json({ success: false, message: 'File not found' });
  }

  // Delete the matched file(s)
  matchingFiles.forEach(file => {
    const filePath = join(folderPath, file);
    fs.unlinkSync(filePath);
  });

  res.json({ success: true, message: `File(s) deleted: ${matchingFiles.join(', ')}` });
});

// Route to overwrite a file without specifying file extension
app.post('/overwrite-file', (req, res) => {
  const overwriteStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const tempDir = join(process.cwd(), 'public/uploads/temp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      cb(null, tempDir);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Use original file name for temp storage
    }
  });

  const overwriteUpload = multer({ storage: overwriteStorage }).single('file');

  overwriteUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ success: false, message: 'Multer error', error: err.message });
    } else if (err) {
      return res.status(500).json({ success: false, message: 'Unknown error', error: err.message });
    }

    const folderName = req.body.foldername || 'default';
    const filename = req.body.filename; // Filename without extension
    const finalFolderPath = join(process.cwd(), 'public/uploads', folderName);

    if (!filename) {
      return res.status(400).json({ success: false, message: 'Filename not provided' });
    }

    if (!fs.existsSync(finalFolderPath)) {
      fs.mkdirSync(finalFolderPath, { recursive: true });
    }

    // Find any file that starts with the given filename
    const matchingFiles = fs.readdirSync(finalFolderPath).filter(file => file.startsWith(filename));

    if (matchingFiles.length === 0) {
      return res.status(404).json({ success: false, message: 'File not found for overwriting' });
    }

    // Overwrite the first matching file (we assume one file should match)
    const originalFile = matchingFiles[0];
    const finalFilePath = join(finalFolderPath, originalFile);

    // Delete the existing file before overwriting
    if (fs.existsSync(finalFilePath)) {
      fs.unlinkSync(finalFilePath);
    }

    // Move the new file to the correct directory, keeping the original extension
    const tempFilePath = join(process.cwd(), 'public/uploads/temp', req.file.filename);
    fs.renameSync(tempFilePath, finalFilePath);

    res.json({
      success: true,
      message: `File overwritten successfully: ${originalFile}`,
      filePath: `/uploads/${folderName}/${originalFile}`
    });
  });
});


// Route to fetch specific file(s) by filename without extension
app.get('/files-by-filename', (req, res) => {
  const folderName = req.query.foldername || 'default';
  const filename = req.query.filename; // The filename without extension
  const folderPath = join(process.cwd(), 'public/uploads', folderName);

  if (!filename) {
    return res.status(400).json({ success: false, message: 'Filename not provided' });
  }

  // Check if the folder exists
  if (!fs.existsSync(folderPath)) {
    return res.status(404).json({ success: false, message: 'Folder not found' });
  }

  // Find all files that start with the given filename
  const matchingFiles = fs.readdirSync(folderPath).filter(file => {
    return file.startsWith(filename); // Match files that start with the given filename
  });

  if (matchingFiles.length === 0) {
    return res.status(404).json({ success: false, message: 'No matching files found' });
  }

  // Return the full paths of the matched files
  const filesWithPaths = matchingFiles.map(file => `/uploads/${folderName}/${file}`);

  res.json({
    success: true,
    files: filesWithPaths
  });
});



app.use(express.static('public'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
