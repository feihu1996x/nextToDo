
<template>
   <div id="app">
       <div id="cover"></div>
        <Header></Header>    
        <todo></todo>
        <Footer></Footer>   
   </div>
</template>
<script>
import Header from './todo/header.vue'
import Footer from './todo/footer.jsx'
import todo from './todo/todo.vue'
export default {
   components: {
       Header,
       Footer,
       todo
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
#cover{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background-color #999
    opacity .9
    z-index -1
}
</style>

