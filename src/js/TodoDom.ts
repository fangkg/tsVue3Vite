/*
 * @Author: your name
 * @Date: 2021-06-13 08:14:01
 * @LastEditTime: 2021-06-14 09:13:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cloudapp-dashboardd:\blibli\tsVue3Vite\src\js\TodoDom.ts
 */
import { ITodoData } from "./typing";
import TodoTemplate from "./TodoTemplate";
import { createItem, findParent } from "./utils";

class TodoDom extends TodoTemplate{
    private todoWrapper: HTMLElement;

    constructor(todoWrapper: HTMLElement) {
        super();
        this.todoWrapper = todoWrapper;
    }

    protected initList(todoData: ITodoData[]) {
        if(todoData.length) {
            const oFrag: DocumentFragment = document.createDocumentFragment();
            todoData.map((todo: ITodoData) => {
                const oItem = createItem('div', 'todo-item', this.todoView(todo));
                // const oItem: HTMLElement = document.createElement("div");
                // oItem.className = 'todo-item';
                // oItem.innerHTML = this.todoView(todo);
                oFrag.appendChild(oItem);
            });

            this.todoWrapper.appendChild(oFrag);
        }
    }

    protected addItem(todo: ITodoData) {
        const oItem: HTMLElement = createItem('div', 'todo-item', this.todoView(todo));
        // const oItem: HTMLElement = document.createElement('div');
        // oItem.className = 'todo-item';
        // oItem.innerHTML = this.todoView(todo);
        this.todoWrapper.appendChild(oItem);
    }

    protected removeItem(target: HTMLElement) {
        let oParentNode: HTMLElement;
        const temp = findParent(target, 'todo-item');
        if(temp) {
            oParentNode = temp;
            oParentNode.remove();
        }
    }

    protected changeCompleted(target: HTMLElement, completed: boolean) {
        let oParentNode: HTMLElement;
        const temp = findParent(target, 'todo-item');
        if(temp) {
            oParentNode = temp;
            const oContent: HTMLElement = oParentNode.getElementsByTagName('span')[0];
            oContent.style.textDecoration = completed ? 'line-through': 'none'
        }
        
    }
}

export default TodoDom;