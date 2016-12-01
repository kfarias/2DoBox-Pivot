function IdeaBox(title, idea, id){
  this.title = title;
  this.idea = idea;
  this.id = id;
  this.quality = "Normal";
  this.completed = false;
};


module.exports = IdeaBox;
