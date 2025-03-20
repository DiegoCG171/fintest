import CryptoJS from 'crypto-js'

export const getEncrypted = (password: string): string => {
    const hash = CryptoJS.SHA256(password).toString();
    const passwordNew = btoa(hash);
    return passwordNew;
};