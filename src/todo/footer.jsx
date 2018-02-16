// 相对于.vue，.jsx可以使用功能更强大的JavaScript代码

// 导入footer样式文件
import '../assets/styles/footer.styl'

export default {
    data() {
        return{
            author: 'feihu1996.cn'
        }
    },
    render() {
        return (
            <div id="footer">
                <span>written by {this.author}</span>
            </div>
        )
    }
}