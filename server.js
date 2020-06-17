const express = require('express'); 
const multer = require('multer');
const cors = require('cors');
const app = express();
 
app.use(express.static('public'))
 
    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/images/uploads')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
    });
    const upload = multer({ storage })
 
    app.use(cors());
 
    app.post('/upload', upload.single('image'), (req, res) => {
        if (req.file)
            res.json({
                imageUrl: `images/uploads/${req.file.filename}`
            });
        else 
        res.status("409").json("No Files to Upload.");
    });
 
const PORT = 5000;
 
app.listen(PORT);
console.log('app runnging on port: ' + PORT);