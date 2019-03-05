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
                @complete = "completeTodo"
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
    import { Store } from '../utils'
    import * as Api from '../api'

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
            if (!this.todos || !this.todos.length) {
                Api.GetTodo()
                    .then((res) => {
                        this.todos = res.data.data
                    })
                    .catch(() => {
                        this.Auth()
                    })
            }
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
            Auth () {
                var that = this;
                layui.use('layer', function () {
                    layer = layui.layer;
                    const signIndex = layer.open({
                        closeBtn: 0,
                        type: 1,
                        title: false,
                        btn: ['登录', '注册'],
                        btnAlign: 'c',
                        btn2: function () {
                            var username,
                                email,
                                password;
                            const signUpIndex = layer.open({
                                type: 1,
                                title: false,
                                btn: ['提交', '用户名', '邮箱', '密码'],
                                btnAlign: 'c',
                                yes: function (){
                                    if (!username || !email || !password) {
                                        layer.alert("请先输入用户名、邮箱和密码")
                                    } else {
                                        layer.close(signUpIndex);
                                        Api.SignUp({username, email, password})
                                            .then((res) => {
                                                layer.confirm(
                                                    `恭喜您，注册成功，用户名是${res.data.data[0].username}，邮箱是${res.data.data[0].email}`,
                                                    {icon: 6, title:'提示'},
                                                    function(index){
                                                        layer.close(index);
                                                    });
                                            })
                                            .catch(error => {
                                                if (error.response.data) {
                                                    layer.alert(error.response.data.msg)
                                                }
                                            })
                                    }
                                },
                                btn2: function () {
                                    layer.prompt({
                                        formType: 0,
                                        value: username,
                                        title: '请输入用户名',
                                        area: ['100px', '50px']
                                    }, function(value, index, elem){
                                        username = value;
                                        layer.close(index);
                                    });
                                    return false
                                },
                                btn3: function () {
                                    layer.prompt({
                                        formType: 0,
                                        value: email,
                                        title: '请输入邮箱',
                                        area: ['100px', '50px']
                                    }, function(value, index, elem){
                                        email = value;
                                        layer.close(index);
                                    });
                                    return false
                                },
                                btn4: function () {
                                    layer.prompt({
                                        formType: 1,
                                        value: password,
                                        title: '请输入密码',
                                        area: ['100px', '50px']
                                    }, function(value, index, elem){
                                        password = value;
                                        layer.close(index);
                                    });
                                    return false
                                }
                            });
                            return false
                        },
                        yes: function () {
                            var account,
                                password;
                            const signInIndex = layer.open({
                                type: 1,
                                title: false,
                                btn: ['提交', '用户名或邮箱', '密码'],
                                btnAlign: 'c',
                                yes: function () {
                                    if (!account || !password) {
                                        layer.alert("请先输入用户名和密码")
                                    } else {
                                        layer.close(signInIndex);
                                        Api.SignIn({account, password})
                                            .then((res) => {
                                                layer.close(signIndex)
                                                localStorage.setItem("accessToken", res.data.data[0].accessToken);
                                                layer.confirm(
                                                    `登录成功!`,
                                                    {icon: 6, title:'提示'},
                                                    function(index){
                                                        Api.GetTodo()
                                                            .then((res) => {
                                                                that.todos = res.data.data
                                                            })
                                                            .catch(() => {
                                                                that.Auth()
                                                            });
                                                        layer.close(index);
                                                    });
                                            })
                                            .catch((error) => {
                                                if (error.response.data) {
                                                    layer.alert(error.response.data.msg)
                                                }
                                            })
                                    }
                                },
                                btn2: function () {
                                    layer.prompt({
                                        formType: 0,
                                        value: account,
                                        title: '请输入用户名或邮箱',
                                        area: ['100px', '50px']
                                    }, function(value, index, elem){
                                        account = value;
                                        layer.close(index);
                                    });
                                    return false
                                },
                                btn3: function () {
                                    layer.prompt({
                                        formType: 1,
                                        value: password,
                                        title: '请输入密码',
                                        area: ['100px', '50px']
                                    }, function(value, index, elem){
                                        password = value;
                                        layer.close(index);
                                    });
                                    return false
                                }
                            })
                        },
                    });
                });
            },
            addTodo (e) {
                let id = this.todos.length ? this.todos[0].id : 0;
                if ('' === e.target.value) {
                    this.layer.msg('你什么都没有添加哦！', {icon: 5});
                } else {
                    const body = {
                        id: ++id,
                        content: e.target.value.trim(),
                    };
                    Api.PostTodo(body)
                        .then((res) => {
                            this.todos.unshift({
                                id: res.data.data[0].id,
                                content: res.data.data[0].content,
                                completed: false
                            })
                        })
                        .catch(error => {
                            this.layer.msg(error.response.data.msg, {icon: 5})
                        });
                    e.target.value = '';
                }
            },
            deleteTodo (id) {
                Api.DeleteTodo(id)
                    .then(() => {
                        this.todos.splice(this.todos.findIndex(todo => id === todo.id), 1)
                    })
                    .catch(error => {
                        this.layer.msg(error.response.data.msg, {icon: 5})
                    })
            },
            completeTodo (id, completed) {
                const index = this.todos.findIndex(todo => id === todo.id);
                Api.PatchTodo(id, {completed})
                    .then(() => {
                        this.todos[index].completed = completed;
                    })
                    .catch(error => {
                        this.todos[index].completed = !this.todos[index].completed;
                        this.layer.msg(error.response.data.msg, {icon: 5})
                    })
            },
            toggleFilter (state) {
                this.filter = state
            },
            clearAllCompleted () {
                let apiPromiseArray = [];
                for (let todo of this.todos) {
                    if (todo.completed) {
                        apiPromiseArray.push(Api.DeleteTodo(todo.id))
                    }
                }
                Promise.all(apiPromiseArray)
                    .then(() => {
                        this.todos = this.todos.filter(todo => !todo.completed)
                    })
                    .catch(() => {
                        this.layer.msg("something went wrong, please try again", {icon: 5})
                    });
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