/*
 * @Author: your name
 * @Date: 2021-06-13 06:26:34
 * @LastEditTime: 2021-06-14 09:28:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cloudapp-dashboardd:\blibli\tsVue3Vite\src\app.ts
 */
import { ITodoData } from './js/typing';
import TodoEvent from './js/TodoEvent';


// 立即执行函数
;((doc) => {
    let oInput: HTMLInputElement;
    const tempInput = document.querySelector('input');
    if(tempInput) {
        oInput = tempInput;
    }

    let oButton: HTMLButtonElement;
    const tempButton = document.querySelector('button');
    if(tempButton) {
        oButton = tempButton;
    }

    const oTodoList: HTMLElement = document.querySelector('.todo-list') as HTMLElement;
   
    const todoData: ITodoData[] = [
        // {
        //     id: 1,
        //     content: '123',
        //     completed: true
        // },
        // {
        //     id: 2,
        //     content: '345',
        //     completed: false
        // }
    ];

    const todoEvent: TodoEvent = new TodoEvent(todoData, oTodoList);


    const init = (): void => {
        bindEvent();
    }

    function bindEvent (): void {
        oButton.addEventListener('click', bindAddBtnClick, false);
        oTodoList.addEventListener('click', handleListClick, false);

    }

    function bindAddBtnClick(): void {
        const val:string = oInput.value.trim();
        // todoEvent.addTodo(<ITodoData>{
        //     id: 4,
        //     content: '999',
        //     completed: true
        // })
        if(val.length) {
            const ret = todoEvent.addTodo(<ITodoData>{
                // id: 4,
                // content: '999',
                // completed: false
                id: new Date().getTime(),
                content: val,
                completed: false
            })

            if(ret && ret === 1001) {
                alert('列表项已存在！');
                return;
            }

            oInput.value = "";
        }

        console.log(todoData);
    }

    function handleListClick(e: MouseEvent): void {
        const tar = e.target as HTMLLIElement;
        const tagName = tar.tagName.toLowerCase();

        if(tagName === 'input' || tagName === 'button') {      
            let id = 0;
            if(tar.dataset.id) {
                id = parseInt(tar.dataset.id);
            }
            switch(tagName) {
                case "input":
                    todoEvent.toggleComplete(tar, id);
                    break
                case "button":
                    todoEvent.removeTodo(tar, id);
                    break;
                default:
                    break;
            }
        }
    }
    
    init();
})(document);