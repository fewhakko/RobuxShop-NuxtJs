const axios = require('axios')
var strtotime = require('strtotime');

exports.getTransactions = async function (limit) {
    var start_date1 = strtotime('-30 Day +7 Hour');
    var end_date1 = strtotime('+1 Day');

    var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    var hours = start_date1.getFullYear() + "-" + months[start_date1.getMonth()] + "-" + start_date1.getDate();
    var hours1 = end_date1.getFullYear() + "-" + months[end_date1.getMonth()] + "-" + end_date1.getDate();

    const w = await axios.get("https://mobile-api-gateway.truemoney.com/mobile-api-gateway/user-profile-composite/v1/users/transactions/history/?start_date=" + hours + "&end_date=" + hours1 + "&limit=" + limit + "&page=1", {
        headers: {
            "Content-Type": "application/json",
            "User-Agent": "V1/5.5.1 (com.tdcm.truemoneywallet; build:674; iOS 13.3.1) Alamofire/4.8.2",
            "X-Device": "e7x55123-b9fe-4fe5-a075-a5605296e6e6",
            "Authorization": ""
        },
    });
    return await w.data;
}

exports.GetTransactionReport = async function(report_id) {
    const w = await axios.get("https://mobile-api-gateway.truemoney.com/mobile-api-gateway/user-profile-composite/v1/users/transactions/history/detail/" + report_id, {
        headers: {
            "Content-Type": "application/json",
            "User-Agent": "V1/5.5.1 (com.tdcm.truemoneywallet; build:674; iOS 13.3.1) Alamofire/4.8.2",
            "X-Device": "e7x55123-b9fe-4fe5-a075-a5605296e6e6",
            "Authorization": ""
        },
    });

    return await w.data;
}

