import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const getFingerPrint = () => {
    return FingerprintJS.load()
        .then(fp => fp.get())
        .then(result => result.visitorId);
};