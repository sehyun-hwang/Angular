const JS = require('shelljs').ls("Angular/dist/demo/*.js")
    .reduce((accum, cur) => accum + `<script src="https://www.hwangsehyun.ga/${cur}"></script>\n`, "");
console.log("Angular.html");
console.log(JS);

require("fs").writeFile('Angular/index.html', JS, Function.prototype);
