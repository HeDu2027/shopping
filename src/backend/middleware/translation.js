const { Translate } = require('@google-cloud/translate').v2;

const projectId = process.env.PROJECT_ID;
const apiKey = process.env.API_KEY;

const translate = new Translate({ projectId, key: apiKey });

exports.translateText = async (req, res) => {
    const { text, targetLanguage } = req.body;

    try {
        let [translations] = await translate.translate(text, targetLanguage);
        translations = Array.isArray(translations) ? translations : [translations];
        res.json({ translations });
    } catch (error) {
        console.error("Translation error:", error);
        res.status(500).json({ error: 'Translation failed' });
    }
};

