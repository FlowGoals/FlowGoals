import * as Crypto from 'expo-crypto';

function hashPassword(password: string) {
  return new Promise<string>((resolve) => {
    Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password)
      .then((digest) => resolve(digest));
  });
}

export { hashPassword };
