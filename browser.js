const enc = require("./encryptKeys.js")
const pubkeyEncrypted = require("./pubkeyEncrypted.js")
var rsaEncKey = require("./rsaEncKey")

const decryptKey = (enckey) => {
  let pubkey = enc.aesDecrypt(rsaEncKey, pubkeyEncrypted)
  let aeskey = enc.rsaDecrypt(pubkey, enckey)
  return atob(aeskey.toString())
}
const decrypt = (key, text) => {
  return enc.aesDecrypt(key, text)
}

exports.f = {
  decryptKey,
  decrypt,
  enc
}
