// import pkg from "pg";
// import dotenv from "dotenv";
// import { db, sql } from "@vercel/postgres";

// dotenv.config();

// const { Pool } = pkg;

// // PostgreSQL connection pool
// const pool = new Pool({
// 	user: process.env.DB_USER,
// 	host: process.env.DB_HOST,
// 	database: "postgres", // Initially connect to the postgres database
// 	password: process.env.DB_PASSWORD,
// 	port: process.env.DB_PORT,
// });

// // Reconnect to the desired database
// const switchPoolToDb = (dbName) => {
// 	return new Pool({
// 		user: process.env.DB_USER,
// 		host: process.env.DB_HOST,
// 		database: dbName, // Connect to the target database
// 		password: process.env.DB_PASSWORD,
// 		port: process.env.DB_PORT,
// 	});
// };

// // Ensure that the database exists
// const ensureDatabaseExists = async (dbName) => {
// 	const client = await pool.connect();
// 	try {
// 		const result = await client.query(
// 			`SELECT EXISTS(SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower($1));`,
// 			[dbName]
// 		);
// 		const databaseExists = result.rows[0].exists;
// 		console.log(databaseExists);

// 		if (!databaseExists) {
// 			// Create the database
// 			await client.query(`CREATE DATABASE "${dbName}";`);
// 		}
// 	} finally {
// 		client.release(); // Release the connection back to the pool
// 		// Do not end the pool here; we need to keep it open for future requests
// 	}
// };

// // Ensure that the table exists in the specified database
// const ensureTableExists = async (client, tableName) => {
// 	const result = await client.query(
// 		`SELECT EXISTS (
//             SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = $1
//         )`,
// 		[tableName]
// 	);
// 	const queryJournal_Paper = `
//     CREATE TABLE "${tableName}" (
//         "Download File" TEXT,
//         "id" SERIAL,
//         "Paper Title" TEXT,
//         "FileName" TEXT,
//         "Name of Journal" TEXT,
//         "JournalType" TEXT,
//         "Impact Factor (Clarivate Analytics)" NUMERIC,
//         "Impact Factor (Journal)" NUMERIC,
//         "Year of Publication" INTEGER,
//         "Month of Publication" TEXT,
//         "IndexIn" TEXT,
//         "ISSN No" TEXT,
//         "Voume No" TEXT,
//         "Issue No" TEXT,
//         "Page No" TEXT,
//         "Author1" TEXT,
//         "Author2" TEXT,
//         "Author3" TEXT,
//         "Author4" TEXT,
//         "Author5" TEXT,
//         "Author6" TEXT,
//         "Author7" TEXT,
//         "Author8" TEXT,
//         "Author9" TEXT,
//         "Author10" TEXT,
//         "WebsiteJournalLink" TEXT,
//         "ArticleLink" TEXT,
//         "Institute Name" TEXT,
//         "Department Name" TEXT
//     )
// `;
// 	const queryConference_Paper = `
//     CREATE TABLE "${tableName}" (
//         "id" SERIAL ,
//         "Name of Conference" TEXT,
//         "Conference Type" TEXT,
//         "Paper Title" TEXT,
//         "From Date" DATE,
//         "To Date" DATE,
//         "Author1" TEXT,
//         "Author2" TEXT,
//         "Author3" TEXT,
//         "Author4" TEXT,
//         "Author5" TEXT,
//         "Author6" TEXT,
//         "Author7" TEXT,
//         "Author8" TEXT,
//         "Author9" TEXT,
//         "Author10" TEXT,
//         "InstName" TEXT,
//         "DeptCode" TEXT
//     )
// `;

// 	let createTableQuery = "";
// 	if (tableName.toLowerCase().includes("journal")) {
// 		createTableQuery = queryJournal_Paper;
// 	} else if (tableName.toLowerCase().includes("conference")) {
// 		createTableQuery = queryConference_Paper;
// 	}

// 	if (!result.rows[0].exists) {
// 		await client.query(createTableQuery);
// 	}
// };

// export { ensureDatabaseExists, ensureTableExists, switchPoolToDb, pool };

// DATABASE_URL=


// DATABASE_URL_UNPOOLED=

