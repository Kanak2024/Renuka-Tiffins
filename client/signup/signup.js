import { registerUser} from "../functioning.js";

document.querySelector(".auth-form").addEventListener("submit",async (event) => {
  event.preventDefault(); // Prevent the default form submission
  
  document.querySelector(".loading").style.display = "flex";

  const useremail = document.getElementById("email");
  const userpassword = document.getElementById("password");
  const username = document.getElementById("username");

  // Here you would typically send a request to your server to authenticate the user
  const data = {
    name: username.value,
    email: useremail.value,
    password: userpassword.value,
  };
  
  // backend me registeration ki call
 try{
  await registerUser(data);
  document.querySelector(".loading").style.display = "none";

 }
 catch(err){
  useremail.value = "";
  userpassword.value = "";
  username.value = "";
  document.querySelector(".loading").style.display = "none";

  throw err
 }
   
  useremail.value = "";
  userpassword.value = "";
  username.value = "";

  document.querySelector(".loading").style.display = "none";

  window.location.href = "../login/login.html";
});

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});