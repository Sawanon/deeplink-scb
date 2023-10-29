const axios = require('axios').default

const getAccessToken = async () => {
    try {
        const response = await axios({
            url: `https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token`,
            method: "POST",
            headers: {
                resourceOwnerId: "l7c745e0d166894c51ad1db5ea0eaffdb4",
                requestUId: "A v4 style guid",
                "accept-language" : "EN",
            },
            data: {
                applicationKey : "l7c745e0d166894c51ad1db5ea0eaffdb4",
                applicationSecret : "73eb3a4c25ff4e0a89fbec88bbb20fe8",
            }
        })
        // console.log("response 13: ", response.data);
        return response.data.data.accessToken
    } catch (error) {
        console.error(`${error}`)
    }
}

module.exports = {
    getAccessToken,
}