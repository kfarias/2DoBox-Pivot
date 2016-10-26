$(function(){
  for(i=0; localStorage.length>i; i++){
    var storedIdeaBox = JSON.parse(localStorage.getItem(localStorage.key(i)));
    createIdeaBox(storedIdeaBox.title, storedIdeaBox.idea, storedIdeaBox.quality, storedIdeaBox.id);
  }
});

function IdeaBox(title, idea, id){
  this.title = title;
  this.idea = idea;
  this.id = id;
  this.quality = "swill";
};

function createIdeaBox(title, idea, quality, id){
  $(".idea-container").prepend(
    `<section class="idea-card" id="`+id+`">
       <p class="idea-title" contenteditable>`+title+`</p>
       <p class="idea-body" contenteditable>`+idea+`</p>
       <button class="up-vote"></button>
       <button class="down-vote"></button>
       <article>
         <h3>quality:<h3>
         <p class="quality">`+quality+`</p>
       </article>
       <button class="delete-btn"></button>
     </section>
    `
  )
}

$("textarea").on("keyup", function(){
  $(this).css("height", $(this)[0].scrollHeight+"px");
})

$(".save-btn").on("click", function(){
  var title = $(".title-input").val();
  var idea = $(".idea-input").val();
  var ideabox = new IdeaBox(title, idea, Date.now());
  var key = ideabox.id;
  localStorage.setItem(key, JSON.stringify(ideabox));
  createIdeaBox(ideabox.title, ideabox.idea, ideabox.quality, ideabox.id);
  emptyInput();
})


$(".idea-container").on("click", ".up-vote, .down-vote", function(){
  var ideaCard = $(this).closest(".idea-card");
  var selector = $(this).attr("class");
  var quality = ideaCard.find(".quality");
  var newQuality = getNewQuality(selector, quality.text());
  var key = ideaCard.attr("id");
  var ideabox = JSON.parse(localStorage.getItem(key));
  ideabox.quality = newQuality;
  localStorage.setItem(key, JSON.stringify(ideabox));
  quality.text(newQuality);
})

$(".idea-container").on("click", ".delete-btn", function(){
  var selector = $(this).closest(".idea-card");
  localStorage.removeItem(selector.attr("id"));
  selector.remove();
})



function emptyInput() {
  $(".title-input").val("");
  $(".idea-input").val("");
  $(".idea-input").css("height", "42px");
}

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
      return "genius"
  }
}

function downVote(quality){
  switch (quality) {
    case "genius":
      return "plausible";
    case "plausible":
      return "swill"
  }
}
