<template>
    <div id="nav-footer">
        <span>written by {{author}}</span>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        data () {
            return {
                author: "feihu1996.cn"
            }
        }
    }
</script>

<style lang="stylus" scoped>
    #nav-footer{
        margin-top 40px
        text-align center
        color #bfbfbf
        font-size 10px
        text-shadow 0px 1px 0px 1px
    }
</style>
