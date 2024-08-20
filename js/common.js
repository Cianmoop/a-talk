/**
 * 获取 dom 元素
 * @param {String} name 
 */
const $ = (name)=>{
    return document.querySelector(name);
}
/**
 * 获取所有 name dom 元素
 * @param {String} name 
 */
const $$ = (name)=>{
    return document.querySelectorAll(name);
}
/**
 * 创建一个 dom 元素
 * @param {String} name 
 */
const $$$ = (name)=>{
    return document.createElement(name);
}