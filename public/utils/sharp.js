const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");


//  IMPORTATION OF FILES
const { sharpStorage } = require("../controller/settings");
// ...

sharp.cache(false) // prevent sharp from caching images 
const resizeImage = async (sharpResize) => {
    const isExisted = fs.access(sharpStorage.resized);
    if (isExisted) {
        const result = await sharp(sharpResize.path)
        .resize(200, 200)
        .toFile(path.join(sharpStorage.resized, `/user_${sharpResize.emailId}.${sharpResize.fileExt}`)); // path of storage including renaming processed image
        
        return result;
    }
}
const compress_image = async (req, sharpResize) => {
    const isExisted = fs.access(sharpStorage.resized);

    if (isExisted) {
        // get path of the resized image from storage
        // read image from storage
            const data = await fs.readFile(path.join(sharpStorage.resized, `/user_${sharpResize.emailId}.${sharpResize.fileExt}`));
        // ....
        if (data) {
            console.log("Processing Image Compression....");
            // compress image
                const compressImage = await sharp(data)
                .toFormat("webp", {palette: true})
                .toFile(path.join(sharpStorage.compress, `/user_${sharpResize.emailId}.webp`));
            // ...
            console.log("compress image info:", compressImage);
            
            return compressImage
        }else {
            return "compress failed"
        }
    }
    // ....
}
module.exports = { resizeImage, compress_image }


            