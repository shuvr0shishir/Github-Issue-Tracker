# GitHub Issue Tracker

A simple web application to track and manage project issues.
Users can view all issues, filter issues them by status, search issues, and see detailed information about each issue.

---

## Live Demo

Add your live site link here

```
https://github-issue-tracker-by-sk.netlify.app/
```

---

## GitHub Repository

```
https://github.com/shuvr0shishir/Github-Issue-Tracker
```

---

## Features

* View all issues from API
* Filter issues by **All**, **Open**, and **Closed**
* Search issues using keywords
* See issue details in a modal
* Create new issues from the UI
* Loading spinner while fetching data
* Responsive design for different screen sizes

---

## Technologies Used

* HTML
* Tailwind CSS
* DaisyUI
* JavaScript (Vanilla)

---

## Conceptual Questions

### 1️⃣ What is the difference between var, let, and const?

Var, let, and const those are 3 types of variable in js. let and const comes with ES6 update, var is old and now nobody use it. Each variable has its own specific use case.
1. var - is function scoped. It can be redeclared and updated, that's why sometime creates issues.
2. let - is block-scoped, so it only works inside the block where it is declared. It can be update but can't be redeclared.
3. const - is also block-scoped. It can't be update or redeclared.

---

### 2️⃣ What is the spread operator (...)?

The spread operator (...) is used to spread elements from arrays or objects. It used to copy the value in new array or object, not referance. 
It means if do this:

```javascript
let arr1 = [1,2,3,4]
let arr2 = arr1    //pass referance

let arr3 = [...arr1]    //copies value only
```

It will pass the reference of arr1 into arr2 . If arr1 update it will also reflected in arr2 but not reflected in arr3.

---

### 3️⃣ What is the difference between map(), filter(), and forEach()?

These three methods of arrays in Modren JS (ES6).

1. map() is used to create a new array by modifying each element of the original array.
2. filter() is used to create a new array that contains only the elements that match a specific condition.
3. forEach() is used to loop through each element of an array and perform some action, but it does not return a new array.

---

### 4️⃣ What is an arrow function?

An arrow function is a shorter way to write a function in JavaScript. It was introduced in ES6. To write an arrow function, we use the => symbol. The basic syntax looks like this: () => {}.
There are some differences between a traditional and a arrow function. Arrow function usually needs to be stored in a variable before it can be used and cannot be called before it is declaration. 
but a traditional function can be called before its declaration.
If you try to call an arrow function before declaring it, JavaScript will show an error like "Cannot access before initialization" because the variable is in the Temporal Dead Zone (TDZ).

---

### 5️⃣ What are template literals?

Template literals are a modern way to work with strings in JavaScript.
They use backticks instead of single or double quotation marks. It allow variable inserting, Ternary operator (for conditional rendering),  Function call, multiline string with same spaceing and formating in run time.
The syntax is also very simple, like `${variable}`. we can write name of  variables, objects and functions inside the block { } and it will render dynamically.

There are so many use case of templete literals i can't said at all, it feels when we coding. i think this is the most needed and best feature of ES6 update.
