import React from "react";
export const storeId = 58958138;
export const token = 'public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD';

export function httpGet(theUrl: string) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false); // false for synchronous request
	xmlHttp.send(null);
	return xmlHttp.responseText;
}