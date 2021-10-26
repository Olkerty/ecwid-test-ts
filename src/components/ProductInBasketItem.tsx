import React, { FC, useState } from "react";
//import { productCounter, setProductCounter } from "../App";
import { IProduct } from "../types/types";

interface ProductItemProps {
	product: IProduct;
	remove: () => void;
	decrease: () => void;
}


export const ProductInBasketItem: FC<ProductItemProps> = ({ product, remove, decrease }) => {
	//	console.log(product);
	const [count, setCount] = useState(sessionStorage.getItem(product.name));
	function deleteProductFromBasket(product: IProduct) {
		let tempVar = sessionStorage.getItem(product.name);
		//	console.log(tempVar);
		if (tempVar !== null && tempVar !== '1') {
			let tempsVar = String(+tempVar - 1);
			sessionStorage.setItem(product.name, tempsVar);
			setCount(tempsVar);
			decrease();
		} else {
			sessionStorage.removeItem(product.name);
			setCount('0');
			decrease();
			remove();
		}
		//setProductCounter(productCounter - 1);

	}
	return (
		<div className='productItem'>
			<div className='basket-item__information'>
				<p>	{product.name}</p>
				<p>	Цена: {product.price}, {count} штук в корзине </p>
				<button className="button button__delete" onClick={() => deleteProductFromBasket(product)}>Удалить</button>
			</div>
			<div dangerouslySetInnerHTML={{ __html: product.description }} >
			</div>
			<img src={product.imageUrl} alt={product.name} className='product-item__image' />

		</div>

	);
};