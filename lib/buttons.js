// const qualitySheet = require('./qualities.js')


const buttons = {
 saveButton: function(){
   $(".save-btn").on("click", () => {
     let title = $(".title-input").val();
     let idea = $(".idea-input").val();
     let timeStamp = getTimeStamp();
     let ideabox = new IdeaBox(title, idea, Date.now(), timeStamp);
     let key = ideabox.id;
     localStorage.setItem(key, JSON.stringify(ideabox));
     createIdeaBox(ideabox, timeStamp);
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
     localStorage.setItem(key, JSON.stringify(ideabox));
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
   $(".input-search").on("keyup", (e) => {
      let searchValue = $(e.currentTarget).val().toLowerCase();
      $(".idea-card").each(function(){
        let titleText = $(e.currentTarget).find(".idea-title").text().toLowerCase();
        let bodyText = $(e.currentTarget).find(".idea-body").text().toLowerCase();

        titleText.indexOf(searchValue) != -1 || bodyText.indexOf(searchValue) != -1 ? $(e.currentTarget).show() : $(e.currentTarget).hide();
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
    case "swill":
      return "plausible";
    case "plausible":
      return "genius";
    default:
      return "genius";
  }
}

function downVote(quality){
  switch (quality) {
    case "genius":
      return "plausible";
    case "plausible":
      return "swill";
    default:
      return "swill";
  }
}

module.exports = buttons;
