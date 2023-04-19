const OCR = require('../models/ocr.model');
const config = require('./../config/key');
const Utils = require('../service/utils');

exports.read = async function(req, res) {
    try {
        const { imageUrl } = req.body;
        if (Utils.isEmpty(imageUrl)) {
            return res.status(400).json({
                success: false,
                message: "imageUrl을 입력하세요.",
            });
        }

        let subImageUrls = imageUrl.split(".");
        const format = subImageUrls[subImageUrls.length - 1];

        const parseImageResult = await OCR.parseImage(imageUrl, format);
        if (parseImageResult == false) {
            return res.status(500).json({
                success: false,
                message: "image parsing 에 실패하였습니다",
            });
        }

        console.log(parseImageResult.data);
        
        let resultStr = "";
        const resultFields = parseImageResult.data.images[0].fields;
        for (let i = 0; i < resultFields.length; i++) {
            resultStr += (resultFields[i].inferText + " "); 
        }

        return res.status(200).json({
            success: true,
            result: resultStr
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "exception has occurred",
            error: err.message
        });
    }
}
