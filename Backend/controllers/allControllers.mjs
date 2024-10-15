import pool from "../db/database.mjs";

const getFilteredData = async (req, res) => {
	try {
		const {
			startDate,
			endDate,
			authorName,
			impactFactorMaximum,
			impactFactorMinimum,
			filterOption,
		} = req.query;
		console.log({
			startDate,
			endDate,
			authorName,
			impactFactorMinimum,
			impactFactorMaximum,
			filterOption,
		});
		
		const impactFactorMin = impactFactorMinimum
			? parseFloat(impactFactorMinimum)
			: null;
		const impactFactorMax = impactFactorMaximum
			? parseFloat(impactFactorMaximum)
			: null;

		let query = `SELECT DISTINCT ON (LOWER("Paper Title")) * FROM public."Conference_Paper" WHERE 1=1`;
		const queryParams = [];
		
		const AuthorName=authorName.toUpperCase()

		if (startDate && endDate) {
			query += `
			AND TO_DATE("Year of Publication" || '-' || "Month of Publication", 'YYYY-Month') 
			BETWEEN TO_DATE($${queryParams.length + 1}, 'YYYY-MM') AND TO_DATE($${
				queryParams.length + 2
			}, 'YYYY-MM')`;

			queryParams.push(startDate);
			queryParams.push(endDate);
		}
console.log(AuthorName);

		if (AuthorName) {
			query += ` AND ("Author1" LIKE $${
				queryParams.length + 1
			} OR "Author2" LIKE $${queryParams.length + 1} 
                       OR "Author3" LIKE $${
							queryParams.length + 1
						} OR "Author4" LIKE $${queryParams.length + 1}
                       OR "Author5" LIKE $${
							queryParams.length + 1
						} OR "Author6" LIKE $${queryParams.length + 1}
                       OR "Author7" LIKE $${
							queryParams.length + 1
						} OR "Author8" LIKE $${queryParams.length + 1}
                       OR "Author9" LIKE $${
							queryParams.length + 1
						} OR "Author10" LIKE $${queryParams.length + 1})`;

			queryParams.push(`%${AuthorName}%`);
			// queryParams.push(authorName);
		}

		// Filter by impactFactor
		if (impactFactorMin != null && impactFactorMax != null) {
			query += ` AND "Impact Factor (Clarivate Analytics)" BETWEEN $${
				queryParams.length + 1
			} AND $${queryParams.length + 2}`;

			queryParams.push(impactFactorMin, impactFactorMax);
		}
		// if (impactFactorMin != null) {
		// 	query += ` AND "Impact Factor (Clarivate Analytics)" >= $${queryParams.length + 1}`;
		// 	queryParams.push(impactFactorMin);
		// }
		
		// if (impactFactorMax != null) {
		// 	query += ` AND "Impact Factor (Clarivate Analytics)" <= $${queryParams.length + 1}`;
		// 	queryParams.push(impactFactorMax);
		// }
		if (filterOption) {
			if (filterOption === "SCI") {
				query += ` AND ("IndexIn" LIKE '%Scopus%' AND "IndexIn" LIKE '%Web of Science%') 
                           AND "Impact Factor (Clarivate Analytics)" > 0`;
			} else if (filterOption === "Web of Science") {
				query += ` AND "IndexIn" LIKE $${queryParams.length + 1}`;

				queryParams.push("%Web of Science%");
			} else if (filterOption === "Other") {
				query += ` AND (("IndexIn" NOT LIKE '%Web of Science%' AND "IndexIn" NOT LIKE '%Scopus%') OR  "IndexIn" IS NULL )`;
			}
		}

		const result = await pool.query(query, queryParams);

		res.json(result.rows);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "An error occurred while fetching data",
		});
	}
};
const getColumns = async (req, res) => {
	try {
		// Query to fetch column names from PostgreSQL information schema
		const query = `
        SELECT * FROM public."Conference_Paper" LIMIT 1;
      `;

		const result = await pool.query(query);
		const columns = result.rows.map((row) => row.column_name);

		res.json(
			result.fields.map((column) => {
				return column.name;
			})
		);
	} catch (err) {
		console.error("Error fetching conference columns:", err);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export { getFilteredData, getColumns };
