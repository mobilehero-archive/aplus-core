
var fs = require('fs');
var path = require('path');
var tiappDir = require('tiapp-dir');
tiappDir(__dirname).then(function (rootpath) {
	console.log("rootpath: " + rootpath);
	fs.copySync(path.join(__dirname, "requirex.js"), path.join(rootpath, "scripts","requirex.js"));
});
