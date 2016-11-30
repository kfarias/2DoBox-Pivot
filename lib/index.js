const path = require('path');
const cssReset = require('../css/reset.css')
const sass = require('./styles.scss');
const css = require('../css/styles.css')
const createIdeaBox = require('./createToDo.js')
const buttons = require('./buttons.js')


buttons.saveButton();
buttons.voteQuality();
buttons.deleteButton();
buttons.searchValue();

let sortCount = 0;

$(() => {
  for(let i=0; localStorage.length>i; i++){
    let storedIdeaBox = JSON.parse(localStorage.getItem(localStorage.key(i)));
    createIdeaBox(storedIdeaBox);
  }
});

function IdeaBox(title, idea, id, timeStamp){
  this.title = title;
  this.idea = idea;
  this.id = id;
  this.quality = "swill";
  this.timeStamp = timeStamp;
};

$(".idea-container").on("focus", ".idea-title, .idea-body", () => {
  let selector = $(this).closest(".idea-card");
  let key = selector.attr("id");
  let ideabox = JSON.parse(localStorage.getItem(key));
  $(this).on("keydown", function(event){
    if(event.keyCode === 13){
      event.preventDefault();
      $(this).blur();
      return false;
    }
  })
  $(this).on("blur", () => {
    ideabox.title = selector.find(".idea-title").text();
    ideabox.idea = selector.find(".idea-body").text();
    localStorage.setItem(key, JSON.stringify(ideabox));
  })
})

$(".title-input, .idea-input").on("keyup", () => {
  /\S/.test($(".title-input").val()) && /\S/.test($(".idea-input").val()) ? $(".save-btn").prop("disabled", false) : $(".save-btn").prop("disabled", true);
});

$(".title-input, .idea-input").on("keydown", event => {
  if(event.keyCode === 13 && $(".save-btn").prop("disabled") === false){
    $(".save-btn").click();
    $(".save-btn").prop("disabled", true);
  }
})

$(".input-search").on("keyup", () => {
  let searchValue = $(this).val().toLowerCase();
  $(".idea-card").each(function(){
  let titleText = $(this).find(".idea-title").text().toLowerCase();
  let bodyText = $(this).find(".idea-body").text().toLowerCase();

  titleText.indexOf(searchValue) != -1 || bodyText.indexOf(searchValue) != -1 ? $(this).show() : $(this).hide();

  });
});


function emptyInput() {
  $(".title-input").val("");
  $(".idea-input").val("");
  $(".idea-input").css("height", "42px");
}

function getTimeStamp(){
  let time = Date();
    return time;
}
