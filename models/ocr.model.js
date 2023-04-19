const axios = require(`axios`);
const Utils = require('../service/utils');
const CONFIG = require('./../config/key');

exports.parseImage = async(imageUrl, format) => {
    const headers =  {
        "content-type": 'application/json',
        "X-OCR-SECRET": CONFIG.SECRET_KEY,
    };

    const body = {
        "images": [
            {
                "format" : format,
                "name": "medium",
                "data": null,
                "url": imageUrl
            }
        ],
        "lang": "ko",
        "requestId": "string",
        "resultType": "string",
        "timestamp": Date.now(),
        "version": "V1",
    };

    try {
        const response = await axios.post("https://yjat31d9m1.apigw.ntruss.com/custom/v1/21901/b8a1d97a8a44266b3a8ff0b623105e8dfe187339acd2f9115e574c1a645805db/general", body, {headers});
        if (response.status != 200) {
            return false;
        }
        return response;
    } catch (err) {
        console.log(err);
        return false;
    }
}