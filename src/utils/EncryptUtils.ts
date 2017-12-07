import { Injectable } from "@angular/core";
import CryptoJS from "crypto-js";

declare let JSEncrypt;
@Injectable()
export class EncryptUtils {
    private encrypt = new JSEncrypt();
    private public_key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC1k10wulc/MjjWJqVHgrfGJDCYlIn0dpGM9bp/wRmHt17DErh0RVWevqYrVOIcOqsX6ij5np3wKjKBtXczWTrqBvKwj5mDeJkJnTOa1iTDr1sNPAhcU6HnQ1hkQy9HkdsOL2AqkgvuBUgNvF2ldQF2lSjnvTrtWareHnCNA9gT5wIDAQAB";
    private max_encrypt_lenght: number = 245;

    constructor() {
        this.encrypt.setPublicKey(this.public_key);
    }

    public decodeForAES(text: string, keyStr: string): string {
        return CryptoJS.AES.decrypt(text, keyStr, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);
    }

    public encodeFroAES(text:string,keyStr:string):string{
        return CryptoJS.AES.encrypt(text, keyStr,{
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString();

    }
    public encodeForRSA(text: string): string {
        text = encodeURI(text);
        let inputLen: number = text.length;
        let offSet: number = 0;
        let secureData = "";
        let i: number = 0;
        let end: number = 0;
        // 对数据分段加密
        while (inputLen - offSet > 0) {
            if ((inputLen - offSet) > this.max_encrypt_lenght) {
                end = offSet + this.max_encrypt_lenght;
            } else {
                end = inputLen;
            }
            let subString = text.substring(offSet, end);
            secureData = secureData + this.encrypt.encrypt(subString) + "|";
            i++;
            offSet = i * this.max_encrypt_lenght;
        }
        secureData = secureData.substring(0, secureData.length - 1);
        return secureData;
    }

    public encodeMD5(text:string):string{
        return CryptoJS.MD5(text);
    }
}