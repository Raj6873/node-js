const http = require("http");

const myserver = http.createServer((req, res) => {
    console.log("hello")
    res.write("hello am  node js")
    res.end();


const page = url;
console.log("url", req.url);

switch (page) {
    case '/':
        res.write("<h1>home page</h1>");
        res.end();
        break;
    case '/about':
        res.write("<h1>about page</h1>");
        res.end();
        break;
    case '/contact':
        res.write("<h1>contact page</h1>");
        res.end();
        break;
    default:
        res.write("404 not found")
}
});

myserver.listen(8000, () => console.log("server is started....?"));