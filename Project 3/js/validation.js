/* Project 5 Template */

// let phoneRegex = /[a-z]/;  //TODO go to regexer.com or reg101.com and find a suitable phone number regex and place here
let phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
let emailRegex = /[\w]*@[\w]*.{1}(com|gov|edu|io|net){1}/;
let zipCodeRegex = /(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?(?<ERROR>.+)?/

const stateAbbreviations = [
  'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
  'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
  'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
  'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
  'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];
let form=null;
let successMsg=null;
function initValidation(formId, successId) {

  form = document.getElementById(formId);
  successMsg = document.getElementById(successId);

  
  form.addEventListener("submit", submitForm );

}
function inputChanged(ev) {
  let el = ev.currentTarget;
  validateForm();
  el.classList.add('was-validated')
  /*NOTE: we use 'was-validated' class so that you show the error indications only for the single field rather than the whole form at once*/
  //TODO: ADD 'was-validated' to the current element

 
}

function submitForm(ev) {
  let form=ev.currentTarget;
  //if you don't preventDefault and stopPropagation
  //the default form action would be to redirect to the url in the 'action' attribute of the form
  //https://wp.zybooks.com/form-viewer.php
  ev.preventDefault(); //for now so we don't redirect
  ev.stopPropagation();

  validateForm();
  let inputs = document.querySelectorAll("input");
  for (input of inputs) {

    input.addEventListener("change", inputChanged);
  }

  // DOM checkValidity function tells you current status of form according to html5
 

  if (!form.checkValidity()) {
    //TODO - if form is invalid, set 'was-validated' class on all inputs to show errors
    let inputs = document.querySelectorAll("input");

    for (input of inputs) {
      input.classList.add("was-validated");
    }

   
  } else {
    /*TODO - hide form and show success Message*/
    successMsg = document.getElementById("success");
    form.style.display = "none";
    successMsg.innerHTML = "Thanks!";


  }

}


function validateForm() {

  checkRequired("first-name", "First Name is Required");
  checkRequired("last-name", "Last Name is Required");
  checkRequired("address", "Address is Required");
  checkRequired("city", "City is Required");
  if(checkRequired("state", "State is Required")){
    validateState("state", "Not a valid State, enter two digit code e.g., UT");
  }
 
  if (checkRequired("email", "Email Address is required")) {
    checkFormat("email", "email format is bad", emailRegex)
  }
  if (checkRequired("zip", "Zip Code is Required")) {
    checkFormat("zip", `malformed zip-code, please use either "#####", or "#####-#### format.`, zipCodeRegex)
  }
  if (checkRequired("phone", "Phone is required")) {
    checkFormat("phone", "phone format is bad", phoneRegex)
  }
  checkRequired("instagram", "CheckBox is required");


}

function validateState(id, msg) {
  let el = document.getElementById(id);
  let valid = false;
  //TODO
  //get value from el, and convert to upper case
  //check whether the value is in the stateAbbreviations array
  el.value.toUpperCase();
  if (stateAbbreviations.includes(el.value.toUpperCase())) {
    valid = true;
  }
 
  setElementValidity(id, valid, msg);
}

function checkFormat(id, msg, regex) {
  //this function applies a regex to determine if element is valid
 //TODO-get element value and test it against the regex that was passed in
  let el = document.getElementById(id);
  let valid = el.value.match(regex);
  setElementValidity(id, valid, msg);
  return valid;

}

function checkRequired(id, message) {
  let el = document.getElementById(id);
  let valid = false;
  let type = el.type;
  switch (type) {
    case 'text':
      if (el.value != '') valid = true;
    case 'password':
     //TODO-check if input has a 'value', set valid to true if so, false if not
      if (el.value != '') valid = true;
      break;

    case 'checkbox':

      let check = document.getElementsByName("find-page");
      check.forEach(item => {
        if (item.checked) {
          valid = true;
        }
      })
      if (valid) el.classList.add('was-validated');
      setElementValidity("instagram", valid, message);
      break;
    case 'radio':

  //TODO
  //Validate whether any of the checkboxes are checked. set 'valid' to true if checked
  //remember that the 'name' field is shared by all of them so you can get the element's name, then
  //use a querySelectorAll to get the radio/check elements to validate.
  //if any of the elements is 'checked', return true.
  
    

  }
  setElementValidity(id, valid, message);
  

  return valid;
}


function setElementValidity(id, valid, message) {
  let el = document.getElementById(id);
  let newID = id + "-out"
  let ermsg = document.getElementById(newID);

  if (valid) { //it has a value

    el.setCustomValidity(''); //sets to no error message and field is valid
    if (ermsg) {
      ermsg.innerText = "";

    }


  } else {

    if (ermsg) {
      if(id === "instagram") {
        ermsg.innerText = "Error invalid Checkbox"
      }
      else {
        el.setCustomValidity(message); //sets error message and field gets 'invalid' stat

        ermsg.innerText = "Error invalid " + id;

      }

    }


    //TODO  insert or remove message in error div for element
  

  }
  el.reportValidity();

}