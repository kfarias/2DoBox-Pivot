module.exports = function createIdeaBox(ideabox){
  $(".idea-container").prepend(
    `<section class="idea-card" id="${ideabox.id}">
      <button class="delete-btn"></button>
       <p class="idea-title" contenteditable>${ideabox.title}</p>
       <p class="idea-body" contenteditable>${ideabox.idea}</p>
       <button class="up-vote"></button>
       <button class="down-vote"></button>
       <article>
         <h3>quality:<h3>
         <p class="quality">${ideabox.quality}</p>
       </article>
       <aside class="time-stamp">${ideabox.timeStamp}</aside>
     </section>`
  )
};

// let ideaCreators = {
//   createIdeaBox: function(){$(".idea-container").prepend(
//     `<section class="idea-card" id="${ideabox.id}">
//       <button class="delete-btn"></button>
//        <p class="idea-title" contenteditable>${ideabox.title}</p>
//        <p class="idea-body" contenteditable>${ideabox.idea}</p>
//        <button class="up-vote"></button>
//        <button class="down-vote"></button>
//        <article>
//          <h3>quality:<h3>
//          <p class="quality">${ideabox.quality}</p>
//        </article>
//        <aside class="time-stamp">${ideabox.timeStamp}</aside>
//      </section>`
//   ),
//   deleteideabox: function(){
//     $(".idea-container").on("click", ".delete-btn", ()=>{
//       const selector = $(this).closest(".idea-card");
//       localStorage.removeItem(selector.attr("id"));
//       selector.remove();
//     })
//   }
// }
// };
//
//
//
// function Idea(){
//   this.title: 'cat'
// }
//
// Idea.prototype.createIdeaBox = function(){
//
// }
//
// module.exports = Idea;
//
// //index.js
//
// // const Idea = require(''./Idea')
//
// // let idea = new Idea
//
// // idea.createIdeaBox()
//
// let ideaViewHelper = {
//   createIdeaBox: function(){},
//   deleteIdeaBox: function(){}
// }
//
// module.exports = ideaViewHelper;
//
// //index.js

// const ideaViewHelper = require...

// ideaViewHelper.createIdeaBox()
