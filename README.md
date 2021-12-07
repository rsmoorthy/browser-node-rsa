## Methods to use RSA/AES encryption between NodeJS and Browser

There is a need to encrypt a key using RSA from NodeJs (via private key) and decrypt using Browser (via public key). This
template will help setup the real one.

### Overview

The setup envisages that the server sends the data encrypted using AES to the
browser. The browser should use the AES key to  decrypt the data.

How will the AES key be known to the browser? The AES key itself is encrypted
using RSA private key on the server side and  sent to the browser. It is
expected that each session will have one AES key. The browser is expected to
decrypt the encrypted AES key via RSA public key, that it is embedded in its
code.

How does the browser embed the RSA public key within itself? The RSA public key
itself is encrypted by another AES key, and this AES key is also embedded in the
browser source. This AES key is so chosen that it looks like normal code
(something like "Content-Type: application/json"). Of course,  all of this will
only make sense, if the browser js code is completely minified.

### Synopsis

To test the env, do these steps:
1.  Install the node packages
```sh
npm install
```

2.  Create RSA keypair. The `server.priv` will never be sent out, while `server.pub` will be encrypted within the browser
```sh
bash create_keypair.sh server   # It will create server.pub and server.priv keys
```

3.  Edit rsaEncKey.js to set the AES password (that is used to encrypt the RSA pub key)
4.  Run the following: (the output `bundle.js`) should be part of the browser code (part of `index.html`)
```sh
npx browserify browser.js -p tinyify -o bundle.js --standalone browserEnc
```
5.  Run this command to start the test server:
```sh
node app.js
```
6.  Open the browser and load `http://localhost:4040/`. You shuld see the AES
key, Encrypted Data and the actual decrypted data in 3 different boxes.
