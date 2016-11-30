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
     </section>`
  )
};
