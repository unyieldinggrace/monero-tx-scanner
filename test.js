import {MoneroTXScanner} from "./index.js";

let txScanner = new MoneroTXScanner();

// if you want to use these keys in monero-wallet-cli for testing, restore from height 2624535
let privateViewKey = "b13c1b068a15bf910a478063ed7aa29774fb53886015e023c1459952d0a2ab0b";
let publicXMRAddress = "47g7fzSV9YQVE9FGohMgZueSnkCpfksfHHuSyZpLyjGNSfbRyQSBWRrHjyDhGs438VTM3UkqET9w2GRytU97WNGdFzNQSiF";
let publicXMRSubAddress = "83VsHcxvdnz2XSd6JGf1dv1fcpHq4RWCkVGX6RRezUKeTe5KXFv5V3G1QLoWwk8KveDXqQohkhLcFHeynQ5zhRQz6jzoRbY";

let testScanner = (TXData, privateViewKey, publicXMRAddress, expectedTotalAmount, expectedPaymentID, testLabel) => {
	let testName = "Test ["+testLabel+"]";

	let ownedTXData = txScanner.GetOwnedOutputsFromTX(TXData, privateViewKey, publicXMRAddress);
	if (ownedTXData.TotalAmountReceived !== expectedTotalAmount) {
		console.log(testName+" failed: expected total amount was not found. Expected: "+expectedTotalAmount +" Actual: "+ownedTXData.TotalAmountReceived);
		return;
	}

	if (ownedTXData.PaymentID !== expectedPaymentID) {
		console.log(testName+" failed: expected PaymentID was not found. Expected: "+expectedPaymentID +" Actual: "+ownedTXData.PaymentID);
		return;
	}

	console.log(testName+" passed.");
};

