module.exports = function createTodo(todobox){
  let checkComplete = ""
  if (todobox.completed){
    checkComplete = 'grey-background';
  }
  $(".todo-container").prepend(
    `<li class="todo-card ${checkComplete}" tabindex=0 id="${todobox.id}">
      <button aria-label="delete-task"role="none" class="delete-btn"></button>
       <p class="todo-title" aria-label="task-title" tabindex=0 contenteditable name='todo-title'>${todobox.title}</p>
       <textarea maxlength='120' tabindex=0 aria-label="task-body" class="todo-body" contenteditable name='todo-task'>${todobox.todo}</textarea>
       <button aria-label="up-vote" role="none" class="up-vote"></button>
       <button aria-label="down-vote" role="none" class="down-vote"></button>
       <article>
         <h3 tabindex=0>quality:<h3>
         <p tabindex=0 class="quality">${todobox.quality}</p>
         <button aria-label="complete-task"role="none" class="complete-task">Completed Task</button>
       </article>
     </li>`
  )
};
