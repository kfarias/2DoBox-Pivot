
const storage = {
   storeIdea: function (key, ideabox){
    localStorage.setItem(key, JSON.stringify(ideabox));
  },
    getIdea: function (key){
      let idea = localStorage.getItem(key);
      return JSON.parse(idea);
  }
}

  module.exports = storage;
