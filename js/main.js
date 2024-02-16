import "./mark-dialog.js";

const dialogOneBtn = document.querySelector(".openDialogOne");
const dialogTwoBtn = document.querySelector(".openDialogTwo");
const dialogOne = document.getElementById("dialogOne");
const dialogTwo = document.getElementById("dialogTwo");

document.addEventListener("DOMContentLoaded", () => {
  console.log("content loaded");
});

window.displayResponse = function (ev) {
  let random = Math.floor(Math.random() * 2);
  random === 0
    ? console.log("Yes, I would like some tea, please.")
    : console.log("No, do you have any beer?");
};

window.sayHello = function (ev) {
  console.log("hello back");
};

dialogOneBtn.addEventListener("click", (ev) => {
  // open first web component
  dialogOne.open();
});

dialogTwoBtn.addEventListener("click", (ev) => {
  // open second web component
  dialogTwo.open();
});

dialogOne.addEventListener("click", (ev) => {
  dialogOne.close();
});

dialogTwo.addEventListener("click", (ev) => {
  dialogTwo.close();
});
