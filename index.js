const express = require('express')
const { getAccessToken } = require('./auth')
const { default: axios } = require('axios')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/', (req, res) => {
    console.log(req.body);
    res.send('test post')
})

app.get('/transactions/:transactionId', async (req, res) => {
    const params = req.params
    const transactionId = params.transactionId
    const accessToken = await getAccessToken()
    console.log("accessToken: ", accessToken);
    const response = await axios({
        url: `https://api-sandbox.partners.scb/partners/sandbox/v2/transactions/${transactionId}`,
        method: "GET",
        headers: {
            authorization: `Bearer ${accessToken}`,
            resourceOwnerId: `l7c745e0d166894c51ad1db5ea0eaffdb4`,
            requestUId: `A v4 style guid`,
            "accept-language": `EN`,
        }
    })
    console.log("response", JSON.stringify(response.data))
    res.json({
        message: 'OK',
        params: params.transactionId,
        data: response.data
    })
})

app.post('/buy', async (req, res) => {
    const accessToken = await getAccessToken()
    console.log("accessToken: ", accessToken);
    const response = await axios({
        url: `https://api-sandbox.partners.scb/partners/sandbox/v3/deeplink/transactions`,
        method: "POST",
        headers: {
            authorization: `Bearer ${accessToken}`,
            resourceOwnerId: `l7c745e0d166894c51ad1db5ea0eaffdb4`,
            requestUId: `A v4 style guid`,
            channel: `scbeasy`,
            "accept-language": `EN`,
        },
        data: {
            "transactionType": "PURCHASE",
            "transactionSubType": ["BP"],
            "sessionValidityPeriod": 120,
            "billPayment": {
                "paymentAmount": 100,
                "accountTo": "864824886376242",
                // "accountFrom": "123451234567890",
                "ref1": "ABCDEFGHIJ1234567890",
                "ref2": "ABCDEFGHIJ1234567890",
                "ref3": "ABCDEFGHIJ1234567890"
            },
            "merchantMetaData": {
                "callbackUrl": "lottobkk://lottosawanon.net/checkPayment",
                "merchantInfo": {
                    "name": "SANDBOX MERCHANT NAME"
                },
                "extraData": {},
                "paymentInfo": [
                    {
                        "type": "TEXT_WITH_IMAGE",
                        "title": "",
                        "header": "",
                        "description": "",
                        "imageUrl": ""
                    },
                    {
                        "type": "TEXT",
                        "title": "",
                        "header": "",
                        "description": ""
                    }
                ]
            }
        }
    })
    const now = new Date()
    console.log(`now: ${now.toISOString()}`);
    res.json({
        status: true,
        message: "ok",
        accessToken,
        data: response.data.data,
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})