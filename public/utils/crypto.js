const crypto = require("crypto");
const fs = require("fs");

const generateKeyPairs = async (req, res, next) => {
    crypto.generateKeyPair("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: "pkcs1", // public key  encrypting standard 8
            format: "pem" // format document choice in "pem",
        },
        privateKeyEncoding: {
            type: "pkcs1", // public key  encrypting standard 8
            format: "pem" // format document choice in "pem",
        }
    }, (err, publicKey, privateKey) => {
        // storing data in folder directory
        if (err) {
            console.log("Error in Generating Key Pairs:", err);
            res.render("500");
        }
        fs.writeFileSync(__dirname + "/keypairs/rsaPublicKey.pem", publicKey); // writing public key in folder
        fs.writeFileSync(__dirname + "/keypairs/rsaPrivateKey.pem", privateKey); // writing private key in folder
    });
}
const encrypt = (message) => {
    const publicKey = fs.readFileSync(__dirname + "/keypairs/rsaPublicKey.pem", "utf8") // get public key in utf8 format
    const messageInBuffer = Buffer.from(message, "utf8")  // getting raw data and covert it to buffer string 
    const result = crypto.publicEncrypt(publicKey, messageInBuffer)  // Encrypt buffer message with public key

    return result
}
const decrypt = (message) => {
    const privateKey = fs.readFileSync(__dirname + "/keypairs/rsaPrivateKey.pem", "utf8") // get public key in utf8 format
    const result = crypto.privateDecrypt(privateKey, message)  // Decrypt buffer message with private key

    return result
}


const crypto_encryptData = async (req, res, data) => {
    const isKeyGenerated = generateKeyPairs(res) //generate key pairs for encryption of data;
    if (isKeyGenerated) {
        console.log("key Pairs Generated");
        // encrypt data using the public key
        const message = data.img; // getting raw data 
        const encryptedData =  await encrypt(message);

        console.log(encryptedData.toString());
        return encryptedData;
        // ....
    }

}
const crypto_decryptData = async (encryptedData) => {
    const message = encryptedData
    const result = await decrypt(message);
    return result
}
module.exports = { crypto_encryptData, crypto_decryptData }