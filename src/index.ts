import axios from "axios";
import express from "express";

const app = express();

app.get("/", async (req: express.Request, res: express.Response) => {
    if (!req.query.mailNos) {
        res.status(400).send();
        return;
    }
    
    try {
        const response = await axios.get(`https://global.cainiao.com/global/detail.json?mailNos=${req.query.mailNos}&lang=en-US`);
        if (!response.headers['content-type'] || response.headers['content-type'].indexOf('text/html') !== -1) {
            res.status(429).send();
            return;
        }
        res.json(response.data);
    } catch (e) {
        res.status(500).send();
        return;
    }

});

app.listen(3000, () => {
    console.log('started server');
});