import { CheckallFav, CheckallOders, logout,showUserMenu } from "../functioning.js";
import { getAllFood } from "../utils/api.js";



const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});



const fetchData = async () => {
    try {
      const data = await getAllFood(); // ✅ waiting for the Promise to resolve
      data.forEach(async(food)=>{
              const checkCart= await CheckallOders(food.id)
              const checkFav = await CheckallFav(food.id)
              
            if(checkCart){
              document.getElementById('menu-fetch').innerHTML+=`
                <div class="menu-item">
                          <img src=${food.image} alt=${food.title} class="menu-img">
                          <div class="menu-content">
                              <h3 class="menu-title">${food.title}</h3>
                              <p class="menu-price">Rs. ${food.price}</p>
                              <p>${food.description}</p>
                              <div class="menu-actions">
                                  <button onclick="removeInCart('${food.id}')" class="add-to-cart">Remove</button>
                                  <button onclick="addInWhish('${food.id}')" class="add-to-wishlist" id=${food.id} style="color:${checkFav?"#e63946":"none"};">${checkFav?"♥":"♡"}</button>
                              </div>
                          </div>
                      </div>`
              }
            })
            document.querySelector('.loading').style.display='none';
     
    } catch (error) {
      document.querySelector('.loading').style.display='none';
      console.error("Failed to fetch food:", error);
    }

  };

  const buyNow=()=>
  {
    alert('Order has been placed!');
    window.location.href='../index.html';
  }

  window.addEventListener('load',()=>{
      fetchData();
      showUserMenu();
      logout('../index.html');
  })

  //     making function available globaly
  window.buyNow=buyNow;