// PGHOST=
// PGHOST_UNPOOLED=
// PGUSER=
// PGDATABASE=
// PGPASSWORD=
// POSTGRES_URL=
// POSTGRES_URL_NON_POOLING=
// POSTGRES_USER=
// POSTGRES_HOST=
// POSTGRES_PASSWORD=
// POSTGRES_DATABASE=
// POSTGRES_URL_NO_SSL=
// POSTGRES_PRISMA_URL=






import { Client } from "@vercel/postgres"; // Use Vercel's PostgreSQL client
import dotenv from "dotenv";

dotenv.config();

// Ensure that the database exists
const ensureDatabaseExists = async (dbName) => {
    const client = new Client();
    try {
        await client.connect();
        const result = await client.query(
            `SELECT EXISTS(SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower($1));`,
            [dbName]
        );
        const databaseExists = result.rows[0].exists;

        console.log(`Database ${dbName} exists: ${databaseExists}`);
        if (!databaseExists) {
            // Create the database
            await client.query(`CREATE DATABASE "${dbName}";`);
        }
    } catch (error) {
        console.error("Error ensuring database exists:", error);
    } finally {
        await client.end();
    }
};

// Ensure that the table exists in the specified database
const ensureTableExists = async (dbName, tableName) => {
    const client = new Client({ database: dbName });
    try {
        await client.connect();

        const result = await client.query(
            `SELECT EXISTS (
                SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = $1
            )`,
            [tableName]
        );

        const queryJournal_Paper = `
            CREATE TABLE "${tableName}" (
                "Download File" TEXT,
                "id" SERIAL,
                "Paper Title" TEXT,
                "FileName" TEXT,
                "Name of Journal" TEXT,
                "JournalType" TEXT,
                "Impact Factor (Clarivate Analytics)" NUMERIC,
                "Impact Factor (Journal)" NUMERIC,
                "Year of Publication" INTEGER,
                "Month of Publication" TEXT,
                "IndexIn" TEXT,
                "ISSN No" TEXT,
                "Voume No" TEXT,
                "Issue No" TEXT,
                "Page No" TEXT,
                "Author1" TEXT,
                "Author2" TEXT,
                "Author3" TEXT,
                "Author4" TEXT,
                "Author5" TEXT,
                "Author6" TEXT,
                "Author7" TEXT,
                "Author8" TEXT,
                "Author9" TEXT,
                "Author10" TEXT,
                "WebsiteJournalLink" TEXT,
                "ArticleLink" TEXT,
                "Institute Name" TEXT,
                "Department Name" TEXT
            );
        `;
        const queryConference_Paper = `
            CREATE TABLE "${tableName}" (
                "id" SERIAL,
                "Name of Conference" TEXT,
                "Conference Type" TEXT,
                "Paper Title" TEXT,
                "From Date" DATE,
                "To Date" DATE,
                "Author1" TEXT,
                "Author2" TEXT,
                "Author3" TEXT,
                "Author4" TEXT,
                "Author5" TEXT,
                "Author6" TEXT,
                "Author7" TEXT,
                "Author8" TEXT,
                "Author9" TEXT,
                "Author10" TEXT,
                "InstName" TEXT,
                "DeptCode" TEXT
            );
        `;

        let createTableQuery = "";
        if (tableName.toLowerCase().includes("journal")) {
            createTableQuery = queryJournal_Paper;
        } else if (tableName.toLowerCase().includes("conference")) {
            createTableQuery = queryConference_Paper;
        }

        if (!result.rows[0].exists) {
            await client.query(createTableQuery);
            console.log(`Table "${tableName}" created successfully.`);
        } else {
            console.log(`Table "${tableName}" already exists.`);
        }
    } catch (error) {
        console.error("Error ensuring table exists:", error);
    } finally {
        await client.end();
    }
};

export { ensureDatabaseExists, ensureTableExists };
// DATABASE_URL=your_vercel_database_url
// DATABASE_URL_UNPOOLED=your_vercel_unpooled_database_url
// PGHOST=your_database_host
// PGUSER=your_database_user
// PGPASSWORD=your_database_password
// PGDATABASE=your_default_database
