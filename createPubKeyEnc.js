var enc = require("./encryptKeys.js")

let encrypted = enc.createPubKeyString("server.pub")

console.log(`module.exports = "${encrypted}"`)
