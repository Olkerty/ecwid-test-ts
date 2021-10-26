import React, { FC } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ICategory } from "../types/types";
import List from "./List";
import { CategoryItem } from "./CategoryItem";
import { useHistory } from "react-router";
import { httpGet, storeId, token } from "../Server";

export const Categories: FC = () => {
	const [categs, setCategs] = useState<ICategory[]>([]);
	const history = useHistory();

	useEffect(() => {
		fetchCategories();
	}, [])
	function fetchCategories() {
		try {
			const theUrl = 'https://app.ecwid.com/api/v3/' + storeId + `/categories?token=` + token;
			const serverRespons = JSON.parse(httpGet(theUrl));
			//	let storeProfile = JSON.parse(serverRespons); ?token=' + token
			//const response = await axios.get<IProduct[]>('https://jsonplaceholder.typicode.com/users/')
			setCategs(serverRespons.items);
			//	console.log(serverRespons);
		} catch (e) {
			alert(e);
		}
	}

	return (
		<List
			items={categs}
			renderItem={(category: ICategory) => <CategoryItem
				category={category}
				//(product) => history.push('products/' + product.id)
				onClick={(category) => { history.push('categories' + category.id) }}
			/>}
		/>
	);

}
