function TodoBox(title, todo, id){
  this.title = title;
  this.todo = todo;
  this.id = id;
  this.quality = "Normal";
  this.completed = false;
};


module.exports = TodoBox;
