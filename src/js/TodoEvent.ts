/*
 * @Author: your name
 * @Date: 2021-06-13 07:48:17
 * @LastEditTime: 2021-06-14 09:48:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cloudapp-dashboardd:\blibli\tsVue3Vite\src\js\TodoEvent.ts
 */
import { ITodoData } from "./typing";
import TodoDom from "./TodoDom";
import { getTodoList, removeTodo, toggleTodo, addTodo } from "./TodoService";

class ToDoEvent extends TodoDom{
    private todoData: ITodoData[];

    constructor(todoData: ITodoData[], todoWrapper: HTMLElement) {
        super(todoWrapper);
        this.todoData = todoData;

        this.init(this.todoData);
    }

    /**
     * name
     */
    @addTodo
    public addTodo(todo: ITodoData): undefined | number {
        // 去重
        const _todo: undefined | ITodoData = this.todoData.find((item: ITodoData) => item.content === todo.content);
        console.log('todo:', _todo);
        if(!_todo) {
            this.todoData.push(todo);
            this.addItem(todo);
            return
        }

        // 重复
        return 1001;
    }
    
    /**
     * name
     */
    @removeTodo
    public removeTodo(target: HTMLElement, id: number): void {
        this.todoData = this.todoData.filter((todo: ITodoData) => todo.id !== id);
        this.removeItem(target);
    }

    /**
     * name
     */
    @toggleTodo
    public toggleComplete(target: HTMLElement, id: number): void {
        this.todoData = this.todoData.map((todo: ITodoData) => {
            if(todo.id === id) {
                todo.completed = !todo.completed;
                this.changeCompleted(target, todo.completed)
            }

            return todo;
        })
    }

    // @getTodoList装饰器先去请求数据，把数据传给init()方法, target为todoEvent对象
    @getTodoList
    private init(todoData: ITodoData[]) {
        this.todoData = todoData;
        this.initList(this.todoData);
    }
}

export default ToDoEvent;