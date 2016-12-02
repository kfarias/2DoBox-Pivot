const path = require('path');
const cssReset = require('../css/reset.css')
const sass = require('./styles.scss');
const css = require('../css/styles.css')
const createToDo = require('./createToDo.js')
const buttons = require('./buttons.js')
const storage = require('./localstorage.js')
const TodoBox = require('./TodoBox.js')


buttons.saveButton();
buttons.voteQuality();
buttons.deleteButton();
buttons.searchValue();
buttons.completeButton();



let sortCount = 0;

$(() => {
  for(let i=0; localStorage.length>i; i++){
    let storedTodoBox = JSON.parse(localStorage.getItem(localStorage.key(i)));
    createToDo(storedTodoBox);
  }
});

$(".todo-container").on("focus", ".todo-title, .todo-body", () => {
  let selector = $(this).closest(".todo-card");
  let key = selector.attr("id");
  let todobox = JSON.parse(localStorage.getItem(key));
  $(this).on("keydown", function(event){
    if(event.keyCode === 13){
      event.preventDefault();
      $(this).blur();
      return false;
    }
  })
  $(this).on("blur", () => {
    todobox.title = selector.find(".todo-title").text();
    todobox.todo = selector.find(".todo-body").text();
    storage.storeTodo(key, todobox);
  })
})


$(".title-input, .todo-input").on("keyup", () => {
  let taskLength = $('.todo-input').val().length;
  /\S/.test($(".title-input").val()) && /\S/.test($(".todo-input").val()) && (taskLength < 120)? $(".save-btn").prop("disabled", false) : $(".save-btn").prop("disabled", true);
});

$(".title-input, .todo-input").on("keydown", event => {
  if(event.keyCode === 13 && $(".save-btn").prop("disabled") === false){
    $(".save-btn").click();
    $(".save-btn").prop("disabled", true);
  }
})


$('.todo-input').keyup(function () {
  let max = 120;
  let length = $(this).val().length;
  if (length >= max) {
    $('.result').text(' you have reached the 120 character limit');
  } else {
    let charLength = max - length;
    $('.result').text(charLength + ' characters left');
  }
});

$(function() {
  let showButton = $('.show-more')
  showButton.on('click', function(){
    $('#dataset li:hidden').slice(0, 10).show();
    if($('#dataset li').length == $('#dataset li:visible').length) {
      showButton.hide();
    }
  });
});
