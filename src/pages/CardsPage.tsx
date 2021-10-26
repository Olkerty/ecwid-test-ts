import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { IProduct } from "../types/types";
import List from "../components/List";
import { ProductItem } from "../components/ProductItem";
import { useHistory } from "react-router";
import { httpGet, storeId, token } from "../Server";
import { Categories } from "../components/Categories";

export const CardsPage = () => {
	const [cards, setCards] = useState<IProduct[]>([]);
	const history = useHistory();
	//setCards(products);

	useEffect(() => {
		fetchProducts();
	}, [])
	function fetchProducts() {
		try {
			const theUrl = 'https://app.ecwid.com/api/v3/' + storeId + '/products?token=' + token;
			const serverRespons = JSON.parse(httpGet(theUrl));
			//	let storeProfile = JSON.parse(serverRespons);
			//const response = await axios.get<IProduct[]>('https://jsonplaceholder.typicode.com/users/')
			setCards(serverRespons.items);
			//	console.log(serverRespons.items);
		} catch (e) {
			alert(e);
		}
	}

	return (
		<div className='cards-page'>
			<Categories />
			<List
				items={cards}
				renderItem={(product: IProduct) => <ProductItem
					product={product}
					key={product.id}
					onClick={(product) => history.push('products/' + product.id)}
				/>}
			/>


		</div>

	);

}
