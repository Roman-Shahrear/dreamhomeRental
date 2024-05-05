import multer from "multer";


/* ---- Configuration Multer for file upload ---- */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads'); //storage uploaded files in the uploads folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // use the orginal file name 
    },
});

// Define the upload object with the configured storage
const upload = multer({ storage: storage });

export default upload;