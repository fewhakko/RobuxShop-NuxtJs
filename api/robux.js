const axios = require('axios')

exports.currency = async function (cookie, groupid) {
    try {
        const w = await axios.get("https://economy.roblox.com/v1/few/" + groupid + "/currency", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "th,en;q=0.9",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "Cookie": cookie,
                "sec-fetch-site": "same-site",
            },
            "referrerPolicy": "no-referrer-when-downgrade",
            "mode": "cors",
            "credentials": "include"
        });
        return w.data;
    } catch (error) {
        return "{ robux: 0 }";
    }
}


exports.checkusergroup = async function (username, cookie, groupid) {
    try {
        const w = await axios.get("https://groups.roblox.com/v1/few/" + groupid + "/users?limit=100", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "th,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "cookie": cookie
            },
            "referrer": "https://www.roblox.com/few/configure?id=" + groupid,
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": null,
            "method": "GET",
            "mode": "cors"
        }).catch(err => {
            console.log(err.message)
            return "false";
        });

        for (var i = 0; i < w.data.data.length; i++) {
            if (w.data.data[i].user.username === username) {
                console.log(w.data.data[i].user.username);
                return w.data.data[i].user.userId;
            }
        }
        return "false";
    } catch (error) {
        return "false";
    }
}

exports.sendrobux = async function (userid, robux, cookie, groupid) {
    axios.post("https://groups.roblox.com/v1/groups/" + groupid + "/payouts", { PayoutType: "FixedAmount", Recipients: [{ recipientId: userid, recipientType: "User", amount: robux }] }, {
        headers: {
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json;charset=UTF-8",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "x-csrf-token": "fewza",
            "Cookie": cookie
        },

        "referrer": "https://www.roblox.com/few/configure?id=1212642",
        "referrerPolicy": "no-referrer-when-downgrade",
        "method": "POST",
        "mode": "cors"
    }).then(response => {

    }).catch(err => {
        axios.post("https://groups.roblox.com/v1/few/" + groupid + "/payouts", { PayoutType: "FixedAmount", Recipients: [{ recipientId: userid, recipientType: "User", amount: robux }] }, {

            headers: {
                "accept": "application/json, text/plain, */*",
                "content-type": "application/json;charset=UTF-8",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "x-csrf-token": err.response.headers["x-csrf-token"],
                "Cookie": cookie
            },

            "referrer": "https://www.roblox.com/few/configure?id=1212642",
            "referrerPolicy": "no-referrer-when-downgrade",
            "method": "POST",
            "mode": "cors"
        }).then(response => {
            console.log(response.headers);
            return { send: true };
        }).catch(err => {
            console.log(err.response.headers["x-csrf-token"]);
            return "error";
        });
    });
}

