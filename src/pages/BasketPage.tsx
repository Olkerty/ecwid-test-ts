import React, { FC, useEffect, useState } from "react";
import List from "../components/List";
import { ProductInBasketItem } from "../components/ProductInBasketItem";
import { httpGet, storeId, token } from "../Server";
import { IProduct } from "../types/types";

interface BasketPageInterface {
	basketFunction: (item: string) => void;
}

export const BasketPage: FC<BasketPageInterface> = ({ basketFunction }) => {


	const [cards, setCards] = useState<IProduct[]>([]);
	useEffect(() => {
		fetchProducts();
	}, [])
	let arr: IProduct[] = [];
	function fetchProducts() {
		try {
			const theUrl = 'https://app.ecwid.com/api/v3/' + storeId + '/products?token=' + token;
			const serverRespons = JSON.parse(httpGet(theUrl));
			//	let storeProfile = JSON.parse(serverRespons);
			//const response = await axios.get<IProduct[]>('https://jsonplaceholder.typicode.com/users/')

			serverRespons.items.forEach((item: IProduct) => {
				if (sessionStorage.getItem(item.name)) {
					arr.push(item)
				}
			});
			setCards(arr);
			//		console.log(serverRespons.items);
		} catch (e) {
			alert(e);
		}
	}

	const removeFunction = (arr: IProduct[], card: IProduct) => {
		//console.log(arr);
		let tempArr = arr;
		/*
		tempArr.forEach(
			(item) => {
				console.log(item.id);
				console.log(card.id);
			}
		)
		*/
		tempArr = tempArr.filter(cd => {
			return cd.id !== card.id
		})
		setCards(tempArr);
	}
	const confirmPurch = () => {
		if (cards.length > 0) {
			setCards([]);
			sessionStorage.clear();
			basketFunction('0');
			alert('Поздравляем с покупкой')
		} else {
			alert('Купите что-нибудь')
		}
	}

	return (
		<div>
			<button className="button basket__button" onClick={() => confirmPurch()}>Оформить заказ</button>
			<List
				items={cards}
				renderItem={(product: IProduct) => <ProductInBasketItem
					product={product}
					key={product.id}
					remove={() => {
						removeFunction(cards, product)
						//		console.log(arr);
					}
					}
					decrease={() => basketFunction('-1')}
				/>}
			/>
		</div>
	);
}
