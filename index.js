import {CNUtil} from "./lib/cn_util.js";
import {BigInteger} from "biginteger";
import {decode as base58decode} from "./lib/base58-monero.js";
import BN from 'bn.js';

class MoneroTXScanner {

	constructor() {
		this.CNUtil = new CNUtil();
		this.EMPTY_PAYMENT_ID = "0000000000000000";
	}

	GetOwnedOutputsFromTX(TXData, privateViewKey, publicXMRAddress) {
		let outputs = [];

		let publicSpendKey = this.getPublicSpendKeyHex(publicXMRAddress);
		let TXExtraData = this.parseTXExtraData(TXData);
		let TXPublicKey = TXExtraData.TXPublicKey;

		let keyDerivation = this.CNUtil.generate_key_derivation(TXPublicKey, privateViewKey);
		TXExtraData.PaymentID = this.decryptPaymentID(TXExtraData.PaymentID, keyDerivation);

		if (!TXPublicKey) {
			throw "Unrecognized extra format";
		}

		let totalAmountReceived = new BN(0, 10);

		for (let outputIndex = 0; outputIndex < TXData.vout.length; outputIndex++) {
			let attemptedDerivedPublicKey = this.CNUtil.derive_public_key(keyDerivation, outputIndex, publicSpendKey);

			if (this.getOutputIsOwnedByTargetViewKey(attemptedDerivedPublicKey, TXData, outputIndex)) {
				let newOwnedOutput = this.getNewOutputStructure(TXData, TXExtraData, outputIndex, keyDerivation);
				totalAmountReceived = totalAmountReceived.add(newOwnedOutput.Amount);
				newOwnedOutput.Amount = newOwnedOutput.Amount.toString(10);
				outputs.push(newOwnedOutput);
			}
		}

		return {
			Outputs: outputs,
			TotalAmountReceived: this.convertToWholeXMR(totalAmountReceived.toString(10)),
			TotalAmountReceivedAtomic: totalAmountReceived.toString(10),
			PaymentID: TXExtraData.PaymentID
		};
	}

	getNewOutputStructure(TXData, TXExtraData, outputIndex, keyDerivation) {
		let amount = 0.00;
		if (this.shouldGetAmountFromRCTData(TXData, outputIndex)) {
			try {
				let decodedRct = this.decodeRct(TXData.rct_signatures, outputIndex, keyDerivation);
				amount = decodedRct.amount;
			} catch (e) {
				throw e + "\nRingCT amount for output " + outputIndex + " with pubkey: " + TXData.vout[outputIndex].target.key + " decoded incorrectly! It will not be spendable.";
			}
		} else {
			amount = TXData.vout[outputIndex].amount; // this code path is probably never used any more unless scanning historic TXs?
		}

		return {
			OutputIndex: outputIndex,
			Amount: new BN(amount, 10)
		};
	}

	getOutputIsOwnedByTargetViewKey(attemptedDerivedPublicKey, TXData, outputIndex) {
		return (attemptedDerivedPublicKey === TXData.vout[outputIndex].target.key);
	}

	shouldGetAmountFromRCTData(TXData, outputIndex) {
		return (TXData.version === 2 && TXData.vout[outputIndex].amount === 0);
	}

	getPublicSpendKeyHex(publicXMRAddress) {
		let addressBin = base58decode(publicXMRAddress)
		let addressHex = this.BinToHex(addressBin);
		return addressHex.slice(2,66);
	}

	parseTXExtraData(TXData) {
		let bin = TXData.extra;

		let extra = {
			TXPublicKey: false,
			PaymentID: false
		};

		if (bin[0] === 1) { //pubkey is tag 1
			extra.TXPublicKey = this.BinToHex(bin.slice(1, 33)); //pubkey is 32 bytes
			if (bin[33] === 2 && bin[35] === 0 || bin[35] === 1){
				extra.PaymentID = this.BinToHex(bin.slice(36, 36 + bin[34] - 1));
			}
		} else if (bin[0] === 2){
			if (bin[2] === 0 || bin[2] === 1){
				extra.PaymentID = this.BinToHex(bin.slice(3, 3 + bin[1] - 1));
			}
			//second byte of nonce is nonce payload length; payload length + nonce tag byte + payload length byte should be the location of the pubkey tag
			if (bin[2 + bin[1]] === 1){
				var offset = 2 + bin[1];
				extra.TXPublicKey = this.BinToHex(bin.slice(offset + 1, offset + 1 + 32));
			}
		}

		return extra;
	}

	decryptPaymentID(PaymentID, keyDerivation) {
		if (PaymentID.length !== 16) {
			return PaymentID;
		}

		let decryptedPaymentID = this.CNUtil.hex_xor(PaymentID, this.CNUtil.cn_fast_hash(keyDerivation + "8d").slice(0,16));
		if (decryptedPaymentID === this.EMPTY_PAYMENT_ID) {
			return null;
		}

		return decryptedPaymentID;
	}

	BinToHex(bin) {
		var out = [];
		for (var i = 0; i < bin.length; ++i) {
			out.push(("0" + bin[i].toString(16)).slice(-2));
		}

		return out.join("");
	}

	decodeRct(rv, i, der){
		var key = this.CNUtil.derivation_to_scalar(der, i);
		var ecdh = this.CNUtil.decode_rct_ecdh(rv.ecdhInfo[i], key);
		//console.log("ecdh: " + ecdh);
		var Ctmp = this.CNUtil.commit(ecdh.amount, ecdh.mask);
		//console.log("C: " + Ctmp);
		if (Ctmp !== rv.outPk[i]){
			throw "mismatched commitments!";
		}
		ecdh.amount = this.s2d(ecdh.amount);
		return ecdh;
	}

	s2d(scalar){
		return BigInteger.parse(this.swapEndian(scalar), 16).toString();
	}

	//switch byte order for hex string
	swapEndian(hex){
		if (hex.length % 2 !== 0){return "length must be a multiple of 2!";}
		var data = "";
		for (var i = 1; i <= hex.length / 2; i++){
			data += hex.substr(0 - 2 * i, 2);
		}
		return data;
	}

	convertToWholeXMR(atomicUnitsBase10String) {
		let len = atomicUnitsBase10String.length;
		let wholeXMRAmount;

		if (len <= 12) {
			let paddingZeroes = '';
			for (let i = 0; i < 12 - len; i++) {
				paddingZeroes += '0';
			}

			wholeXMRAmount = '0.' + paddingZeroes + atomicUnitsBase10String;
		} else {
			wholeXMRAmount = atomicUnitsBase10String.substring(0, len - 12) + '.' + atomicUnitsBase10String.substring(len - 12);
		}

		return parseFloat(wholeXMRAmount);
	}

}

export {MoneroTXScanner};
