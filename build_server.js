const { exec } = require('child_process');
const fs = require('fs');
const config = require('./server/config');

console.log("将dist/index.html移动到server/views/index.ejs ...");
exec('rm -rf ./server/views/* && mv ./dist/index.html ./server/views/index.ejs -fv', (error) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    } 
    console.log("done");
    console.log("将所有静态文件移动到server/public/目录下...");
    exec('rm -rf ./server/public/* && mv ./dist/* ./server/public/ -fv && cp ./static/* ./server/public/ -rfv', (error) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log("done");
        console.log("删除dist文件夹...");
        exec('rm -rf dist', (error) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log("done");
            console.log("调整server/views/index.ejs文件内容...");
            var content = '';
            console.log("读取./server/views/index.ejs文件内容...");
            fs.readFile('./server/views/index.ejs', {flag: 'r+', encoding: 'utf8'}, function (err, data) {
                if(err) {
                    console.error(err);
                    return;
                }
                content = data;
                console.log("done:", content);
                console.log("替换content...");
                content = content.replace('<link rel="shortcut icon" href="', '<link rel="shortcut icon" href="<%= url_prefix %>/').replace('<link href="', '<link href="<%= url_prefix %>/static/').replace(/<script type="text\/javascript" src="/g,'<script type="text/javascript" src="<%= url_prefix %>/static/');
                console.log("done:", content);
                console.log("将content写入./server/views/index.ejs文件...");
                fs.writeFile('./server/views/index.ejs', content,  function(err) {
                    if (err) {
                        return console.error(err);
                    }
                    console.log("done");
                    console.log("读取./server/public目录...");
                    js_static_patern = /app.*.js/;
                    css_static_pattern = /style.*.css/;
                    console.log("读取静态文件...");
                    fs.readdir('./server/public', {encoding: "utf8"}, function(err, files){
                        if(err){
                            console.error(err);
                            return;
                        }
                        console.log("修改静态文件中对图片的引用...");
                        files.forEach(function(file){
                            if(js_static_patern.test(file) || css_static_pattern.test(file)){
                                file = './server/public/' + file;
                                fs.readFile(file, {flag: "r+", encoding: "utf8"}, function(err, data){
                                    if(err){
                                        console.error(err);
                                        return;
                                    }
                                    console.log("读取文件:" + file, data);
                                    data = data.replace('background-image: url(bg.jpg);', 'background-image: url('+ config.url_prefix + '/static/'+ 'bg.jpg' + ');').replace('module.exports = __webpack_require__.p + "done.png";', 'module.exports = __webpack_require__.p + "done.png";'.replace('done.png', config.url_prefix+'/static/done.png')).replace('module.exports = __webpack_require__.p + "round.png";', 'module.exports = __webpack_require__.p + "round.png";'.replace('round.png', config.url_prefix+'/static/round.png'));
                                    console.log("写入文件：" + file, data);
                                    fs.writeFile(file, data, function(err){
                                        if(err){
                                            console.log(err);
                                            return;
                                        }
                                        console.log("done");
                                    });
                                });
                            }
                        }); 
                    });
                });
            });
        });        
    });
});

