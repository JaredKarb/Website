


// test
const toggleBtn = document.getElementById("darkMode");
// const theme = document.getElementById("theme");
var element = document.body;
var element2 = document.querySelector("header");
var element3 = document.querySelector("nav");
var element4 = document.querySelector("footer");
let darkMode = localStorage.getItem("dark-mode");
var head = document.getElementsByTagName('HEAD')[0];




const enableDarkMode = () => {
    
    // Create new link Element
    var link = document.createElement('link');
   
    // set the attributes for link element
    link.rel = 'stylesheet';
    link.id = 'styleover';
   
    link.href = 'css/override.css';
   
    // Append link element to HTML head
    head.appendChild(link);
    if (document.getElementById("newImg") != null) {
        document.getElementById("newImg").src = 'img/otheraboutmephoto.png';   
        element4.classList.add("dark-mode1");

    }
    
    element.classList.add("dark-mode");
    element2.classList.add("dark-mode");
    element3.classList.add("dark-mode1");
    toggleBtn.classList.remove("dark-mode-toggle");
    localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
    if (document.getElementById("newImg") != null) {
        document.getElementById("newImg").src = 'img/aboutmephoto.png';
        element4.classList.remove("dark-mode1");
    }
    var sheet = document.getElementById('styleover');
    console.log(sheet);
    if (sheet != null) {
        sheet.remove(sheet);

    }
    // var head = document.getElementById('styleover');
    // head.removeChild(head.children[5]);
    //   theme.classList.remove("dark-mode-theme");
    element.classList.remove("dark-mode");
    element2.classList.remove("dark-mode");
    element3.classList.remove("dark-mode1");
    toggleBtn.classList.remove("dark-mode-toggle");
    localStorage.setItem("dark-mode", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode(); // set state of darkMode on page load
}

// if (toggleBtn) {
toggleBtn.addEventListener("click", function() {
    darkMode = localStorage.getItem("dark-mode"); // update darkMode when clicked
    if (darkMode === "disabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
    });
// }
