// postcss:优化css代码
const autoprefixer = require('autoprefixer')

module.exports = {
    plugins:[
        // 自动添加浏览器前缀
        autoprefixer()
    ]
}