module.exports = function createTodo(todobox){
  let checkComplete = ""
  if (todobox.completed){
    checkComplete = 'grey-background';
  }
  $(".todo-container").prepend(
    `<li class="todo-card ${checkComplete}" id="${todobox.id}">
      <button class="delete-btn"></button>
       <p class="todo-title" contenteditable>${todobox.title}</p>
       <textarea maxlength='120' class="todo-body" contenteditable>${todobox.todo}</textarea>
       <button class="up-vote"></button>
       <button class="down-vote"></button>
       <article>
         <h3>quality:<h3>
         <p class="quality">${todobox.quality}</p>
         <button class="complete-task">Completed Task</button>
       </article>
     </li>`
  )
};
