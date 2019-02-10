<template>
    <div>
        <nav-header></nav-header>
        <section class = "real-app">
            <input
                    type = "text"
                    class = "add-input"
                    autofocus = "autofocus"
                    placeholder= "task to do?"
                    @keyup.enter = "addTodo"
            >
            <div class = "item-wrapper">
                <Item
                :todo = "todo"
                v-for = "todo in filteredTodos"
                :key = "todo.id"
                @del = "deleteTodo"
                >
                </Item>
            </div>
            <Tabs
            :filter = "filter"
            :todos = "todos"
            @toggle = "toggleFilter"
            @clearAll = "clearAllCompleted"
            >
            </Tabs>
        </section>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import NavHeader from '../components/Header'
    import NavFooter from '../components/Footer'
    import Item from '../components/Item'
    import Tabs from '../components/Tabs'
    import Store from '../utils'
    export default {
        name: "Todo",
        components: {
            NavHeader,
            NavFooter,
            Item,
            Tabs
        },
        data () {
            return {
                todos: [],
                filter: "active",
                layer: null,
            }
        },
        mounted() {
            this.todos = Store.fetch();
            layui.use('layer', () => {
                this.layer = layui.layer;
            });
        },
        computed: {
            filteredTodos () {
                if ( 'all' === this.filter ) {
                    return this.todos
                }
                const completed = 'completed' === this.filter;
                return this.todos.filter(todo => completed === todo.completed)
            },
        },
        methods: {
            addTodo (e) {
                let id = this.todos.length ? this.todos[0].id : 0;
                if ('' === e.target.value) {
                    this.layer.msg('你什么都没有添加哦！', {icon: 5});
                } else {
                    this.todos.unshift({
                        id: ++id,
                        content: e.target.value.trim(),
                        completed: false
                    });
                    e.target.value = '';
                }
            },
            deleteTodo (id) {
                this.todos.splice(this.todos.findIndex(todo => id === todo.id), 1)
            },
            toggleFilter (state) {
                this.filter = state
            },
            clearAllCompleted () {
                this.todos = this.todos.filter(todo => !todo.completed)
            }
        },
        watch: {
            todos: {
                handler: function (todos) {
                    Store.save(todos)
                },
                deep: true,
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .real-app{
        width 600px;
        margin :0px  auto;
        box-shadow :0px 0px 5px #666;
        opacity: 0.8;
    }
    .item-wrapper {
        max-height 300px;
        overflow-x:hidden;
        overflow-y: auto;
    }
    .add-input{
        positon:relative;
        margin 0px
        width 100%
        font-size 24px
        font-family  inherit
        font-weight:inherit
        line-height 1.4rem
        border 0;
        outline none
        color inherit
        padding 6px
        border 1px solid #999
        box-shadow: inset 0 -1px 5px 0px rgba(0,0,0,0)
        box-sizing border-box
        font-smoothing:antialiased;
        padding 16px 16px 16px 60px
        border none
    }
</style>