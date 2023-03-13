 let mode;

 function addActive(main) {
     let mode = document.querySelectorAll(".mode");
     mode.forEach((element) => {
         element.classList.remove("active");
     })
     main.classList.add("active");
 }

 function showOptions_1(main) {
     mode = "time";
     document.querySelector(".time-mode").style.display = "inline";
     document.querySelector(".grid").style.display = "inline";
     document.querySelector(".play-button").style.display = "inline";
     document.querySelector(".multiplayer").style.display = "none";
     document.querySelector(".moves-mode").style.display = "none";
     document.querySelector(".preselect").style.display = "none";
 }

 function showOptions_2(main) {
     mode = "multiplayer";
     document.querySelector(".time-mode").style.display = "none";
     document.querySelector(".grid").style.display = "inline";
     document.querySelector(".play-button").style.display = "inline";
     document.querySelector(".multiplayer").style.display = "inline";
     document.querySelector(".moves-mode").style.display = "none";
     document.querySelector(".preselect").style.display = "none";
 }

 function showOptions_3(main) {
     mode = "moves";
     document.querySelector(".time-mode").style.display = "none";
     document.querySelector(".grid").style.display = "inline";
     document.querySelector(".play-button").style.display = "inline";
     document.querySelector(".multiplayer").style.display = "none";
     document.querySelector(".moves-mode").style.display = "inline";
     document.querySelector(".preselect").style.display = "none";
 }

 //  function for sending values

 function valueSender() {
     let time = document.querySelector(".time-value").value,
         gridHeight = document.querySelector(".height").value,
         gridWidth = document.querySelector(".width").value,
         moves = document.querySelector(".moves").value,
         players = document.querySelector(".players").value;
     if ((gridHeight * gridWidth) % 2 != 0) {
         alert("Please Enter A valid Grid Combination (Shoud be Even)")
         return;
     }
     localStorage.setItem("time-value", time);
     localStorage.setItem("Height", gridHeight);
     localStorage.setItem("Width", gridWidth);
     localStorage.setItem("Mode", mode);
     localStorage.setItem("Move", moves);
     localStorage.setItem("Players", players);
     //  window.location.href = "game.html";
 }