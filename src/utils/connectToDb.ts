import {createConnection} from "typeorm";
import logger from "./logger";

async function connectToDatabase() {
    try {
        await createConnection();
        logger.info("Database connected");
    } catch (e) {
        logger.error("Could not connect to database");
        logger.error(e);
        process.exit(1);
    }
}

export default connectToDatabase;
