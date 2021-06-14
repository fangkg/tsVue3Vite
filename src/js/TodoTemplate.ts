import { ITodoData } from "./typing";

/*
 * @Author: your name
 * @Date: 2021-06-13 08:19:03
 * @LastEditTime: 2021-06-13 08:23:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cloudapp-dashboardd:\blibli\tsVue3Vite\src\js\TodoTemplate.ts
 */
class TodoTemplate {

    protected todoView({ id, content, completed }: ITodoData): string {
        return `
            <input type="checkbox" ${ completed ? 'checked': ''} data-id="${ id }">
            <span style="text-decoration: ${ completed ? 'line-through': 'none'}">${ content }</span>
            <button data-id="${ id }">删除</button>
        `
    }
}

export default TodoTemplate;