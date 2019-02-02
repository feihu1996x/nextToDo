<template>
    <section class="real-app">
        <input 
        type="text"
        class="add-input"
        autofocus="autofocus"
        placeholder="task to do?"
        @keyup.enter="addTodo"
        >
        <div class="item-wrapper">
            <Item
                    :todo="todo"
                    v-for="todo in filteredTodos"
                    :key="todo.id"
                    @del="deleteTodo"
            ></Item>
        </div>
        <Tabs
        :filter="filter"
        :todos="todos"
        @toggle="toggleFilter"
        @clearAll="clearAllCompleted"
        ></Tabs>
    </section>   
</template>
<script>
// 导入item组件
import Item from './item.vue'
// 导入tabs组件
import Tabs from './tabs.vue'

import store from './store.js'

let id = 0
export default {
    data() {
        return {
			// 从服务器获取初始化数据
            todos:store.fetch() || [],
            filter:"active"
        }
	},
	// 声明要在todo.vue中要使用的组件
    components: {
        Item,
        Tabs
    },
	computed:{
		filteredTodos(){
			if (this.filter === 'all'){
				return this.todos
			}
			const completed = this.filter === 'completed'
			return this.todos.filter(todo => completed === todo.completed)
		},
	},
	methods: {
		addTodo(e){
			if(e.target.value==''){
				alert("你什么都没有添加哦")
			}
			else{
				this.todos.unshift({
                    id:id++,
                    content: e.target.value.trim(),
                    completed:false
			    })
			    e.target.value =''
			}
			
		},
		deleteTodo(id){
			//  console.log(todo => todo.id ===id);
			this.todos.splice(this.todos.findIndex(todo => todo.id ===id),1)
		},
		toggleFilter(state){
			this.filter =state
		},
		clearAllCompleted(){
			this.todos = this.todos.filter(todo => !todo.completed)
		}
	},
	watch: {
		todos: {
			handler: function(todos){
				store.save(todos)		 
			},
			deep: true
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
