const crypto = require('crypto');

/**
 * MD5加密
 * @param str
 * @returns {string}
 */
function md5 (str) {
  const md5Hash = crypto.createHash("md5");
  md5Hash.update(str);
  const s = md5Hash.digest('hex');
  return s.toUpperCase();
}

/**
 * AES加密
 * @param data
 * @param key
 * @returns {String}
 */
function aesEncrypt(data, key) {
  const cipher = crypto.createCipher('aes192', key);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

/**
 * AES解密
 * @param encrypted
 * @param key
 * @returns {String}
 */
function aesDecrypt(encrypted, key) {
  const decipher = crypto.createDecipher('aes192', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

function signWithMd5(obj, salt) {
  const keys = Object.keys(obj).sort();
  const s = [];
  s.push(salt);
  for (let k of keys) {
    const v = obj[k];
    // 不考虑空值的字段
    if (v !== undefined && v !== null) {
      s.push(k, v)
    } else {
      delete obj[k];
    }
  }
  s.push(salt);
  return md5(s.join(''));
}

export default {
  md5,
  aesEncrypt,
  aesDecrypt,
  signWithMd5
};
