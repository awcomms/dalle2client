import { paystack } from "."

export const create_momo_recipient = (name: string, number: string, bank: string) => {
    paystack.post('/transferrecipient', {type: 'mobile_money', name, number, bank, currency: 'GHS'})
}