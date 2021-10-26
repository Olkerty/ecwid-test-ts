import { __String } from "typescript";

export interface IProduct {
	name: string;
	price: number;
	imageUrl: string;
	categories: ICategory[];
	categoryIds: number[];
	description: string;
	id: number;
}

export interface ICategory {
	name: string;
	id: number;
	imageUrl: string;
}

export const stockProduct: IProduct = {
	name: 'Name is abscent',
	price: 0,
	imageUrl: 'NOIMAGE',
	categories: [{
		name: 'No category name',
		id: -1,
		imageUrl: 'NOIMAGE',
	}],
	description: 'NO description',
	id: -1,
	categoryIds: [0],
}