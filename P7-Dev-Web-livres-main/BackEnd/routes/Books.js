const express = require('express');
const auth = require('../middleware/Auth.js');
const router = express.Router();
const bookCtrl = require('../controllers/Books-cntrl.js');
const { upload, compressImage } = require('../middleware/Multer-config.js');
// Book routes
router.get('/', bookCtrl.getBooks);
router.post('/', auth, upload, compressImage, bookCtrl.createBook);
router.put('/:id', auth,upload,compressImage, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.get('/:id', auth, bookCtrl.getOneBook);
router.post('/:id/rating', auth, bookCtrl.rateBooks);
router.get('/bestrating', bookCtrl.getBestRated); 

module.exports = router;
