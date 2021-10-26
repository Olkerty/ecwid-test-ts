import React, { FC } from "react";
import { IProduct } from "../types/types";

interface ProductItemProps {
	product: IProduct;
	onClick: (user: IProduct) => void;
}


export const ProductItem: FC<ProductItemProps> = ({ product, onClick }) => {
	//	console.log(product);
	return (
		<div onClick={() => onClick(product)} className='productItem'>
			{product.name} <br />
			Цена: {product.price}
			<div dangerouslySetInnerHTML={{ __html: product.description }} >
			</div>
			<img src={product.imageUrl} alt={product.name} className='product-item__image' />

		</div>

	);
};