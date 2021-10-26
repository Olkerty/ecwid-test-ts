import React, { FC } from "react";

interface ListProps<T> {
	items: T[];
	renderItem: (item: T) => React.ReactNode
}

export default function List<T>(props: ListProps<T>) {
	//	props.items.forEach(item => console.log(item));
	return (
		<div className='list'>
			{props.items.map(props.renderItem)}
		</div>
	);
}