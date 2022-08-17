# Monero TX Scanner

This package can be used to scan a Monero transaction and see if it belongs to a specific view-key and public address. It works completely client side, so there is no need to share your view-key or address with a scanning server or any third parties. The main goal is to make it much easier for people to create point-of-sale software that works in a browser or a mobile app, but I'm sure there will be other applications.

### Current Features
`monero-tx-scanner` supports scanning transactions that use:
* Normal addresses
* Subaddresses
* PaymentIDs

It also detects and reports the amounts received.

### API
This NPM package exports a single ES6 class `MoneroTXScanner`, with a single public method `GetOwnedOutputsFromTX`.

Install with:
```
npm install monero-tx-scanner
```

Example usage:

```
import {MoneroTXScanner} from "monero-tx-scanner";

let txScanner = new MoneroTXScanner();

// Don't worry, these keys are from a small test wallet used to develop this package, not my real wallet!
let privateViewKey = "b13c1b068a15bf910a478063ed7aa29774fb53886015e023c1459952d0a2ab0b";
let publicXMRAddress = "47g7fzSV9YQVE9FGohMgZueSnkCpfksfHHuSyZpLyjGNSfbRyQSBWRrHjyDhGs438VTM3UkqET9w2GRytU97WNGdFzNQSiF";

let ownedTXData = txScanner.GetOwnedOutputsFromTX(TXData, privateViewKey, publicXMRAddress);

console.log("Amount Received: " + ownedTXData.TotalAmountReceived);
console.log("PaymentID: " + ownedTXData.PaymentID); // will be null if there is no PaymentID in the TX.

```

To scan a subaddress, just specify the subaddress instead of the main public address:
```
let publicXMRSubAddress = "83VsHcxvdnz2XSd6JGf1dv1fcpHq4RWCkVGX6RRezUKeTe5KXFv5V3G1QLoWwk8KveDXqQohkhLcFHeynQ5zhRQz6jzoRbY";

let ownedTXData = txScanner.GetOwnedOutputsFromTX(TXData, privateViewKey, publicXMRSubAddress);
```

The `TXData` parameter is a JSON representation of a transaction in the same format you would receive by calling the `get_transactions` endpoint on monerod https://www.getmonero.org/resources/developer-guides/daemon-rpc.html#get_transactions, using the `txs_as_json` field from the returned data.


### Full Returned Data
There are a couple of other fields returned by the scanner for convenience in certain applications:
```
ownedTXData.Outputs - array of Output objects in case the TX has multiple outputs.
ownedTXData.TotalAmountReceivedAtomic - amount receive in atomic units (instead of whole XMR), formatted as a base 10 string.
```

Each output has the following fields:
```
output.OutputIndex - index among the outputs in the TX.
output.Amount - amount of this individual output, in atomic units, as a base 10 string.
```

### Credit to Luigi1111
This module is adapted from scanning code published by Luigi1111 at https://xmr.llcoins.net/checktx.html
That code appears to also be adapted from some earlier work by the MyMonero team. Luigi1111's code was a 
bit difficult to reuse in that form because it used a lot of global state, depended on the DOM of the HTML page, 
etc. Most of the work to create this NPM package was in taking Luigi1111's code, factoring out the scanning 
logic into a more reusable form, integrating with some existing cryptography modules and making the whole 
thing more NPM-friendly. Thanks to Luigi1111 for proving that the scanning CAN be done fully client-side and 
giving me a starting point.

### Tips ###
If this module is useful to you, feel free to leave a tip.
XMR Tip Jar: 87U3RX6JmHiJfWxGy1nRi1EChpuWXowCqChTAUDh8j6hc9Eg928JreVgJ8DEtW8C97W3MYuh8hKzoHxkpSY4CS7f8NPSHnK
