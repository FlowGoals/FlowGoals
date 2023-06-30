import * as Crypto from 'expo-crypto';

const encryptPassword = async (password: string) => {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password,
  );
  return digest;
};

export { encryptPassword };
