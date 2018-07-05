
<template>
    <div id="app">
       <!-- 背景虚化 -->
        <Header></Header>    
        <Todo></Todo>
        <Footer></Footer>   
        <Forkme></Forkme>  
    </div>
</template>

<script>
// 导入header组件
import Header from './todo/header.vue'
// 导入footer组件
import Footer from './todo/footer.jsx'
// 导入todo组件
import Todo from './todo/todo.vue'
// 导入forkme组件
import Forkme from './todo/forkme.vue'
export default {
    // 声明在app.vue中要使用的组件
   components: {
       Header,
       Footer,
       Todo,
       Forkme
   }
}
</script>
<style lang="stylus" scoped>
// scoped属性使得样式表只在当前组件有效
#app{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
}
</style>

