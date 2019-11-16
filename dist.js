const { basename } = require('path');
const HTML = require('shelljs').ls("dist/demo/*.js")
    .map(x => basename(x))
    .reduce((accum, cur) => accum + `<script defer src="https://hwangsehyun.s3-ap-southeast-1.amazonaws.com/Angular/${cur}"></script>\n`, "");
console.log(HTML);

require("fs").writeFileSync('dist/demo/index.html', HTML);
