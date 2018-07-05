<template>
    <div class="forkme-container">
            <a href="https://github.com/feihu1996x/nextToDo" target="_blank">Fork me on GitHub</a>
    </div>
</template>
<style lang="stylus" scoped>
    .forkme-container{
        position relative
        margin-top 10px
        width 100%
        height 50px
        a {
            position absolute
            display inline-block
            width 200px
            font-size 18px
            top 50%
            margin-top -12px
            left 50%
            margin-left -100px
            font-weight bold
            color black
            text-align center
            text-decoration underline            
        }
    }
</style>