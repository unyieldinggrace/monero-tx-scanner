declare module 'monero-tx-scanner' {
    export interface Output {
        OutputIndex: number,
        Amount: string
    }

    export interface OwnedOutputs {
        Outputs: Output[],
        TotalAmountReceived: number,
        TotalAmountReceivedAtomic: string,
        PaymentID: string|null
    }

    export class MoneroTXScanner {
        public GetOwnedOutputsFromTX(TXData: any, privateViewKey: string, publicXMRAddress: string): OwnedOutputs
    }
}
