import TodoTemplate from "./TodoTemplate";

/*
 * @Author: your name
 * @Date: 2021-06-13 08:28:33
 * @LastEditTime: 2021-06-14 08:59:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cloudapp-dashboardd:\blibli\tsVue3Vite\src\js\utils.ts
 */
export function findParent(target: HTMLElement, className: string) {
    while(target = target.parentNode as HTMLElement) {
        if(target.className === className) {
            return target;
        }
    }
}

export function createItem(tagName: string, className: string, todoItem: string): HTMLElement {
    const oItem: HTMLElement = document.createElement(tagName);
    oItem.className = className;
    oItem.innerHTML = todoItem;

    return oItem;
}