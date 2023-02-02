import express from "express";

const app = express();

app.get("/", async (req: express.Request, res: express.Response) => {
    const response = await fetch(`https://global.cainiao.com/global/detail.json?mailNos=${req.body.mailNos}&lang=en-US`)

    if (!response.headers.get('Content-Type') || response.headers.get('Content-Type')!.indexOf('text/html') !== -1) {
        return res.status(429);
    }
    res.json(await response.json());
});