// Standard address, receiving 0.000001 XMR
let TXDataStandardTx = JSON.parse("{\n  \"version\": 2, \n  \"unlock_time\": 0, \n  \"vin\": [ {\n      \"key\": {\n        \"amount\": 0, \n        \"key_offsets\": [ 38189685, 13122150, 860567, 178185, 681255, 8626, 35868, 232657, 14069, 2898, 11469\n        ], \n        \"k_image\": \"c28babafc1015469a81b29a79c1c0adda1d86bb0b1fa71d3aa75f289d81ec6f4\"\n      }\n    }, {\n      \"key\": {\n        \"amount\": 0, \n        \"key_offsets\": [ 49188068, 2043430, 247284, 1475711, 216470, 21120, 100090, 17554, 3873, 5896, 22394\n        ], \n        \"k_image\": \"296772d8238847242cf2f340e79c1fecc3a406af7fa461be9edd6ebb720a123e\"\n      }\n    }\n  ], \n  \"vout\": [ {\n      \"amount\": 0, \n      \"target\": {\n        \"key\": \"22e47edd7d5761bec9b4439454449e9d3accd617757d620c1e8de99000ecb90f\"\n      }\n    }, {\n      \"amount\": 0, \n      \"target\": {\n        \"key\": \"1fd3e40b6e972c06d5928034d97f523e0b693da9606460a7a23f4e051a7d54ac\"\n      }\n    }\n  ], \n  \"extra\": [ 1, 128, 40, 209, 200, 92, 93, 163, 183, 204, 234, 193, 47, 29, 167, 106, 201, 117, 132, 167, 22, 105, 235, 82, 175, 103, 203, 217, 236, 228, 189, 191, 141, 2, 9, 1, 254, 2, 250, 124, 78, 29, 12, 210\n  ], \n  \"rct_signatures\": {\n    \"type\": 5, \n    \"txnFee\": 8150000, \n    \"ecdhInfo\": [ {\n        \"amount\": \"7315334054ea55a2\"\n      }, {\n        \"amount\": \"59d6397f172397cb\"\n      }], \n    \"outPk\": [ \"8df15c1b3f09667da6b47aa759ac1f40152575ecc89bdfc0d0562f1d9299bbf5\", \"3c1d6344062f321d0315fab99eda4abdb2dc1cb670d40b733079bfb64358a8f5\"]\n  }, \n  \"rctsig_prunable\": {\n    \"nbp\": 1, \n    \"bp\": [ {\n        \"A\": \"ae23a7836ea2317eeb69f9d39f87f81d6c4bd715253d8cd3f8d4273b44a469ab\", \n        \"S\": \"263a63d0b445b26cd08e5e4de8d62987f868a289321867a61c2ce436844a55b3\", \n        \"T1\": \"9a3d6b9189c718d67a39b43d3d9bf0860586837e81a9a5e0c5f2c4a09a76608b\", \n        \"T2\": \"f7979e90da5d809aa7804433d62df43fc0986acbd8d15f7114b9758db6eb627f\", \n        \"taux\": \"dcc182fb76f70715275257d6b10203c2c3be6150f9f6fae273a23bf4bc073500\", \n        \"mu\": \"60492d8754c56350b84029d9d5a836aa8e1d48a31e9f606a42b0ec5112810106\", \n        \"L\": [ \"3386aa922e50d0918d03aee509e88552ec45a8b13c1e12531d838041ddca812f\", \"1fffbfb1504f7b3515763230f1b3e243f37fd513b03f265e96305816ea4c9f01\", \"03ea950218aa3da29bf8059e649f68688c105f44f06cf6f41e42b14d33155f86\", \"7d62ad7e65f09e418d3a77512de2d97afd724e7c1de06464f2ba5047f636ccdc\", \"305c653457b0a6596d134d5720c808f90f870ca50ca0ef0f2443348fbc46a792\", \"db94f8d27a74787563288e8592a380a6f42d2fd6052a8087264213084f935ffd\", \"7aaa5dcfb72299b4ef6d77a1507441f4d23f5afcf28e2203af80ba092ef1bedd\"\n        ], \n        \"R\": [ \"3e17c25b5a641109c2c8ae4c0aad961fd4e82c68e5124df36aea73316ff6dec5\", \"5099030351a38af72458d76d5dbf309752769ca66ed7acb5c3972b223c4a9136\", \"3bc9d7bf5ce5436cdabfffa576cc16ced8026b3af0b2b5c23136689dcbff137d\", \"ee52105fd83d725c545111a3805de46115f102a6a6a42a8aa361f39817e9487b\", \"eb4afc5a57bc9d1cf95539cf7103fcf47400562129e4471a0570d981cfa049cc\", \"2a55a4db83925ba22ff346242e6ece53af46c19013837fa0aa2bf58406f0de20\", \"6c35e328de80fd08d71fc3b27ddafc6c2b40c9c69dd5014545eaab5bb93b0a96\"\n        ], \n        \"a\": \"430881579a41a6961e786765df3ca8247fcdcd3499e2765bb5c24ed8d9af4a05\", \n        \"b\": \"ca99bcf83e94598bf97708bf2f1881e2a99269fd8ee5317b04879f616fbff20b\", \n        \"t\": \"8310677a5278f3451d2cb32cb98b44ae5a3bd69e74cf4cf522644f8d515d8f04\"\n      }\n    ], \n    \"CLSAGs\": [ {\n        \"s\": [ \"59bcf0562b256007504bcd0e79e1c5faaff6a84e7a9584d00e2a62076a7ba903\", \"f8eae12a518203d401172fc2316862eea06cce228386c6484688c13b88681a05\", \"3b8faa26594b434c8c9ae8c621f58558f9895af01677489edbb00a4b6d272b03\", \"178176c607e19ffb53268d68103d09f1d927308419ef8b65dedb86b1e1478a0c\", \"3019962f8d573ff28833aa44a4e19a4bfc59ee74dd830e863f543e6cb3dc230a\", \"0f2d87637a8fa80bfb6d445ed2d064fece6381b35c8dda2573e8312fef803b02\", \"556016c038593c28ed58a38fe7398b6e7909985d9d85f226d8d4b920d8ed250d\", \"8557fdfd5b0765bf4c8ace0d34fc8021522643a3c0ba8f9ead73c27ab3ec200e\", \"fe7a392f57c99440f489e00000c5447f2cd605006f7ae942c57c500b8f7ed303\", \"1e5dad5a32dfc5699757e0522bf0b86849284b39371e9f198f58a8e44ba16009\", \"020c7b3ec63e5d35a08c335f31c802e7814b6b16995a9f22e26f6eb441b09107\"], \n        \"c1\": \"1e728bab5c52923deded30314bc37a373e39863b8b548dc3a6129035c1e5950e\", \n        \"D\": \"54d79de5faf5aa77579188010c5e436474eae1d59370bb76249685cc67bdd7d4\"\n      }, {\n        \"s\": [ \"7e04bf62949dde99fa1c3e1106c133c3e19a8b983f12350cae5d1f863db55a01\", \"6e6976ea4d851ccb78a23033610e0d43edb4242291579fab75bc1c3562337c08\", \"d8fc8df868e4cb1e42d1af97fd722986246b4f4b1fec007050db0065a64b680a\", \"d0f126f417fbff0693f1730892ec2de7c95af604b9d0159b532a6e501e249d0f\", \"02f15d75f3a3e9bbd59bbe2608b3d0f12df43db67d20fd924f2442b225995001\", \"37e7373c8dd882e597de767eae65d0c5e5ce72de9ce7fcbde9d65b7594570705\", \"bff0350f8400486d4eaaa29a330504e7c6851a71f3536408108654d9e6b1db05\", \"55e95bc0deba442a1d4c704effb6130b88be83911c5a6ea17f2adef7ec4d9a01\", \"52f0df8bc627181f3cfb34be16319495ee1625ecb3744c30d075a1b45730bc0b\", \"37294886c40d923f1f43c6328cdd0eeb1e40a987e4fdd9f7452fa74c8726700b\", \"9351a4284aec0f801364951ca5725d361b866400c25b2d9911f0222bf959a20b\"], \n        \"c1\": \"469cdb3946f39948aa23d3eb4e6546a2ce7507b4ce4a775a706130208f4ac807\", \n        \"D\": \"da3bae7fbff437c6fbb11bace1abb6df91b0f7a64e4ae545dab90275b358c2f9\"\n      }], \n    \"pseudoOuts\": [ \"3d59e8ae73a7fe02b3a65f83f1fc1d0acb448ca3f9b863b384d6293a7d1e8fc2\", \"9d3002c145c3ac10264ec9917d098e12a225a235ba22f56227d09271db057dee\"]\n  }\n}");
testScanner(TXDataStandardTx, privateViewKey, publicXMRAddress, 0.000001, null, 'standard address');

