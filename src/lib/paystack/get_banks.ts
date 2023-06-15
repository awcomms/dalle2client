import { paystack } from ".";

export const get_banks = (c: string) => paystack.get(`/bank?currency=${c}`)