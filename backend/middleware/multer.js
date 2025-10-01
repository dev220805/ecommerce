import multer from 'multer'

const storage = multer.memoryStorage()

const fileFilter = (request, file, cb) => {
    if(file.mimetype && file.mimetype.startsWith('image/')){
        cb(null, true)
    }else{
        cb(new Error('Only image uploads are allowed'), false)
    }
}

const upload = multer({ storage, fileFilter, limits : { fileSize : 5 * 1024 * 1024 }})

export default upload


