import express from "express";

const app = express();

app.get("/", async (req: express.Request, res: express.Response) => {
    if (!req.query.mailNos) {
        res.status(400).send();
        return;
    }
    
    const response = await fetch(`https://global.cainiao.com/global/detail.json?mailNos=${req.query.mailNos}&lang=en-US`)
    console.log(response.headers)
    if (!response.headers.get('Content-Type') || response.headers.get('Content-Type')!.indexOf('text/html') !== -1) {
        res.status(429).send();
        return;
    }
    res.json(await response.json());
});

app.listen(3000, () => {
    console.log('started server');
});