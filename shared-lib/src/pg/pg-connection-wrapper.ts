import { Pool } from "pg";

/**
 * this class is a wrapper around the pg pool
 * it is used to connect to the postgresql database
 * it is a singleton class so that it can be used in different files
 */
class PgConnectionWrapper {
    private _pgPool?: Pool;

    /**
     * this function is used to get the pg pool
     * @returns the pg pool
     * @throws Error if the pg pool is not initialized yet
     */
    get pgPool(): Pool {
        if (!this._pgPool) {
            throw new Error("The pg pool is not initialized");
        }

        return this._pgPool;
    }

    /**
     * this function is used to connect to the postgresql database
     * @param user user name
     * @param host host name
     * @param database database name
     * @param password database password
     * @param port port number
     * @returns the promise of the connection
     * @throws Error if there is an error in connecting to postgresql
     */
    connect = async (user: string, host: string, database: string, password: string, port: number) => {
        return new Promise<void>((resolve, reject) => {
            try {
                this._pgPool = new Pool({
                    user,
                    host,
                    database,
                    password,
                    port,
                });
                console.info("Connected to the postgresql database successfully");
                resolve();
            } catch (error) {
                console.log("Error occured while connecting to the postgresql database: ", (error as Error).message);
                reject(error);
            }
        });
    };
}

export const pgConnectionWrapper = new PgConnectionWrapper();
