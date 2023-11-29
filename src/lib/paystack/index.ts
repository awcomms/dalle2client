// import {
// 	PAYSTACK_SK_LIVE,
// 	PAYSTACK_SK_TEST
// } from '$env/static/private';
// import {
// 	PUBLIC_PAYSTACK_PK_LIVE,
// 	PUBLIC_PAYSTACK_PK_TEST,
// 	PUBLIC_PAYSTACK_TEST
// } from '$env/static/public';
import axios from 'axios';

export const PAYSTACK_SK = ""
	// PUBLIC_PAYSTACK_TEST
	// 	? PAYSTACK_SK_TEST
	// 	: PAYSTACK_SK_LIVE;
export const PAYSTACK_PK = ""
	// PUBLIC_PAYSTACK_TEST
	// 	? PUBLIC_PAYSTACK_PK_TEST
	// 	: PUBLIC_PAYSTACK_PK_LIVE;

export const paystack = axios.create(
	{
		baseURL:
			'https://api.paystack.co/',
		headers: {
			Authorization: `Bearer ${PAYSTACK_SK}`
		}
	}
);
