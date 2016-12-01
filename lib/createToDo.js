module.exports = function createIdeaBox(ideabox){
  let checkComplete = ""
  if (ideabox.completed){
    checkComplete = 'grey-background';
  }
  $(".idea-container").prepend(
    `<section class="idea-card ${checkComplete}" id="${ideabox.id}">
      <button class="delete-btn"></button>
       <p class="idea-title" contenteditable>${ideabox.title}</p>
       <textarea maxlength='120' class="idea-body" contenteditable>${ideabox.idea}</textarea>
       <button class="up-vote"></button>
       <button class="down-vote"></button>
       <article>
         <h3>quality:<h3>
         <p class="quality">${ideabox.quality}</p>
         <button class="complete-task">Completed Task</button>
       </article>
     </section>`
  )
};
