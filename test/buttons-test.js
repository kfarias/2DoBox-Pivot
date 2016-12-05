const assert    = require('assert');
const webdriver = require('selenium-webdriver');
const test      = require('selenium-webdriver/testing');

const Buttons   = require('../lib/buttons.js')

test.describe('input fields', function(){
  this.timeout(10000);
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
 test.it('should save title edit on blur', ()=>{
   const title = driver.findElement({name: 'title'})
   const task = driver.findElement({name: 'task'})
   const saveBtn = driver.findElement({name:'saveBtn'})
   title.sendKeys('this is a title')
   task.sendKeys('this is a task')
   saveBtn.click()
   const newTitle = driver.findElement({name:'todo-title'})
   newTitle.sendKeys('edit')
   task.click()
   driver.navigate().refresh().then(()=>{
     const newTitle = driver.findElement({name: 'todo-title'})
     return newTitle.getText()
   }).then((text)=>{
     assert.equal(text, 'editthis is a title')
   })
 })
})
