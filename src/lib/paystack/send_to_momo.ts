import { v4 } from 'uuid';
import { create_momo_recipient } from './create_momo_recipient';
import { paystack } from '.';

export const send_to_momo = async ({
	name,
	number,
	bank,
	amount,
	reason
}: {
	name: string;
	number: string;
	bank: string;
	amount: number;
	reason: string;
}): Promise<string> => {
	const reference = v4();
	await paystack.post('/transfer', {
		source: 'balance',
		amount,
		reference,
		recipient: create_momo_recipient(
			name,
			number,
			bank
		),
		reason
	});
	return reference;
};
