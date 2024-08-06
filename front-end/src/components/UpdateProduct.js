import React,{useState,useEffect} from 'react';
import { Link,useParams,useNavigate } from 'react-router-dom';
const UpdateProduct = () => {
    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [category,setCategory]=useState("");
    const [company,setCompany]=useState("");
const params=useParams();
const navigate=useNavigate();
useEffect(()=>{
    getProductdetails();
},[])
const getProductdetails= async ()=>{
    // console.log(params);
let result=await fetch(`http://localhost:5000/product/${params.id}`,{
    headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
});
result=await result.json();
setName(result.name);
setCategory(result.category);
setPrice(result.price);
setCompany(result.company);
}
    const updateProduct=async ()=>{
console.log(name,price,category,company);

let result=await fetch(`http://localhost:5000/product/${params.id}`,{
    method:'Put',
    body:JSON.stringify({name,price,category,company}),
    headers:{
        'Content-Type':"application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
});
result=await result.json();
navigate('/');
// console.log(result);
    }

    return (
        <div className='product'>
            <h1>Update Product</h1>
            <input type="text" placeholder='Enter product name' className='inputBox' 
          value={name}  onChange={(e)=>{setName(e.target.value)}}/>


            <input type="text" placeholder='Enter price ' className='inputBox'
            value={price}   onChange={(e)=>{setPrice(e.target.value)}} />


            <input type="text" placeholder='Enter category' className='inputBox'
            value={category}   onChange={(e)=>{setCategory(e.target.value)}} />


            <input type="text" placeholder='Enter company name' className='inputBox'
            value={company}   onChange={(e)=>{setCompany(e.target.value)}} />


            <button onClick={updateProduct} className='appButton'>Update-Product</button>
        </div>
    )
}
export default UpdateProduct;