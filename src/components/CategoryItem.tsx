import React, { FC } from "react";
import { ICategory, IProduct } from "../types/types";

interface CategoryItemProps {
	category: ICategory;
	onClick: (category: ICategory) => void;
}

export const CategoryItem: FC<CategoryItemProps> = ({ category, onClick }) => {
	return (
		<div className='category-item' onClick={() => onClick(category)}>
			{category.name}
		</div>
	);
}