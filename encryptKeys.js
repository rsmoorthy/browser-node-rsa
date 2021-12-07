// This file provides key management functions for
// server side: generate random AES keys, encrypt the AES key using private RSA key // client side: decrypt the AES key using public RSA key
//
// This file also provides encryption and decryption of text using AES keys
// server side: encrypt data using AES key
// client side: decrypt data using AES key
//

const NodeRSA = require("node-rsa")
const aesjs = require("aes-js")

const getNewKey = (length=33) => {
  let result = "", seeds

  for(let i = 0; i < length - 1; i++){
    //Generate seeds array, that will be the bag from where randomly select generated char
    seeds = [
      Math.floor(Math.random() * 10) + 48,
      Math.floor(Math.random() * 25) + 65,
      Math.floor(Math.random() * 25) + 97
    ]

    //Choise randomly from seeds, convert to char and append to result
    result += String.fromCharCode(seeds[Math.floor(Math.random() * 3)])
  }
  return result
}

const fillText = (char, times) => {
  let ret = ""
  for(let i=0; i < times; i++) ret += char
  return ret
}

const aesEncrypt = (password, text) => {
  if(password.length  < 32) password = password + fillText("0", 32 - password.length)
  let key = Buffer.from(password).slice(0, 32)
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  return aesjs.utils.hex.fromBytes(aesCtr.encrypt(aesjs.utils.utf8.toBytes(text)))
}

const aesDecrypt = (password, text) => {
  if(password.length  < 32) password = password + fillText("0", 32 - password.length)
  let key = Buffer.from(password).slice(0, 32)
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  return aesjs.utils.utf8.fromBytes(aesCtr.decrypt(aesjs.utils.hex.toBytes(text)))
}

const rsaEncrypt = (key, text) => {
  let k = new NodeRSA(key)
  let ret = k.isPrivate() ? k.encryptPrivate(text, "base64") : k.encrypt(text, "base64")
  return ret.toString()
}

const rsaDecrypt = (key, text) => {
  let k = new NodeRSA(key)
  let ret = k.isPrivate() ? k.decrypt(text, "base64") : k.decryptPublic(text, "base64")
  return ret.toString()
}

module.exports = {
  getNewKey,
  aesEncrypt,
  aesDecrypt,
  rsaEncrypt,
  rsaDecrypt,
}