// Integrated address, receiving 0.0000011 XMR, with PaymentID "2c0538576768f48d". Integrated Address: [4HNngoFykovVE9FGohMgZueSnkCpfksfHHuSyZpLyjGNSfbRyQSBWRrHjyDhGs438VTM3UkqET9w2GRytU97WNGdP7EYackCBoRH1Vux97]
let TXDataStandardTxWithPaymentID = JSON.parse("{\n  \"version\": 2, \n  \"unlock_time\": 0, \n  \"vin\": [ {\n      \"key\": {\n        \"amount\": 0, \n        \"key_offsets\": [ 51115001, 99470, 222465, 1139535, 124776, 602713, 18111, 5440, 7621, 5260, 1319\n        ], \n        \"k_image\": \"f7b0e16c6bdc86773cf2f28d6bf5a50650b0172881321a8dab9d3aad7c2c556c\"\n      }\n    }, {\n      \"key\": {\n        \"amount\": 0, \n        \"key_offsets\": [ 47698618, 2054921, 3117259, 112088, 207605, 71063, 25624, 6327, 15080, 920, 29219\n        ], \n        \"k_image\": \"e5585965d57b9c664107398de47038009cb705af3df4eb6518b2a1afd433646a\"\n      }\n    }\n  ], \n  \"vout\": [ {\n      \"amount\": 0, \n      \"target\": {\n        \"key\": \"ccca3408fad70cea89a170b9596732d8251d1562a4c068cbdb119e9105eae956\"\n      }\n    }, {\n      \"amount\": 0, \n      \"target\": {\n        \"key\": \"30b12443292e63eff84731640c54c35ff160f891fb59044bfca0328b0add73c1\"\n      }\n    }\n  ], \n  \"extra\": [ 1, 244, 241, 3, 138, 60, 182, 38, 114, 250, 234, 246, 129, 33, 80, 143, 209, 139, 148, 9, 198, 55, 204, 119, 0, 105, 155, 40, 4, 110, 243, 48, 211, 2, 9, 1, 192, 176, 143, 156, 99, 145, 137, 214\n  ], \n  \"rct_signatures\": {\n    \"type\": 5, \n    \"txnFee\": 8140000, \n    \"ecdhInfo\": [ {\n        \"amount\": \"25d8dad8b3f5ee09\"\n      }, {\n        \"amount\": \"5c283b24b9926bd0\"\n      }], \n    \"outPk\": [ \"af47fee1bf9a6e96f1873c7ce69773bb8c288e26514f04233d73b9bc056fbf70\", \"f475263c169bd08313e59c9176c88ab9a0bb45656ef9e54877e46788ee5002f0\"]\n  }, \n  \"rctsig_prunable\": {\n    \"nbp\": 1, \n    \"bp\": [ {\n        \"A\": \"260e1e8cd8f2b1287f0c9be6a38c95214fe1d9a0d58c24ffcfe282ae925ef680\", \n        \"S\": \"37808190116e8b6759e3068cd5a1ecc6c91041794da9a4b447dcd90bc67b6a12\", \n        \"T1\": \"62ea46023f237cde3b6a05268070f1d73d0c09d6997c7d3048564f247da8391e\", \n        \"T2\": \"71db580f66e39a88289ddbe5a160adc0a593470df6645047919aac19647a8a88\", \n        \"taux\": \"b5064e0317f8884de6d9df28987d8b4b9a470c74f5f036dd8f0441701142490b\", \n        \"mu\": \"808575adb7606b6be775a10f8c2a253a078a9f0f32edca403cb6ba0de8f6c60f\", \n        \"L\": [ \"9b6de3cea8854eb2abc79239f084b60c918cc5461436bf8740ecdd94067d742b\", \"0d979308f5019eecb460e90b0dfff7c23d1b8e740ceafb8d5e78bbc7ef980781\", \"d3c4668fd370a2bd6c39239cbf78984b6513499148d11578854bd2d74a3af419\", \"23e91587915c7278937ebe4e9b384ef22a3e90f04a2b068a93a022f0aac8b04e\", \"0da765e786ac734522db9663845d6e3aeff4fd73c8b7467f7daa86245e03e9e5\", \"ed68caed63922e037e530dd08846632c487460d475edf6a9da11cce7ad9b9f89\", \"f5b8951f543c660f2e312235e4723121bc0ed450075422a0c7809d613137eefc\"\n        ], \n        \"R\": [ \"e03cbe6c4634d6ef5d4278c51d13f71a87a8676ac4d2777c047aec0e73bc80c7\", \"9d1581f6a1fa24762874a035be267292590c0db821b6dd2c03092b6f6afcc8b1\", \"da26a15131733ceec91f575fc854054c9daeb075b65fa9b248bfbaa516dfe2cc\", \"e306248cded9a51a82a04285f7226cdb054f29beeac85cb6e32a99e1abb2dc4a\", \"de9cdc06d84caf68a4a520f227402f3fa5f09c2e96d0d62206d1bec8447034aa\", \"f40fae88bca3a14df118903f3e2f96a89b922b02791fe432c9860b59dad6c894\", \"9b467f5bbb8cefa9d9770a458860478af922c064a2ea5a8e31787e844401bdbe\"\n        ], \n        \"a\": \"f15aef15e377601d600d951c567c2c8b4eb4b1082be74b104f1645fd58bcb407\", \n        \"b\": \"c28cb2ca50142c0b60a987635498c3a4dd8db302b07d4d11aa105485645a1407\", \n        \"t\": \"588267243f319fe93692f0eaebd79089775c1e05f79685e2b6ad9dcefd4a230c\"\n      }\n    ], \n    \"CLSAGs\": [ {\n        \"s\": [ \"936443cdaaf21c2b27e8b1c0452d01ee8b98f4b69fc291b7420677608ae82903\", \"943de3b294b2f812237b7175f451a2ea75cacecbbbad5302f954f647139bdd0f\", \"4bc55d41c91e2f8238e38b4892c051d56ec6a693319fa4ebc134321024f5fd0b\", \"7e13532bc2d59e9f0321fc8f6376acf1cc1cb002fe9dde8c13d9d78e30bc5e08\", \"ba302bd639affd6c10e9ad42f3c35b85b84065768a9602ca4c16b9af27b6f70d\", \"5d456c9afcc4e7e14f13742dd9aa0ec178817ed35e84fce3e4b3754ef44bc70e\", \"0878a26df87f70aa1d36487530872c0b43be49b7df7fd9becf0bdd88ec6c3d0c\", \"357a1387134603f2a3fb3aa97633581d676e1a6bf1e27f1bcc61977c9c2e940f\", \"ad59d3a109e939d3612822f4369ed9eabba708fcecc3c988f2d876dc040ed90a\", \"736af4e26ad80a7232a009b08c0c5526c0df49ced8e45d36354f1588d76bf307\", \"8eea73b3b3db5325dc3a9d0e9dc2ff9ddfc575c8de20d5ef6791ccbd6836f40a\"], \n        \"c1\": \"31ab12d57bb864e5fb145eed57d38e45f74f28ab2203d88c0479707ad3866407\", \n        \"D\": \"b9e275f134e09f24d3f591df4e2c2cce1ff23d307c2da28abc97b8e5a0c6e489\"\n      }, {\n        \"s\": [ \"16d1efac8eb9ce6353a14b8561a1085498d372ea520112d08d46fb65ff0e230c\", \"a235b682f69e728390708634356705733e85dc1c4f004b6cc0bff50029a0430b\", \"081b2a939d455c901640340cb4aa623a25e579650d89f41d5dc12bd18303c803\", \"ad2f9374ac2411d9fa5fe29dc917d2832d684d32211d2b2959e9333b8cadcb07\", \"975900afaa78a84727f30460bd3889c0d93a3150e1abb0091dbf967b25ef0c0d\", \"322f3d3da98b7185664b20518c1293e5e60a7eed16cd0ba9449fbcfa91396502\", \"d409ec339be3f4c9096c3c6d679721d2070b8e5bce6f0d4f1b1c93c4370ced05\", \"8223f0149efe2d97e4f73983ee833b47272b547f9442d92dab10013d28f08d08\", \"454837d0e336ddad4be70b1487f4e70e2efa2a3e08b0a3300592bda3342b8301\", \"654a797d5da041a248b5f1da6eece990d6251c59500e8ff9cac6a428696f1f0a\", \"4aaadfedcacde791ff06777c61bea71cf431f1ee0f63554cdbd96908eb10cb08\"], \n        \"c1\": \"9b2b2bff319558f3bded761566f22bcf3b93f79c5b3eb2415dcccf42277dd204\", \n        \"D\": \"36a4a12a9667b5d72b05d5aceb2457f737b097d5c549b7bccc6e015885bcd440\"\n      }], \n    \"pseudoOuts\": [ \"e2c0f80e1a1a36195965935751e9d7717adc4f0100332e08996d1bd7c1985a4b\", \"04c25f27704ff09c002282f54e984aa9ee86894f54f760b39ddf8527262871df\"]\n  }\n}");
testScanner(TXDataStandardTxWithPaymentID, privateViewKey, publicXMRAddress, 0.0000011, "2c0538576768f48d", 'standard address with paymentID');

