var fs = require("fs")
const R = require("ramda")
var ArgumentParser = require("argparse").ArgumentParser
const NodeRSA = require("node-rsa")

var parser = new ArgumentParser({ add_help: true, description: "" })
parser.add_argument("-P", "--privkey", { help: "Priv Key file path", required: false, default: "" })
parser.add_argument("-p", "--pubkey", { help: "Pub Key file path", required: false, default: "" })
parser.add_argument("--text", { help: "Text to encrypt or decrypt", default: "hello world" })
// parser.add_argument("-e", "--encrypt", { help: "Whether to encrypt or not", action: "store_const", const: "public", default: "" })
parser.add_argument("-e", "--encrypt", { help: "Whether to encrypt or not", nargs:'?', const:"public", choices:["", "public", "private"], default: "" })
parser.add_argument("-d", "--decrypt", { help: "Whether to decrypt or not", nargs:'?', const:"private", choices:["", "public", "private"], default: "" })
// parser.add_argument("-d", "--decrypt", { help: "Whether to decrypt or not", action: "store_const", const: "private", default: "" })
parser.add_argument("--debug", { help: "Debug flag", action: "store_true", default: false })

var args = parser.parse_args()
args = R.pipe(
  R.toPairs,
  R.filter(([k, v]) => v !== null),
  R.fromPairs
)(args)

if(!args.encrypt && !args.decrypt)
  parser.error("requires either --encrypt or --decrypt")

var privkey, pubkey


if(args.privkey) privkey = fs.readFileSync(args.privkey).toString() || assert("Cannot read private key")
if(args.pubkey) pubkey = fs.readFileSync(args.pubkey).toString() || assert("Cannot read public key")
if(args.debug) console.log("privatekey", privkey, "\n", "publickey", pubkey)
if(args.debug) console.log("privatekey", privkey, "\n", "publickey", pubkey)

var enckey, enccrt, deckey, deccrt, msg

if(args.debug) console.log("args", args)
if(args.encrypt === "public" && pubkey) kpub = new NodeRSA(pubkey)
if(args.encrypt === "private" && privkey) kpriv = new NodeRSA(privkey)

if(args.decrypt === "public" && pubkey) kpub = new NodeRSA(pubkey)
if(args.decrypt === "private" && privkey) kpriv = new NodeRSA(privkey)

var encrypted, uncrypted
if(args.encrypt) {
  encrypted = args.encrypt === "public" ? kpub.encrypt(args.text, "base64") : kpriv.encryptPrivate(args.text, "base64")
  if(args.debug) console.log(args.text, encrypted)
  console.log(encrypted.toString())
}
if(args.decrypt && !args.encrypt) {
  uncrypted = args.decrypt === "public" ? kpub.decryptPublic(args.text) : kpriv.decrypt(args.text)
  console.log(uncrypted.toString())
}

if(args.decrypt && args.encrypt) {
  uncrypted = args.decrypt === "public" ? kpub.decryptPublic(encrypted) : kpriv.decrypt(encrypted)
  console.log(uncrypted.toString())
}
