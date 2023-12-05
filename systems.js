var Systems = {};
const filePath  = './systems'
global.fs.readdirSync(filePath).forEach(file => {
	file = file.slice(0,-3);
	global[file] = require(filePath+"/"+file);
});
//console.log(Systems);
module.exports =  Systems;