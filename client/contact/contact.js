import { isValidLogin, logout, showUserMenu } from "../functioning.js";

 const menuToggle = document.getElementById('menu-toggle');
 const navLinks = document.getElementById('nav-links');

 menuToggle.addEventListener('click', () => {
     navLinks.classList.toggle('active');
 });

 window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  header.classList.toggle('sticky', window.scrollY > 0);
});




// logic for form submittion and all
const submitForm=()=>{
      const form=document.getElementById('form');
      const user=document.getElementById('name');
      const useremail=document.getElementById('email');
      const mess=document.getElementById('message')
      const {islogin,userName,logedemail}=isValidLogin();

      if(islogin){
            user.value=userName;
            useremail.value=logedemail;
      }

form.addEventListener('submit',async (e)=>{
      e.preventDefault();
     document.querySelector('.submitting').style.display='flex';
      if(!islogin){
            alert('you must be login')
            user.value='';
            useremail.value='';
            mess.value='';
            window.location.href='../login/login.html';
            return;
      }
      
      const formData=new FormData(e.target);
     
      try{
     const response=await fetch(e.target.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
          })

            if (response.ok) {
              alert("Thanks for contact Us!")
              mess.value='';
              document.querySelector('.submitting').style.display='none';

              return
            } else {
              response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                  alert( data["errors"].map(error => error["message"]).join(", "))
                  document.querySelector('.submitting').style.display='none';

                } else {
                  alert( "Oops! There was a problem submitting your form")
                  document.querySelector('.submitting').style.display='none';

                }
              })
            }
      }catch(error ) {
            alert( "Oops! There was a problem submitting your form")
            document.querySelector('.submitting').style.display='none';
            console.log(error)
          }
})
}

window.addEventListener('load',()=>{
      showUserMenu();
      logout('../index.html');
      submitForm();
  })