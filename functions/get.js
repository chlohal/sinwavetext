exports.handler = async function (event, context) {
    

    var https = require("https");

    const options = {
        hostname: "jsonbin.org",
        path: "/coleh2/swt/" + (event.queryStringParameters.i || "0"),
        method: 'GET',
        headers: { "Content-Type": "application/json", "Authorization": "token " + process.env.JSONBIN_API }
    }

    console.log(options);
            

    var req = https.request(options, function (res) {
        res.setEncoding("utf8");

        res.on("data", function (body) {
            console.log(body);

            var jsonResBody = JSON.parse(body);
            return {
                statusCode: 201,
                body: jsonResBody.length
            };
        });
    });

    req.on("error", function(err) {
        console.log(err);
        return {
            statusCode: 500,
            body: err.message
        }
    });

    req.end();
}