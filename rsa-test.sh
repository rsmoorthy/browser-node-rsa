TEXT="work is_god"


# Encrypt using private key
ENCRYPTED=$(node rsa-tst-nodersa.js -P server.priv --text "$TEXT" -e private)
# Decrypt using public key
DECRYPTED=$(node rsa-tst-nodersa.js -p server.pub -d public --text $ENCRYPTED)

if [[ "$DECRYPTED" == "$TEXT" ]]; then
  echo "nodejs to browser rsa comm okay"
else
  echo "nodejs to browser rsa comm failed"
fi
