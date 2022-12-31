import React, { createContext, useState } from "react";
import { apiDelete, apiGet, apiPost, apiPostAdmin, apiPut, apiPutImg } from "../utils/axios";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'




export const dataContext = createContext()


const DataFetcher = ({children}) => {

    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])
    const [userDetails, setUserDetails] = useState({})
    const [orderDetails, setOrdersDetails] = useState({})
    const [orderId, setOrderId] = useState('')
    const [userOrders, setUserOrders] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [user, setUser] = useState({})
    const [allOrders, setAllOrders] = useState([])
    const [page, setPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [topProducts, setTopProducts] = useState([])

    const getAllProducts = async(keyword='', pageNumber='') => {
        const {data} = await apiGet(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
        setProducts(data.products)
        setPage(data.page)
        setPages(data.pages)
    }

    const getEachProduct = async(id) => {
      const {data} = await apiGet(`/api/products/${id}`)
        setProduct(data)

    }

    const Login = async(formData) => {
      try {
          const input = {
          email: formData.email,
          password: formData.password
        }
        
        const {data} = await apiPost('/api/users/login', input)
        toast.success(data.message)
        localStorage.setItem('currentUserInfo', JSON.stringify(data.User))
        console.log(data.message);
        
      } catch (err) {
        toast.error("Invalid credentials")
      }
    
    }

    const Signup = async(formData) => {
      try {
          const input = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          confirmpassword: formData.confirmpassword
        }
        
        const {data} = await apiPost('/api/users/signup', input)
        toast.success(data.message)
      } catch (err) {
        console.log(err)
        toast.error(err.response.data.Error)
      }
    }

    const getUserDetails = async() => {
        const {data} = await apiGet('/api/users/profile')
        setUserDetails(data)
    }

    const updateUserProfile = async(formData) => {
      try {
        const update = {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }
        const {data} = await apiPut('/api/users/profile', update)
        toast.success(data.message)
      } catch (err) {
        console.log(err)
        toast.error(err.response.data.Error)
      }
    }

    const addOrder = async(order) => {
      try {
        const incomingOrder = {
          orderItems: order.orderItems,
          shippingAddress: order.shippingAddress,
          paymentMethod: order.paymentMethod,
          itemPrice: order.itemPrice,
          taxPrice: order.taxPrice,
          shippingPrice: order.shippingPrice,
          totalPrice: order.totalPrice
        }
        const {data} = await apiPost('/api/orders', incomingOrder)
        toast.success(data.message)
       
        setOrderId(data.order._id)
        
        
      } catch (err) {
        console.log(err)
        toast.error(err.response.data.Error)
      }
    }


    const getOrderDetails = async(id) => {
      try {
        const {data} = await apiGet(`/api/orders/getorder/${id}`)
        setOrdersDetails(data);
      } catch (err) {
        console.log(err)
      }
  }

    const updateOrderToPaid=async(id, paymentResult)=>{
      try {
        const {data} = await apiPut(`/api/orders/${id}/pay`, paymentResult)
        toast.success(data.message)
        getOrderDetails(orderId)
      } catch (err) {
        console.log(err)
      }
    }

    const getAllUserOrders = async() => {
      try {
        const {data} = await apiGet('/api/orders/getalluserorders')
        setUserOrders(data)
      } catch (err) {
        console.log(err)
      }
    }

    const adminGetAllUsers = async() => {
      try {
        const {data} = await apiGet('/api/users/admingetallusers')
        setAllUsers(data.users)
      } catch (error) {
        console.log(error);
      }
    }

    const deleteUser = async(id) => {
      try {
        const {data} = await apiDelete(`/api/users/admindeleteuser/${id}`)
        toast.success(data.message)
        setTimeout(()=>{
          window.location.reload()
        },2000)
      } catch (error) {
        console.log(error);
      }
    }

    const adminGetUserById = async(id) => {
      try {
        const {data} = await apiGet(`/api/users/admingetuser/${id}`)
        setUser(data.user)
      } catch (error) {
        console.log(error);
      }
    }

    const adminUpdateUserById = async(id, form) => {
      try {
        const obj = {
          name: form.name,
          email: form.email,
          isAdmin: form.isAdmin
        }
        const {data} = await apiPut(`/api/users/adminupdateuser/${id}`, obj)
        toast.success(data.message)
      } catch (error) {
        console.log(error);
      }
    }

    const deleteProduct = async(id) => {
      try {
        const {data} = await apiDelete(`/api/products/${id}`)
        toast.success(data.message)
        setTimeout(()=>{
          window.location.reload()
        },2000)
      } catch (error) {
        console.log(error);
      }
    }

    const updateProduct = async(id, formData) => {
      try {
          const input = {
          name: formData.name,
          description: formData.description,
          brand: formData.brand,
          image: formData.image,
          price: formData.price,
          category: formData.category,
          countInStock: formData.countInStock
        }
        
        const {data} = await apiPutImg(`/api/products/${id}`, input)
        toast.success(data.message)
      } catch (err) {
        console.log(err)
        toast.error(err.response.data.Error)
      }
    }

    const createProduct = async() => {
      const {data} = await apiPost('/api/products/createproduct')
      toast.success(data.message)
      setTimeout(()=>{
        window.location.href = `/admin/product/${data.product._id}/edit`
      },2000)
    }

    const getAllOrders = async() =>{
      try {
        const {data} = await apiGet(`/api/orders`)
        setAllOrders(data)
      } catch (error) {
        console.log(error);
      }
    }
    
    const updateOrderToDelivered=async(id)=>{
      try {
        const {data} = await apiPut(`/api/orders/${id}/deliver`)
        toast.success(data.message)
        getOrderDetails(orderId)
      } catch (err) {
        console.log(err)
      }
    }

    const productReview = async(id, review)=>{
      try {
        const incomingReview = {
          rating: review.rating,
          comment: review.comment
        }
        const {data} = await apiPost(`/api/products/${id}/reviews`, incomingReview)
        toast.success(data.message)
      } catch (error) {
        console.error(error)
      }
    }

    const getTopProducts= async() =>{
      try {
        const {data} = await apiGet('/api/products/top')
        setTopProducts(data)
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <dataContext.Provider
    value={{ 
        getAllProducts,
        products,
        getEachProduct,
        product,
        Login,
        Signup,
        getUserDetails,
        userDetails,
        updateUserProfile,
        addOrder,
        getOrderDetails,
        orderDetails,
        orderId,
        updateOrderToPaid,
        getAllUserOrders,
        userOrders,
        adminGetAllUsers,
        allUsers,
        deleteUser,
        adminGetUserById,
        user,
        adminUpdateUserById,
        deleteProduct,
        updateProduct,
        createProduct,
        allOrders,
        getAllOrders,
        updateOrderToDelivered,
        productReview,
        page,
        pages,
        getTopProducts,
        topProducts
    }}>
        {children}
    </dataContext.Provider>
  
  )
}

export const useProvider = () => {
    const context = React.useContext(dataContext);
    if (context === "undefined") {
      throw new Error("useAuth must be used within the auth provider");
    }
    return context;
  };

export default DataFetcher

