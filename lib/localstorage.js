
const storage = {
   storeIdea: function (key, ideabox){
    localStorage.setItem(key, JSON.stringify(ideabox));
  },

}

  module.exports = storage;
