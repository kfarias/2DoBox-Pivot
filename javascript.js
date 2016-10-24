function IdeaBox(title, idea){
  this.title = title;
  this.idea = idea;
  this.quality = "swill";
};

IdeaBox.prototype.createIdeaBox = function(){
  $(".idea-container").prepend(
    `<section class="idea-card">
       <h2>`+this.title+`</h2>
       <p>`+this.idea+`</p>
       <p class="quality">`+this.quality+`</p>  
     </section>
    `
  )
}


$(".submit-btn").on("click", function(){
  var title = $(".title-input").val();
  var idea = $(".idea-input").val();
  var ideabox = new IdeaBox(title, idea);
  ideabox.createIdeaBox();
})
