import CryptoJS from 'crypto-js'

export const getEncrypted = (password: string): string => {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
};
