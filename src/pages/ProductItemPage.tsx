import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { IProduct, stockProduct } from "../types/types";
import { useParams, useHistory } from "react-router";
import { httpGet, storeId, token } from "../Server";
//import { productCounter, setProductCounter } from "../App";

interface ProductItemPageParams {
	id: string;
}

interface ProductItemnterface {
	basketFunction: () => void;
}

export const ProductItemPage: FC<ProductItemnterface> = ({ basketFunction }) => {

	const [product, setProduct] = useState<IProduct>(
		stockProduct
	);
	const params = useParams<ProductItemPageParams>();
	const history = useHistory();
	useEffect(() => {
		fetchProducts();
	}, [])
	function fetchProducts() {
		try {
			const theUrl = 'https://app.ecwid.com/api/v3/' + storeId + `/products/${params.id}?token=` + token;
			//console.log(params.id)
			const serverRespons = JSON.parse(httpGet(theUrl));
			//	let storeProfile = JSON.parse(serverRespons); ?token=' + token
			//const response = await axios.get<IProduct[]>('https://jsonplaceholder.typicode.com/users/')
			setProduct(serverRespons);
			///	console.log(serverRespons);
		} catch (e) {
			alert(e);
		}
	}
	function buyProduct(product: IProduct) {
		let tempVar = sessionStorage.getItem(product.name) ? sessionStorage.getItem(product.name) : '0';

		if (tempVar !== null) {
			let tempsVar = String(+tempVar + 1);
			sessionStorage.setItem(product.name, tempsVar);
		} else {
			sessionStorage.setItem(product.name, '1');
		}
		basketFunction();
	}
	return (
		<div>
			<button className='button button__back' onClick={() => history.push('/products')}>Back</button>
			<h1> {product?.name}</h1>
			<button className='button button__buy' onClick={() => buyProduct(product)}>Купить</button>
			<div>
				Цена: {product?.price}
			</div>
			<div dangerouslySetInnerHTML={{ __html: product.description }}></div>
			<img src={product.imageUrl} alt={product?.name} className='product-item__image_on-page' />
		</div>
	);
}