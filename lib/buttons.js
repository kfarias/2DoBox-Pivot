// const qualitySheet = require('./qualities.js')
const TodoBox = require('./TodoBox.js')
const createToDo = require('./createToDo.js')
const storage = require('./localstorage.js')


const buttons = {
 saveButton: function(){
   $(".save-btn").on("click", () => {
     let title = $(".title-input").val();
     let todo = $(".todo-input").val();
     let todobox = new TodoBox(title, todo, Date.now());
     let key = todobox.id;
     storage.storeTodo(key, todobox);
     createToDo(todobox);
     emptyInput();
     $(".title-input").focus();
     $('.result').text('120 characters left');
   })
 },



 voteQuality: function(){
   $(".todo-container").on("click", ".up-vote, .down-vote", (e) => {
     let todoCard = $(e.currentTarget).closest(".todo-card");
     let selector = $(e.currentTarget).attr("class");
     let quality = todoCard.find(".quality");
     let key = todoCard.attr("id");
     let todobox = JSON.parse(localStorage.getItem(key));
     let newQuality = getNewQuality(selector, quality.text());
     todobox.quality = newQuality;
     storage.storeTodo(key, todobox);
     quality.text(newQuality);
   })
 },

 deleteButton: function(){
   $(".todo-container").on("click", ".delete-btn", (e) => {
     let selector = $(e.currentTarget).closest(".todo-card");
     localStorage.removeItem(selector.attr("id"));
     selector.remove();
   })
 },

 searchValue: function(){
   $(".input-search").on("keyup", function(){
      let searchValue = $(this).val().toLowerCase();
      $(".todo-card").each(function(){
        let titleText = $(this).find(".todo-title").text().toLowerCase();
        let bodyText = $(this).find(".todo-body").text().toLowerCase();

        titleText.indexOf(searchValue) != -1 || bodyText.indexOf(searchValue) != -1 ? $(this).show() : $(this).hide();
     })
   })
  },

   completeButton: function(){
     $(".todo-container").on("click", ".complete-task", (e) => {
       let selector = $(e.currentTarget).closest(".todo-card");
       selector.toggleClass('grey-background')
       let key = selector.attr("id");
       let todobox = storage.getTodo(key);
      //  funky shit happening below, toggling true/false for todobox.completed by setting it to the opposite of itself
       todobox.completed = !todobox.completed;
       storage.storeTodo(key, todobox);
     })
   }

 }


// @TODO: move the functions below to a separate sheet

function getNewQuality(selector, quality){
  if(selector === "up-vote"){
    return upVote(quality);
  } else {
    return downVote(quality);
  }
}

function upVote(quality){
  switch (quality) {
    case "None":
      return "Low";
    case "Low":
      return "Normal";
    case "Normal":
      return "High";
    case "High":
      return "Critical";
    default:
      return "Critical";
  }
}

function downVote(quality){
  switch (quality) {
    case "Critical":
      return "High";
    case "High":
      return "Normal";
    case "Normal":
      return "Low";
    case "Low":
      return "None"
    default:
      return "None";
  }
}

function emptyInput() {
  $(".title-input").val("");
  $(".todo-input").val("");
  $(".todo-input").css("height", "42px");
}

module.exports = buttons;
