var fs = require("fs")
var enc = require("./encryptKeys.js")
var rsaEncKey = require("./rsaEncKey.js")

let pubkey = fs.readFileSync("server.pub")
let encrypted = enc.aesEncrypt(rsaEncKey, pubkey)

console.log(`module.exports = "${encrypted}"`)
