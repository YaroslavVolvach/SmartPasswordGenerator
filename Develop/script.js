// Assignment code here

// Arrays for creating password

chars = "abcdefghijklmnopqrstuvwxyz !#$%&'()*+,-./:;<=>?@[\]^_`{|}~"

const alphabet_lowercase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","t","s","t","u","v","w","x","y","z"];

const alphabet_uppercase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const special_characters = [" ", "!", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "]", "^", "_", "`", "{", "|", "}", "~"];

var characters = []

// The len_valid function cheks that the user enters a password length only in a gentle range

function len_valid(min=8, max=128){
   var len = prompt(`Please select len of your password from ${min} to ${max}`)
    while(len < 8 || len > 128){
      len = prompt(`You selected ${len}. Try again. Please select len of your password from ${min} to ${max}`)
   }
   return len
  }

// The list_of_criteria function generates a password only for the given data type

function list_of_criteria(criteria){
  const criteria_list = []
  var index = 0
  if (criteria.include_lowecase === "Yes"){
    criteria_list[index] = alphabet_lowercase
    characters = characters.concat(alphabet_lowercase)
    index++
  }

  if(criteria.include_uppercase === "Yes"){
    criteria_list[index] = alphabet_uppercase
    characters = characters.concat(alphabet_uppercase)
    index++
  }

  if(criteria.include_numeric === "Yes"){
    criteria_list[index] = numbers
    characters = characters.concat(numbers)
    index++
  }

  if(criteria.include_special_characters === "Yes"){
    criteria_list[index] = special_characters
    characters = characters.concat(special_characters)
  }
  return criteria_list
}

// The prompt_type_valid function check that the userhas entered only valid data.

function prompt_type_valid(type_){
  var include_type = prompt(`Should the password include ${type_}? Answer only "Yes" or "No"`)
  while(!["Yes", "No"].includes(include_type)){
      include_type = prompt(`Error. Your answer is "${include_type}". Should the password include ${type_}? Answer only "Yes" or "No"`)
   }
   return include_type
  }

// The is_passwordValid function checks if the password matches the query criteria.

function is_passwordValid(password, criteria_list){
  for(element_array of criteria_list){
    if (password.filter(element => element_array.includes(element)).length === 0){
        
        return false
    }
  }
  return true
}

// The generatePassword generats password before correct password will be generated 

function generatePassword(len, creteria_list){
  const password = [];
  var is_valid = false;
  while(!is_valid){
    for(let i = 0; i < len; i++){
      password[i] = characters[Math.floor(Math.random() * characters.length)]
     }
    if (is_passwordValid(password, creteria_list)){
      is_valid = true
    }
 }
  return password.join("")
}
// Get references to the #generate element
var generateBtn = document.getElementById("generate");

var description = document.getElementById('description')

// Write password to the #password input
function writePassword() {
  const len = len_valid();
  const criteria = {
    'include_lowecase' : prompt_type_valid('lowercase'),
    'include_uppercase' : prompt_type_valid('uppercase'),
    'include_numeric' : prompt_type_valid('numeric'),
    'include_special_characters' : prompt_type_valid('special characters')
  }
  const criteria_list = list_of_criteria(criteria)
  const password = generatePassword(len, criteria_list);
  const passwordText = document.querySelector("#password");
    
  if(password.length === 0){
    passwordText.value = 'The answer to every question was "No"';
    description.innerHTML = 'You should have chosen some type to get the password, but you did not!';
    description.style.color = 'red';
  }else{
    passwordText.value = password;
    description.innerHTML = `Password criteria: Length: ${password.length}, Lowercase: ${criteria.include_lowecase}, Uppercase: ${criteria.include_uppercase}, Numeric: ${criteria.include_numeric}, Special Characters: ${criteria.include_special_characters}`;
    description.style.color = 'green';
    generateBtn.style.backgroundColor = 'green';
    generateBtn.innerText = 'It is done!'
    setTimeout(() => (generateBtn.innerText = 'You can create a new password!'), 5000)
  }

  characters = [];

}


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);