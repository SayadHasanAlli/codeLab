var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var compiler = require("compilex");

var app = express();
app.use(bodyParser());

const options = { stats: true };
compiler.init(options);
const cors = require("cors");
const corsOption ={
    "origin":"http://localhost:5500",
    "methods":"GET,POST"
}
app.use(cors(corsOption))


// Serve the static files
app.use('/codemirror-5.65.14', express.static('C:/Users/HASAN/Documents/projects/codemirror-5.65.14'));

// Serve the HTML file
app.get("/", function (req, res) {
    res.sendFile("C:/Users/HASAN/Documents/projects/index.html");
});

app.post("/compile", function (req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;
if (lang === "C" || lang === "C++") {
if (input) {
    var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
    compiler.compileCPPWithInput(envData, code, input, function (data) {
        res.send(data);
    });
    } else {
        var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
        compiler.compileCPP(envData, code, function (data) {
        res.send(data);
    });
    }
    }
if (lang === "Python") {
    if (input) {
        var envData = { OS: "windows" };
        compiler.compilePythonWithInput(envData, code, input, function (data) {
        res.send(data);
    });
    } else {
            var envData = { OS: "windows" };
            compiler.compilePython(envData, code, function (data) {
            res.send(data);
            });
        }
}
if (lang === "Java") {
    if (input) {
        var envData = { OS: "windows" };
        compiler.compileJavaWithInput(envData, code, input, function (data) {
        res.send(data);
    });
    } else {
            var envData = { OS: "windows" };
            compiler.compileJava(envData, code, function (data) {
            res.send(data);
            });
        }
}
});
app.get("/fullStat", function (req, res) {
    compiler.fullStat(function (data) {
    res.send(data);
    });
    });


const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on('exit', function () {
    compiler.flush(function () {
        console.log("All temporary files flushed !");
    });
});
