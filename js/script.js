/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
I am aiming for exceeds expectations and only wish to accept that grade.
*/


// ELEMENT SELECTORS
const studentList = document.querySelector(".student-list");
const paginationList = document.querySelector(".link-list");
const searchInput = document.querySelector(".studentSearch");


/*
The `showPage` function:
/* This function will calculate how many and which students to dynamically show on the current page */
/* The number of students shown on the page can be changed by adjusting the variable studentsPerPage to the desired number of students to be shown */

// Set the Number of Students to be Shown on the Page
const studentsPerPage = 9;

function showPage(list, page) {
   const startIndex = page * studentsPerPage - studentsPerPage;
   const endIndex = page * studentsPerPage - 1;
   studentList.innerHTML = "";
 
   for (let i = 0; i < list.length; i++) {
     if (i >= startIndex && i <= endIndex) {
       const html = `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${list[i].picture.medium}" alt="Profile Picture of ${list[i].name.first} ${list[i].name.last}">
               <h3>${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>
       `;
 
       studentList.insertAdjacentHTML("beforeend", html);
     }
   }
 }
 

/*
The`addPagination` function
/* This function handles calculating how many buttons are needed and dynamically adds them to the page */

function handlePagination(list) {
   const numberOfButtons = Math.ceil(list.length / studentsPerPage);
   paginationList.innerHTML = "";
 
   for (let i = 1; i <= numberOfButtons; i++) {
     const html = `
       <li>
         <button type="button">${i}</button>
       </li>
     `;
     paginationList.insertAdjacentHTML("beforeend", html);
   }

   paginationList.querySelector("button").classList.add("active");
   
   /* This event listener handles calling our function below to change the page & add the `active` class  */
 
   paginationList.addEventListener("click", (e) => {
     const activeButton = paginationList.querySelector(".active");
     const buttonClicked = e.target.closest("button");
   
     if (activeButton && buttonClicked) {
       activeButton.classList.remove("active");
     }
   
     if (buttonClicked) {
       buttonClicked.classList.add("active");
       showPage(list, buttonClicked.innerHTML);
     }
   });
 }
 

// Call functions
showPage(data, 1);
handlePagination(data);