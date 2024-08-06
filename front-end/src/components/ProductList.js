import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types';
const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        setProducts(result);
    }
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    };
    const searchHandle=async (e)=>{
            console.log(e.target.value);
            let key=e.target.value;
            if(!key){
                getProducts();
            }
            let result=await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
result=await result.json();
if(result){
    setProducts(result);
}
    }
    
    return (
        <div className='product-list'>
            <h3>Productlist</h3>
            <input type="text"placeholder='Search Product ' className='search-product-box'
            onChange={searchHandle}/>
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
                <li>Company</li>
            </ul>

            {
                products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>Rs {item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/" + item._id} >Update</Link>
                        </li>
                    </ul>
                )
            }
        </div>
    )
}
export default ProductList;