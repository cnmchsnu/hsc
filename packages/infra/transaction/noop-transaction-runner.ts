import { TransactionRunner } from "./transaction-runner";

export class NoopTransactionRunner
implements TransactionRunner {

    async run<T>(
        operation: () => Promise<T>,
    ): Promise<T> {

        return await operation();

    }

}