import CryptoJS from "crypto-js";

function encrypt(text, password) {
  return CryptoJS.AES.encrypt(text, password).toString();
}

function decrypt(encrypted, password) {
  const decrypted = CryptoJS.AES.decrypt(encrypted, password);
  return CryptoJS.enc.Utf8.stringify(decrypted);
}

export { encrypt, decrypt };
