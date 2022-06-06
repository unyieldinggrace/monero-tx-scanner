import BN from "bn.js";
import {Buffer} from "buffer";

const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const ALPHABET_SIZE = ALPHABET.length;
const BLOCK_SIZE = 8;
const ENCODED_BLOCK_SIZES = [0, 2, 3, 5, 6, 7, 9, 10, 11];
const FULL_ENCODED_BLOCK_SIZE = ENCODED_BLOCK_SIZES[8]; // 11

export function encode(buf) {
	if (!(buf instanceof Uint8Array || buf instanceof Buffer)) {
		throw new TypeError('Expected Uint8Array or Buffer');
	}
	const blockCount = Math.ceil(buf.length / BLOCK_SIZE);
	let encoded = '';

	for (let index = 0; index < blockCount; index++) {
		// Not .slice as we do not need a copy of bytes
		const block = buf.subarray(index * BLOCK_SIZE,
			index * BLOCK_SIZE + BLOCK_SIZE);
		const ecodedBlock = new Array(ENCODED_BLOCK_SIZES[block.length]).fill(ALPHABET[0]);

		let num = new BN(block);
		let i = ENCODED_BLOCK_SIZES[block.length] - 1;
		while (num.gtn(0)) {
			// TODO: replace to modrn from bn.js 5.x
			const remainder = num.modn(ALPHABET_SIZE);
			num = num.divn(ALPHABET_SIZE);
			ecodedBlock[i] = ALPHABET[remainder];
			i--;
		}
		encoded += ecodedBlock.join('');
	}
	return encoded;
}

export function decode(str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected String');
	}
	if (!ENCODED_BLOCK_SIZES.includes(str.length % FULL_ENCODED_BLOCK_SIZE)) {
		throw TypeError('Invalid encoded length');
	}
	const blockCount = Math.ceil(str.length / FULL_ENCODED_BLOCK_SIZE);
	const decodedLength = Math.floor(str.length / FULL_ENCODED_BLOCK_SIZE) * BLOCK_SIZE
		+ ENCODED_BLOCK_SIZES.indexOf(str.length % FULL_ENCODED_BLOCK_SIZE);
	const decoded = Buffer.allocUnsafe(decodedLength);

	for (let index = 0; index < blockCount; index++) {
		const block = str.substring(index * FULL_ENCODED_BLOCK_SIZE,
			index * FULL_ENCODED_BLOCK_SIZE + FULL_ENCODED_BLOCK_SIZE);

		let order = new BN(1);
		let num = new BN(0);
		for (let i = block.length - 1; i >= 0; i--) {
			const digit = ALPHABET.indexOf(block[i]);
			if (digit < 0) {
				throw TypeError('Invalid symbol');
			}
			num = order.muln(digit).add(num);
			order = order.muln(ALPHABET_SIZE);
		}
		if (num.gte(new BN(2).pow(new BN(8 * ENCODED_BLOCK_SIZES.indexOf(block.length))))) {
			throw TypeError('Overflow');
		}
		const decodedBlock = num.toArrayLike(Buffer, 'be', ENCODED_BLOCK_SIZES.indexOf(block.length));
		decoded.set(decodedBlock, index * BLOCK_SIZE);
	}
	return decoded;
}

export default {
	encode,
	decode,
};
