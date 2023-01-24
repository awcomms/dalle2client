

export const BACKEND_SOCKET = import.meta.env.VITE_BACKEND_SOCKET;
export const BACKEND_HTTP = import.meta.env.VITE_BACKEND_HTTP;
export const PAYSTACK_TEST = import.meta.env.VITE_PAYSTACK_TEST;
export const PAYSTACK_LIVE = import.meta.env.VITE_PAYSTACK_LIVE;
export const PAYSTACK_MODE = import.meta.env.VITE_PAYSTACK_MODE
export const PAYSTACK = Number(PAYSTACK_MODE) ? PAYSTACK_LIVE : PAYSTACK_TEST;