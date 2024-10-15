import multer from "multer";
import path from "path";
import pool from "../db/database.mjs";
import ExcelJS from "exceljs";
import fs from "fs";
import XLSX from "xlsx";
// const Papa = require("papaparse");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/Conference Papers"); // Destination folder for file uploads
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Rename file with timestamp
    },
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /xls|xlsx/;
    const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype =
        file.mimetype === "application/vnd.ms-excel" ||
        file.mimetype ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"; // Include MIME type for .xlsx

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error("Only .xls or .xlsx files are allowed!"), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
    fileFilter: fileFilter,
}).single("file");

// Extend your uploadFile function
const uploadFile = (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ message: `Multer error: ${err.message}` });
        } else if (err) {
            return res.status(400).json({ message: `Error: ${err.message}` });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Proceed with XLSX parsing and inserting into the database
        const filePath = req.file.path;
        
        try {
            const workbook = XLSX.readFile(filePath); // Read the .xlsx file
            const sheetName = workbook.SheetNames[0]; // Get the first sheet
            const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert sheet to JSON

            // Insert data into the database
            for (const row of sheetData) {
                const query = `
                    INSERT INTO Conference_Paper (
                        "Impact Factor (Clarivate Analytics)",
                        "Impact Factor (Journal)",
                        "Year of Publication",
                        "JournalType",
                        "Month of Publication",
                        "IndexIn",
                        "ISSN No",
                        "Voume No",
                        "Issue No",
                        "Page No",
                        "Author1",
                        "Author2",
                        "Author3",
                        "Author4",
                        "Author5",
                        "Author6",
                        "Author7",
                        "Author8",
                        "Author9",
                        "Author10",
                        "WebsiteJournalLink",
                        "ArticleLink",
                        "Institute Name",
                        "Download File",
                        "Department Name",
                        "Paper Title",
                        "FileName",
                        "Name of Journal"
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28)
                `;
                
                await pool.query(query, [
                    row['Impact Factor (Clarivate Analytics)'],
                    row['Impact Factor (Journal)'],
                    row['Year of Publication'],
                    row['JournalType'],
                    row['Month of Publication'],
                    row['IndexIn'],
                    row['ISSN No'],
                    row['Voume No'],
                    row['Issue No'],
                    row['Page No'],
                    row['Author1'],
                    row['Author2'],
                    row['Author3'],
                    row['Author4'],
                    row['Author5'],
                    row['Author6'],
                    row['Author7'],
                    row['Author8'],
                    row['Author9'],
                    row['Author10'],
                    row['WebsiteJournalLink'],
                    row['ArticleLink'],
                    row['Institute Name'],
                    row['Download File'],
                    row['Department Name'],
                    row['Paper Title'],
                    row['FileName'],
                    row['Name of Journal']
                ]);
            }

            // Clean up uploaded file
            fs.unlinkSync(filePath);

            res.status(200).json({ message: "File uploaded and data inserted successfully" });
        } catch (dbError) {
            console.error(dbError);
            return res.status(500).json({ message: "Error inserting data into the database" });
        }
    });
};

const exportData = async (req, res) => {
    const { filters, columns } = req.body;
    console.log(filters);
    console.log(columns);
    const {
        startDate,
        endDate,
        authorName,
        impactFactorMinimum,
        impactFactorMaximum,
        filterOption,
    } = filters;
    let selectedColumns = "";
    for (let i in columns) {
        if (i == columns.length - 1) {
            selectedColumns += `\"${columns[i]}\" `;
        } else {
            selectedColumns += `\"${columns[i]}\", `;
        }
    }
    console.log(selectedColumns);
    console.log(filters);

    try {
        const impactFactorMin = impactFactorMinimum;
        const impactFactorMax = impactFactorMaximum;
        let query = `SELECT DISTINCT ON (LOWER("Paper Title")) ${selectedColumns} FROM public."Conference_Paper" WHERE 1=1`;
        const queryParams = [];
        const AuthorName = authorName.toUpperCase();

        if (startDate && endDate) {
            query += `
            AND TO_DATE("Year of Publication" || '-' || "Month of Publication", 'YYYY-Month') 
            BETWEEN TO_DATE($${queryParams.length + 1}, 'YYYY-MM') AND TO_DATE($${
                queryParams.length + 2
            }, 'YYYY-MM')`;

            queryParams.push(startDate);
            queryParams.push(endDate);
        }
        console.log(filters);

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
            console.log(impactFactorMax, impactFactorMin);

            query += ` AND "Impact Factor (Clarivate Analytics)" BETWEEN $${
                queryParams.length + 1
            } AND $${queryParams.length + 2}`;

            queryParams.push(impactFactorMin, impactFactorMax);
        }
        console.log(queryParams);

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

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Conference Paper Data");
        worksheet.columns = columns.map((col) => ({ header: col, key: col }));
        const data = result.rows;
        const convertToNumberIfNumeric = (value) => {
            
            if (!isNaN(value) && typeof value === "string") {
                return value.includes(".")
                    ? parseFloat(value)
                    : parseInt(value);
            }
            return value; // Return the original value if not numeric
        };
        const filteredData = data.map((row) => {
            const filteredRow = {};
            columns.forEach((col) => {
                // Convert numeric strings to numbers
                if (col == "Download File") filteredRow[col] = row[col];
                else {
                    filteredRow[col] = convertToNumberIfNumeric(row[col]);
                }
            });
            return filteredRow;
        });
        console.log(query);
        console.log(queryParams);

        filteredData.forEach((row) => {
            worksheet.addRow(row);
        });
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=conference_paper.xlsx"
        );
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "An error occurred while fetching data",
        });
    }
};
export { uploadFile, exportData };