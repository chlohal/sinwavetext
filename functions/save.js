exports.handler = async function (event, context) {
    var body = event.body;

    var https = require("https");

    const options = {
        hostname: "jsonbin.org",
        path: "/coleh2/swt/",
        method: 'PATCH',
        headers: { "Content-Type": "application/json", "Authorization": "token " + process.env.JSONBIN_API }
    }

    var req = https.request(options, function (res) {
        res.setEncoding("utf8");

        res.on("data", function (body) {
            var jsonResBody = JSON.parse(body);
            return {
                statusCode: 201,
                body: jsonResBody.length
            };
        });
    });

    req.on("error", function(err) {
        return {
            statusCode: 500,
            body: err.message
        }
    });

    req.end(body);
}