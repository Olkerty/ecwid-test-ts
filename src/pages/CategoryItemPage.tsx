import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { ICategory, IProduct, stockProduct } from "../types/types";
import { useHistory, useParams } from "react-router";
import { httpGet, storeId, token } from "../Server";
import { ProductItem } from "../components/ProductItem";
import List from "../components/List";
interface CategoryItemPageParams {
	id: string;
}
export const CategoryItemPage: FC = () => {

	const [category, setCategory] = useState<ICategory>({
		name: 'Missing',
		id: -1,
		imageUrl: "Absecnt",
	});
	const [cards, setCards] = useState<IProduct[]>([
		stockProduct
	]);
	const params = useParams<CategoryItemPageParams>();
	const history = useHistory();
	useEffect(() => {
		fetchCategory();
		fetchProducts();
		///	setCards(cards.filter((card) => { card.categoriesIds.includes(category.id) }));
	}, [])
	function fetchCategory() {
		try {
			const theUrl = 'https://app.ecwid.com/api/v3/' + storeId + `/categories/${params.id}?token=` + token;
			const serverRespons = JSON.parse(httpGet(theUrl));
			//	let storeProfile = JSON.parse(serverRespons); ?token=' + token
			//const response = await axios.get<IProduct[]>('https://jsonplaceholder.typicode.com/users/')
			setCategory(serverRespons);
			//	console.log(serverRespons);
		} catch (e) {
			alert(e);
		}
	}
	function fetchProducts() {
		try {
			const theUrl = 'https://app.ecwid.com/api/v3/' + storeId + '/products?token=' + token;
			const serverRespons = JSON.parse(httpGet(theUrl));
			//	let storeProfile = JSON.parse(serverRespons);
			//const response = await axios.get<IProduct[]>('https://jsonplaceholder.typicode.com/users/')
			let tempVar: IProduct[] = serverRespons.items;

			setCards(tempVar);
			//serverRespons.filter()
			try {
				//	console.log(tempVar.filter(card => card.categoriesIds.includes(category.id)));
			} catch (e) {
				console.log(1);
			}
		} catch (e) {
			alert(e);
		}
	}

	//console.log(category);
	//console.log(cards[0].categoriesIds);
	//console.log(cards);
	//console.log([2].includes(1));
	let arr: IProduct[] = [];

	cards.forEach(item => {
		if (item.categoryIds.includes(category.id)) {
			arr.push(item);
		}
	})

	return (
		<div>
			<button className='button button__back' onClick={() => history.push('/products')}>Back</button>
			<div className='category__information'>
				<h1>{category?.name} </h1>
				<img
					src={category?.imageUrl}
					alt={category?.name}
				>
				</img>
			</div>
			<List
				items={arr}
				renderItem={(product: IProduct) => <ProductItem
					product={product}
					key={product.id}
					onClick={(product) => { history.replace('products/' + product.id) }}
				/>}
			/>
		</div>
	);
}