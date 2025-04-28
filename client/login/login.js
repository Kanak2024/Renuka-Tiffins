// handling login

import { setLogin, userLogin } from "../functioning.js";

document
  .querySelector(".auth-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    document.querySelector(".loading").style.display = "flex";

    const useremail = document.getElementById("email");
    const userpassword = document.getElementById("password");

    // Here you would typically send a request to your server to authenticate the user
    const data = {
      email: useremail.value,
      password: userpassword.value,
    };

    // backend me registeration ki call
    try {
      const userLoginData = await userLogin(data);
      const { name, email } = userLoginData.user;
      setLogin(true, email, name);
      document.querySelector(".loading").style.display = "none";
    } catch (err) {
      useremail.value = "";
      userpassword.value = "";
      document.querySelector(".loading").style.display = "none";

      throw err;
    }

    useremail.value = "";
    userpassword.value = "";

    document.querySelector(".loading").style.display = "none";
    window.location.href = "../index.html";
  });

  const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});