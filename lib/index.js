const path = require('path');
const cssReset = require('../css/reset.css')
const sass = require('./styles.scss');
const css = require('../css/styles.css')
const createIdeaBox = require('./createToDo.js')
const buttons = require('./buttons.js')
const storage = require('./localstorage.js')
const IdeaBox = require('./IdeaBox.js')


buttons.saveButton();
buttons.voteQuality();
buttons.deleteButton();
buttons.searchValue();
buttons.completeButton();



let sortCount = 0;

$(() => {
  for(let i=0; localStorage.length>i; i++){
    let storedIdeaBox = JSON.parse(localStorage.getItem(localStorage.key(i)));
    createIdeaBox(storedIdeaBox);
  }
});

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
    storage.storeIdea(key, ideabox);
  })
})


$(".title-input, .idea-input").on("keyup", () => {
  let taskLength = $('.idea-input').val().length;
  /\S/.test($(".title-input").val()) && /\S/.test($(".idea-input").val()) && (taskLength < 120)? $(".save-btn").prop("disabled", false) : $(".save-btn").prop("disabled", true);
});

$(".title-input, .idea-input").on("keydown", event => {
  if(event.keyCode === 13 && $(".save-btn").prop("disabled") === false){
    $(".save-btn").click();
    $(".save-btn").prop("disabled", true);
  }
})


$('.idea-input').keyup(function () {
  let max = 120;
  let length = $(this).val().length;
  if (length >= max) {
    $('.result').text(' you have reached the 120 character limit');
  } else {
    let charLength = max - length;
    $('.result').text(charLength + ' characters left');
  }
});

// $(".sort-btn").on("click", function(){
//   var geniusToSwillSort = $(".idea-card").sort(function(a,b){
//     return $(a).find(".quality").text() > $(b).find(".quality").text();
//   })
//   var swillToGeniusSort = $(".idea-card").sort(function(a,b){
//     return $(a).find(".quality").text() < $(b).find(".quality").text();
//   })
//   sortCount % 2 === 0 ? $(".idea-container").html(geniusToSwillSort) : $(".idea-container").html(swillToGeniusSort);
//   sortCount++;
// })
