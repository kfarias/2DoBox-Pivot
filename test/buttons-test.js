const assert    = require('assert');
const webdriver = require('selenium-webdriver');
const test      = require('selenium-webdriver/testing');

const Buttons = require('../lib/buttons.js')

test.describe('input fields', ()=>{
  let driver;
 beforeEach(()=>{
   driver = new webdriver.Builder().forBrowser('chrome').build();
   driver.get('http://localhost:8080');
 });

 afterEach(()=>{
   driver.quit();
 });
 test.it('should allow me to add a title and a task', ()=>{
   const title = driver.findElement({name: 'title'})
   const task = driver.findElement({name: 'task'})
   title.sendKeys('this is a title').then(()=>{
     return title.getAttribute('value')
   }).then((value)=>{
     assert.equal(value, 'this is a title')
   })
 })
 test.it('should save edits on blur', ()=>{
   const title = driver.findElement({name: 'todo-title'})
   const task = driver.findElement({name: 'todo-task'})
   title.sendKeys('this is editing').then(()=>{})
 })
})
