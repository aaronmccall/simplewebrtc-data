var bundle = require('browserify')(),
    fs = require('fs'),
    uglify = require('uglify-js'),
    path = require('path'),
    io_conf = require('./node_modules/socket.io-client/package');

bundle.add('./lib/simplewebrtc-data');
bundle.bundle({standalone: 'SimpleWebRTCData'}, function (err, source) {
    if (err) console.error(err);
    fs.writeFileSync('./lib/simplewebrtc-data.bundle.js', source);
    fs.writeFileSync('./public/simplewebrtc-data.bundle.js', source);
    fs.readFile(path.resolve(path.join('./node_modules/socket.io-client', io_conf.browserify)), 'utf8', function (err, body) {
        fs.writeFileSync('./public/socket.io.js', body);
        if (!err && body && body.length) {
            fs.writeFile('public/latest.js', uglify.minify(source + body, {fromString: true}).code, function (err) {
                if (err) throw err;
            });
        }
    });
});
