/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
I am aiming for exceeds expectations and only wish to accept that grade.
*/


// ELEMENT SELECTORS
const studentList = document.querySelector(".student-list");
const paginationList = document.querySelector(".link-list");
const searchInput = document.querySelector("header");

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

function addPagination(list) {
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
   
   /* This event listener handles calling the function to change the page & add the `active` class to the page being displayed */
 
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
 
/* An event Listener used to dynamically search and display the desired search criteria */
/* Function created to search by first or last name*/

function searchStudent(list) {
   html = `
          <h2>Students</h2>
          <label for="search" class="student-search">
            <span>Search by name</span>
            <input id="search" placeholder="Search by name...">
            <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
          </label>
        `    
  searchInput.innerHTML = html;

  searchInput.addEventListener("input", (e) => {
    let filteredStudents = [];
    let inputName = searchInput.querySelector("#search").value.toLowerCase();
  
    for(i=0; i < data.length; i++){
        let currentStudentFirst = list[i].name.first.toLowerCase();
        let currentStudentLast = list[i].name.last.toLowerCase();
    
        if(currentStudentFirst.includes(inputName) || currentStudentLast.includes(inputName)) {
          filteredStudents.push(list[i]);
      };
  
      if(filteredStudents.length > 0) {
        addPagination(filteredStudents);
        showPage(filteredStudents, 1);
      } else {
        studentList.innerHTML = "<h3>No results found for serch Criteria. Please search again.</h3>";
        paginationList.innerHTML = "";
      };
    };
  });
};

// Call functions
showPage(data, 1);
addPagination(data);
searchStudent(data);