// Subaddress, receiving 0.0000012 XMR. Subaddress (Account 0, Address 1): 83VsHcxvdnz2XSd6JGf1dv1fcpHq4RWCkVGX6RRezUKeTe5KXFv5V3G1QLoWwk8KveDXqQohkhLcFHeynQ5zhRQz6jzoRbY
let TXDataSubAddressTx = JSON.parse("{\n  \"version\": 2, \n  \"unlock_time\": 0, \n  \"vin\": [ {\n      \"key\": {\n        \"amount\": 0, \n        \"key_offsets\": [ 52615600, 299641, 199564, 114736, 31881, 326, 52556, 16478, 12895, 1116, 82\n        ], \n        \"k_image\": \"ec6db4130b068f351d636802a57e965aeadbf2b0ca197f7c4b2f5b568fe4703a\"\n      }\n    }, {\n      \"key\": {\n        \"amount\": 0, \n        \"key_offsets\": [ 48445027, 2991910, 952150, 608247, 177973, 11041, 69075, 78569, 8682, 2247, 1167\n        ], \n        \"k_image\": \"e1eedac5719d7f04a91d80cfa1b8b34815ddda4c5299792d1b36d11b8db97175\"\n      }\n    }\n  ], \n  \"vout\": [ {\n      \"amount\": 0, \n      \"target\": {\n        \"key\": \"be52480c28efb3ebfaeab6b94f9917b3199a8ce30d6471bbb4a52cbd17ea941d\"\n      }\n    }, {\n      \"amount\": 0, \n      \"target\": {\n        \"key\": \"8e8c02ecb6a240002f47cab57c1ccc4be57ae526ea9849656b3462007e1e5b90\"\n      }\n    }\n  ], \n  \"extra\": [ 1, 160, 48, 6, 129, 49, 175, 251, 167, 254, 73, 204, 61, 99, 131, 255, 67, 242, 138, 248, 162, 146, 187, 46, 150, 223, 94, 212, 168, 40, 76, 39, 109, 2, 9, 1, 184, 151, 2, 30, 235, 170, 114, 16\n  ], \n  \"rct_signatures\": {\n    \"type\": 5, \n    \"txnFee\": 8130000, \n    \"ecdhInfo\": [ {\n        \"amount\": \"cec38dce7c31c89e\"\n      }, {\n        \"amount\": \"1bafa557dcc0b8c7\"\n      }], \n    \"outPk\": [ \"3c9f8372c74415563ee0d423ce1301f1679cf654f16a1c8d8004e614ac891c1c\", \"d20ce787f10a6d4a77b6342b4bcb190bc5a58b1ff84213aeb31dae84782bd949\"]\n  }, \n  \"rctsig_prunable\": {\n    \"nbp\": 1, \n    \"bp\": [ {\n        \"A\": \"4fa7aa7405aad3c3204518e9cf2d7fed6165c78114b5e3b7296dbf1e69681cc8\", \n        \"S\": \"1227e91e3c003b02fcfef2e5188e27879515f2be2dde5e8e389dc9652b0f244f\", \n        \"T1\": \"16906eb9c4917ce133184b01b05d3116421dcea26dc04d027cde53f277b79b37\", \n        \"T2\": \"4e0ca4567b419ea87529c3de4c7d5f9585beef5755177606cf2dfc462870bed4\", \n        \"taux\": \"604fc98068d1b3fdfca06d3ac5a8fe472e8d7857f10f3f59fcaecc58e4e26403\", \n        \"mu\": \"a382581f5e7d4ee7dbd17332a3977deec9088c7ebb6a4c56c1bf5dde7c8c850d\", \n        \"L\": [ \"086c1baf3346da08c06c72c703c7eb72c6d5df5a13f516582f23758e33226c98\", \"42aefd0ac9f7130d6045f7ebf8ce704109844557ef790af73d9b954fd203574f\", \"e76a6e8fa640cbe296d8f9b0681f1412c54874388178bb0802ea7ac3c3796abd\", \"696ab19992dd4110e5087f134e12cf5c91c5ee824b45dea3b6ee629ade1fa4a7\", \"565b2463bb1ea3807caf010df7cc0c29a71a034984cf66c6ca4ec55dc820355e\", \"cebb8f16447ee79cd75ccde9a3caf90db30a1b2c54257c8359b01218aa16b84c\", \"17484877180a6e70bceb2087dd24d4ff073ae62847addf173e1d6d4338f3e0f5\"\n        ], \n        \"R\": [ \"9b7ecfdc3f4cdace0037f2ff537165414abcbd2bcd12244ed02f317aa8f828fd\", \"8585db46de5d421927853d89d31c08566e5f9175df02854fd1131329d24942a6\", \"34e5da9cb3c2aff7500c3991bd65f6f8f4c6b40b5eb3b507efb2992d37f4d781\", \"0d76c0bc2be43526c9c76a1e9b14d0908a88920a564abfcac69cf89ba066c63b\", \"e543e065feefc8d11f951dc47861afc9e59a5c26a46b4bb29620464d703f1412\", \"e7f4562a725c7e8cbef42abd9e7c63283a021b1f322f60e0dbff61478416f423\", \"7d45c970ac51320f8305d6462946741f28c4a87f1bd4d5800e20e816ddbb0122\"\n        ], \n        \"a\": \"1b6f439769b38c2a065bf1957f700628b5d7aa31a0b209656af9cade86323d0d\", \n        \"b\": \"1dc322d0bec238cec9630be9593816f8f72ecdfdb3ce7c1f9270aa35d03f7204\", \n        \"t\": \"7334c3edf23034ab291416bb3007526cc12eb64aa971cd3bfd2f832491b28009\"\n      }\n    ], \n    \"CLSAGs\": [ {\n        \"s\": [ \"dcbc9555c37d5b92f8e180bda3e1bbf502bc2742f95af4a8b65e147769c78101\", \"f3cbd983b8c6c14838185754838c4d31e605f44e49e16765d655d3550a202a08\", \"91e50cfaaf0dc4a72198a6b74f1f9808f8b16ab836d1b2c83f97750e3ea8850c\", \"5ef435e536f3f30a419a1ae56a7c0aaf023a9cd109101a60eb569656cc272d07\", \"76ca862aa8fcad8f9ef258440cc8db0ae92f5fa3d946c43e4691847693783a01\", \"ddcc12354c2af4b6b08a90a983b225c4bdecf6b30e2cbb5f8abfc8ddf7ba3b09\", \"c4a969c2350f026b326819b3d655e6db679f03d4ec618717019986470d138f06\", \"dbfac355dfdbed899e3cbfd7f235242f4bb25631ed3abb18d05f311546a1710c\", \"22b39d6fd9dd01501266a22beb845be012b3f427ca36aad3d6e5da1d365f7c0e\", \"c06c28d2dd1f5a1b905dd9cfd62641072d011d490334371bcc7e4e9eb79da606\", \"975e7ce7677ab70eb1f02ccffa0d2385ffb280e87828a5a92faab8d418b1e209\"], \n        \"c1\": \"23d66808294d43635fb996fb0d7b535224d53b2ece22779a5f17a44625fea20d\", \n        \"D\": \"3d24122c6060e18b03c7a83de87739d8ff5b4d88939123d15d6d5b7847a4c0f7\"\n      }, {\n        \"s\": [ \"306b580483e2c26a6dc945c3b5d0454c954e9f05a162c9feeb689a542c843e05\", \"2bee752d83a96744a826eeb639595cf9b65336b1ce65e4979ab29f18ec100c0e\", \"56ac858eabfea0f8cff6787d138b67a6fd4726f55081ea12d031e1ce2eed8809\", \"2a8c42e2d9720ae9e3916e61cb803731c548b98a7792f6a7c19111d4852e2406\", \"26804f812c98d9aae3449c3dd498d1957cedb60277fcd2af810794cd86547202\", \"a06db30a1a2bf056c0095afb6d719d1e141d6f35a7b30f388bc275683ca46904\", \"0b4373794c979fe0efbac98bd2bfca2ea42382ce7b4e5b4747e6b8c4b28c2507\", \"133b607de616dc263ebebe20ae422eccecfafb9c431f1a7a7e7cd22180d62d0f\", \"7be9bf7ab1e504ecb22c1528933649ed145528382dc05c94e38d4d1c8801780f\", \"915db02878ffae67288d0328156c80eaa6fe5c403467da34eb4cb131c551ee03\", \"4ef93892b2457b2859c486c7438b03bffe97a51f257d1661c4c8e8a47ff9010f\"], \n        \"c1\": \"7a6290b52e7b87b7440354c1483cf5de53250537cdd5ea4d07ccac7ad3117002\", \n        \"D\": \"52d78600f47dd6764611c7a97a86de70b3ec25e7bc648230c31731aaf49735f1\"\n      }], \n    \"pseudoOuts\": [ \"3dc170d066d3ca334426089d795b3a7ed642b5b22a9f959e71d47597718057bf\", \"8307dcb40f3b98e26949fed4642e1e27eca69d5d37e8ecfdc77d7582d1bc1d57\"]\n  }\n}");
testScanner(TXDataSubAddressTx, privateViewKey, publicXMRSubAddress, 0.0000012, null, 'subaddress');
