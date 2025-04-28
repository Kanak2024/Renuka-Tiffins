import { addToCart, createUser, getAllFav, getAllOrders, loginUser, removeFromCart, toFav } from "./utils/api.js";

// function for set login
export const setLogin = (bool, e , userName ) => {
  userName=userName[0].toUpperCase()+userName.slice(1);
  sessionStorage.setItem("logedIn", bool);
  sessionStorage.setItem("email", e);
  sessionStorage.setItem("name", userName);
};

// function for creating user
export const registerUser = async (data) => {
  try {
    await createUser(data);
    alert("user register successfully");
  } catch (error) {
    throw error;
  }
};

// function for login user
export const userLogin = async (data) => {
  try {
    const userData=await loginUser(data);
    alert(userData.message);
    return userData
  } catch (error) {
    throw error;
  }
};

// function for sending is login to multiple js pages
export const isValidLogin = () => {
  const islogin = sessionStorage.getItem("logedIn");
  const logedemail = sessionStorage.getItem("email");
  const userName = sessionStorage.getItem("name");
  return { islogin, logedemail, userName };
};

// function to add in whishlist
export const addInWhish = async (id,path='./login/login.html') => {
  const {islogin,logedemail}=isValidLogin()
  if (!islogin) {
    alert("You must be login first");
    window.location.href = path;
    return;
  } else {
    try {
      await toFav(id,logedemail);
      const WhishlistBtn = document.getElementById(`${id}`);
      if (WhishlistBtn.textContent === "♡") {
        WhishlistBtn.textContent = "♥";
        alert("Item added to wishlist!");
      } else {
        WhishlistBtn.textContent = "♡";
        alert("Item removed from wishlist!");
      }
    } catch (err) {
      throw err;
    }
  }
  window.location.reload()
};

// function to add in cart
export const addInCart = async (id,path='./login/login.html') => {
  const {islogin,logedemail}=isValidLogin()
  if (!islogin) {
    alert("You must be login first");
    window.location.href =path;
    return;
  } else {
    try {
      const res=await addToCart(id,logedemail);
      alert(res);
    } catch (err) {
      throw err;
    }
  }

  window.location.reload()
};


// function for removing from cart
export const removeInCart =async (id)=>{
  const {islogin,logedemail}=isValidLogin()
  if (!islogin) {
    alert("You must be login first");
    window.location.href = "./login/login.html";
    return;
  } else {
    try {
      const res=await removeFromCart(id,logedemail);
      console.log(res)
      alert(res);
    } catch (err) {
      throw err;
    }
  }

  window.location.reload()
}

// function for checking is selected order is added in cart or not
export const CheckallOders=async (id)=>{
  const {islogin,logedemail}=isValidLogin()
  const res=await getAllOrders(logedemail)
  if(!islogin || res==''){
    return false
  }
  else{
      if(res.includes(id))
      {
        return true
      }
  }

  return false
}

// function for checking is selected order is added in whishlist or not
export const CheckallFav=async (id)=>{
  const {islogin,logedemail}=isValidLogin()
  const res=await getAllFav(logedemail)
  if(!islogin || res==''){
    return false
  }
  else{
      if(res.includes(id))
      {
        return true
      }
  }

  return false
}

// function for handling user login menu
export const showUserMenu=()=>{
  const {islogin}=isValidLogin();

  if(islogin){
    document.querySelector('.user-menu-container').style.display='inline-block'
    const allSign=document.querySelectorAll('.hidden');
    allSign?.forEach((i)=>{
      i.style.display='none';
    })
  }
  else{
    document.querySelector('.user-menu-container').style.display='none'
    const allSign=document.querySelectorAll('.hidden');
    allSign?.forEach((i)=>{
      i.style.display='block';
    })
  }
}

// function which handle Logout
export const logout=(path)=>{
  document.querySelector('.logout')?.addEventListener('click',()=>{
    sessionStorage.clear();
    window.location.reload();
    window.location.href=path;
  })
  
}

window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  header.classList.toggle('sticky', window.scrollY > 0);
 });

window.onbeforeunload = ()=>{
  window.scrollTo(0,0)
}

window.removeInCart = removeInCart;
window.addInWhish = addInWhish;
window.addInCart= addInCart;

