// const qualitySheet = require('./qualities.js')
const IdeaBox = require('./IdeaBox.js')
const createIdeaBox = require('./createToDo.js')
const storage = require('./localstorage.js')


const buttons = {
 saveButton: function(){
   $(".save-btn").on("click", () => {
     let title = $(".title-input").val();
     let idea = $(".idea-input").val();
     let ideabox = new IdeaBox(title, idea, Date.now());
     let key = ideabox.id;
     storage.storeIdea(key, ideabox);
     createIdeaBox(ideabox);
     emptyInput();
     $(".title-input").focus();
   })
 },

 voteQuality: function(){
   $(".idea-container").on("click", ".up-vote, .down-vote", (e) => {
     let ideaCard = $(e.currentTarget).closest(".idea-card");
     let selector = $(e.currentTarget).attr("class");
     let quality = ideaCard.find(".quality");
     let key = ideaCard.attr("id");
     let ideabox = JSON.parse(localStorage.getItem(key));
     let newQuality = getNewQuality(selector, quality.text());
     ideabox.quality = newQuality;
     storage.storeIdea(key, ideabox);
     quality.text(newQuality);
   })
 },

 deleteButton: function(){
   $(".idea-container").on("click", ".delete-btn", (e) => {
     let selector = $(e.currentTarget).closest(".idea-card");
     localStorage.removeItem(selector.attr("id"));
     selector.remove();
   })
 },

 searchValue: function(){
   $(".input-search").on("keyup", function(){
      let searchValue = $(this).val().toLowerCase();
      $(".idea-card").each(function(){
        let titleText = $(this).find(".idea-title").text().toLowerCase();
        let bodyText = $(this).find(".idea-body").text().toLowerCase();

        titleText.indexOf(searchValue) != -1 || bodyText.indexOf(searchValue) != -1 ? $(this).show() : $(this).hide();
     })
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
  $(".idea-input").val("");
  $(".idea-input").css("height", "42px");
}

module.exports = buttons;
