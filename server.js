var http = require('http'),
    fs = require('fs');


fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    }).listen(8000);
});

    extensions = {
      ".html" : "text/html",
      ".css" : "text/css",
      ".js" : "application/javascript",
      ".png" : "image/png",
      ".gif" : "image/gif",
      ".jpg" : "image/jpeg"
    };
