declare module 'postgres-error-codes' {
    type PostgresErrorCode = string
    type PostgresErrorCodes = {
        [key: string]: PostgresErrorCode
    }
    export = PostgresErrorCodes
}
