import React from "react";
import ProductCard from "../components/ProductCard";

function ProductList(){

const products = [

{ id:1 , name:"Tomato", price:40 },

{ id:2 , name:"Potato", price:30 },

{ id:3 , name:"Carrot", price:50 }

];

return(

<div>

<h2>Products</h2>

{products.map(product => (

<ProductCard key={product.id} product={product}/>

))}

</div>

)

}

export default ProductList