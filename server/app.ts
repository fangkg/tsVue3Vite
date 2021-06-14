/*
 * @Author: your name
 * @Date: 2021-06-13 10:44:35
 * @LastEditTime: 2021-06-13 10:53:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cloudapp-dashboardd:\blibli\tsVue3Vite\server\app.ts
 */
import express, { Application } from 'express';
import bodyParse from 'body-parser';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileOption, readFile, writeFile } from './utils';
import { ITodoData } from '../src/js/typing';

const app: Application = express();
console.log('welcome to express')
app.use(bodyParse.urlencoded({
    extended: true
}));
app.use(bodyParse.json());

// 跨域
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-methods', 'POST, GET, PUT, DELETE, OPTIONS');

    next();
})


app.get('/todolist', function(req, res){
    // const todoList: string = readFileSync(resolve(__dirname, 'todo.json'), 'utf-8');
    // const todoList: string = readFile('todo.json');
    const todoList = fileOption('todo.json') as string;
    // 响应给前端
    res.send(todoList);
});

app.post('/toggle', function(req, res){
    const id:number = parseInt(req.body.id);

    fileOption('todo.json', function(todoList: ITodoData[]) {
        return todoList.map((todo: ITodoData) => {
            if(todo.id === id) {
                todo.completed = !todo.completed;
            }

            return todo;
        })
    });

    res.send({
        msg: 'ok',
        statusCode: '200'
    })
})

app.post('/remove', function(req, res){
    const id:number = parseInt(req.body.id);
    // let todoList: ITodoData[] = JSON.parse(readFile('todo.json') || '[]');
    // todoList = todoList.filter((todo: ITodoData) => todo.id !== id);

    // // 修改之后写入文件
    // writeFile('todo.json', todoList);
    fileOption('todo.json', function(todoList: ITodoData[]) {
        return todoList.filter((todo: ITodoData) => todo.id !== id);
    })
    res.send({
        msg: 'ok',
        statusCode: '200'
    })
})

app.post('/add', function(req, res){
    const todo: ITodoData = JSON.parse(req.body.todo);
    fileOption('todo.json', function(todoList: ITodoData[]){
        const isExist = todoList.find((t: ITodoData) => t.id === todo.id);

        if(isExist) {
            res.send({
                msg: 'exist',
                statusCode: 100
            })

            return;
        }

        todoList.push(todo);
        return todoList;
    })

    res.send({
        msg: 'ok',
        statusCode: 200
    })

})

app.listen(8181, function() {
    console.log('listening on 8181')
})