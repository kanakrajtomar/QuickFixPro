import { Address } from "@/app/components/cart/BillingForm";
import axios from "axios";
import { setCookie } from "./utils";

const url = "https://ad-api.sampurnakart.in/";
const urlad = "https://stage-ad-api.sampurnakart.in/";

const url2 = "https://app-api.sampurnakart.in/";
const urlStage = "https://app-api.sampurnakart.in/";

const url3 = "https://stage-ad-api.sampurnakart.in/";

export async function fetchCategories() {
	try {
		const response = await axios.get(
			url3 + "api/products/listCategories?type=root",
		);
		const data = response.data;
		return data;
	} catch (error) {
		console.log("Error fetching categories: ", error);
	}
}

export async function fetchSubCategories(id: string) {
	try {
		const response = await axios.get(
			url + "api/products/listSubCategories?id=" + id,
		);
		const data = response.data;
		return data;
	} catch (error) {
		console.log("Error in fetching sub categories: ", error);
	}
}

export async function fetchHeroCarouselElements() {
	try {
		const response = await axios.get(url + "api/offers/getCarousal");
		const data = response.data;
		return data;
	} catch (error) {
		console.log("Error fetching carousel elements: ", error);
	}
}

export async function loginByEmail(email: string, password: string) {
	try {
		const response = await axios.post(urlStage + "api/signin", {
			emailOrPhone: email,
			password,
		});
		const user = {
			_id: response.data._id,
			name: response.data.name,
			email: response.data.email,
			buildingNo: response.data.buildingNo,
			streetName: response.data.streetName,
			area: response.data.area,
			city: response.data.city,
			state: response.data.state,
			pinCode: response.data.pinCode,
			phone: response.data.phone,
			refCode: response.data.refCode,
		};

		const token = response.data.token;

		setCookie("token", token, 7);

		return {
			user,
			token,
		};
	} catch (error) {
		return error;
	}
}

export async function registerByEmail(
	name: string,
	email: string,
	password: string,
	refCode: string,
	phone: string,
) {
	try {
		const response = await axios.post(urlStage + "api/signup", {
			name,
			email,
			password,
			refCode,
			phone,
		});
		const user = {
			_id: response.data._id,
			name: response.data.name,
			email: response.data.email,
			phone: response.data.phone,
		};

		const token = response.data.token;

		return {
			user,
			token,
		};
	} catch (error) {
		console.log("Error logging in: ", error);
	}
}

export async function fetchCart(token: string) {
	try {
		const headers = {
			"X-Auth-Token": token,
		};

		const response = await axios.get(url2 + "products/viewMyCart", {
			headers: headers,
		});
		const data = response.data;
		return data;
	} catch (error) {
		console.log("Error fetching cart Items: ", error);
	}
}

export async function addProductToCart(
	token: string,
	productId: string,
	variantId: number,
	productCount: number,
) {
	try {
		const headers = {
			"X-Auth-Token": token,
		};

		const response = await axios.post(
			url2 + "products/addToCart",
			{
				productId,
				variantId,
				productCount,
			},
			{
				headers: headers,
			},
		);
		const data = response.data;
		return data;
	} catch (error) {
		console.log("Error adding Product to the Cart: ", error);
	}
}

export async function fetchProductWithId(id: string) {
	try {
		const response = await axios.get(
			urlad + "api/products/getProduct?id=" + id,
		);
		const data = response.data;
		return data;
	} catch (error) {
		console.log("Error Fetching Product: ", error);
	}
}

export async function addToWishList(id: string, _v: number, token: string) {
	try {
		const body = {
			productId: id,
			variantIndex: _v,
		};
		const headers = {
			"X-Auth-Token": token,
		};
		const response = await axios.post(url + "products/addToWishlist", body, {
			headers: headers,
		});
		const data = response.data;
		return data;
	} catch (error) {
		console.log("Error adding to wishlist: ", error);
	}
}
export async function removeFromWishList(
	token: string,
	productId: string,
	variantIndex: number,
) {
	try {
		const body = {
			productId: productId,
			variantIndex: variantIndex,
		};
		const headers = {
			"X-Auth-Token": token,
		};
		const response = await axios.post(
			urlad + "products/removeFromWishlist",
			body,
			{
				headers: headers,
			},
		);
		const data = response.data;
		return data;
	} catch (error) {
		console.log("Error removing from wishlist: ", error);
	}
}

export async function fetchWishlist(token: string) {
	try {
		const headers = {
			"X-Auth-Token": token,
		};

		const response = await axios.get(url + "products/wishlist", {
			headers: headers,
		});
		const data = response.data;
		return data;
	} catch (error) {
		console.log("Error fetching wishlist: ", error);
	}
}
export async function orderProduct(
	token: string,
	address: Address,
	item: any,
	paymentMethod: string,
	discount: number | null,
) {
	try {
		const headers = {
			"X-Auth-Token": token,
		};

		const response = await axios.post(
			url2 + "products/order",
			{
				item: item,
				address: address,
				paymentMethod: paymentMethod,
			},
			{
				headers: headers,
			},
		);
		const data = response.data;
		return data;
	} catch (error) {
		console.log("Error Order Product: ", error);
	}
}

export async function fetchOrderHistory(token: string) {
	try {
		const headers = {
			"X-Auth-Token": token,
		};

		const response = await axios.get(url + "products/orderHistory", {
			headers: headers,
		});
		const data = response.data;
		return data;
	} catch (error) {
		console.log("Error Order Product: ", error);
	}
}
