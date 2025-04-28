
export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getAllFood = async () => {
  try {
    const response = await api.get("/food/allfood", {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (err) {
    alert("Somthing Wents Wrong");
    throw err;
  }
};

export const getFood = async (id) => {
  try {
    const response = await api.get(`/food/${id}`, {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (err) {
    alert("Error : Food not fetched");
    throw err;
  }
};

// backend me user create request bejna
export const createUser = async (data) => {
  try {
    await api.post(
      "/user/register",
      data
    );
  } catch (err) {
    alert("Something Wents Wrong, Please Try Again !");
    throw err;
  }
};

// Login request bhejna
export const loginUser = async (data) => {
  try {
    const response=await api.post(
      "/user/login",
      data
    );
    return response.data
  } catch (err) {
    alert("Anable to login, Please Try Again !");
    throw err;
  }
};

// add to cart request bhejna backend me 
export const addToCart=async(id,email)=>{
   
  try{
     const res= await api.post(`/user/addtocart/${id}`,
        {
          email,
          id:id,
        }
      )
      return res.data
  }
  catch(err)
  {
   alert("Unable To Add To Cart, Please Try Again !");
    throw err;
  }
}

// removing from cart function join backend
export const removeFromCart=async(id,email)=>
{
  try {
   const res= await api.post(`/user/removefromcart/${id}`,
      {
        email
      }

  )
  return res.data
  } catch (err) {
    alert("Unable To Cancel Order, Please Try Again !");
    throw err;
  }
}

// favroites food
export const toFav=async(id,email)=>{
  try {
    await api.post(`/user/tofav/${id}`,
      {
        email
      }
    )
  } catch (err) {
   alert("Unable To Add In Wishlist, Please Try Again !");
    throw err;
  }
}

// getting all favrouites
export const getAllFav=async(email)=>{
  if(!email) return
  try {
    const res=await api.post(`/user/allfav`,
      {
        email
      }
    )
     
    return res.data["favFoodID"]
  } catch (err) {
    alert("Unable To Fetch Favroites, Please Try Again !");
    throw err;
  }
}

// getting all orders
export const getAllOrders=async(email)=>{
  if(!email) return
  try {
    const res=await api.post(`/user/alloders`,
        {email}
    )
    return res.data["oders"]
  } catch (err) {
    alert("Unable To Fetch orders, Please Try Again !");
    throw err;
  }
}
