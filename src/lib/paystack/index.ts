import { PAYSTACK_SECRET } from '$env/static/private'
import axios from 'axios'

export const paystack = axios.create({
    baseURL: 'https://api.paystack.co/',
    headers: {
        'Authorization': `Bearer ${PAYSTACK_SECRET}`
    }
})