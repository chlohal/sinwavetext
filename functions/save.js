exports.handler = function (event, context, callback) {
    var body = JSON.stringify(event.body);

    var https = require("https");

    const options = {
        hostname: "jsonbin.org",
        path: "/coleh2/swt/",
        method: 'PATCH',
        headers: { "Content-Type": "application/json", "Authorization": "token " + process.env.JSONBIN_API, 'Content-Length': Buffer.byteLength(body) },
    }

    console.log(options);

    var req = https.request(options, function (res) {
        res.setEncoding("utf8");

        var body = "";

        res.on("data", function (chunk) {
            body += chunk;
        });
        res.on("close", function() {
            var len = JSON.parse(body).length;
            callback(null, {
                statusCode: 200,
                body: (len-1) + ""
            });
        });
    });

    req.on("error", function(err) {
        console.log(err);
        callback(null, {
            statusCode: 500,
            body: err.message
        });
    });

    req.end(body);
}