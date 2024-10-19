import multer from "multer";
import path from "path";
import pool from "../db/database.mjs";
import ExcelJS from "exceljs";
import fs from "fs";
import XLSX from "xlsx";
// const Papa = require("papaparse");


import { fileURLToPath } from 'url';

const handleFileUpload = async (dataRows) => {
    try {
      console.log(dataRows[0]);
      console.log("sss");
      // const dataRows = rows.slice(1);  // This will exclude the first row

      for (const row of dataRows) {
        await mergeRowIntoDatabase(row);
      }
      return { message: 'Data successfully merged into the database' };
    } catch (error) {
      console.error("Error processing file data:", error);
      throw new Error('Error processing the uploaded data');
    }
  };

 
  const mergeRowIntoDatabase = async (row) => {
   
    const [
      downloadFile, id, paperTitle, fileName, journalName, journalType,
      clarivateImpactFactor, journalImpactFactor, yearOfPublication, monthOfPublication,
      indexIn, issnNo, volumeNo, issueNo, pageNo, author1, author2, author3, author4,
      author5, author6, author7, author8, author9, author10, websiteJournalLink, 
      articleLink, instituteName, departmentName
    ] = row;

      console.log("id");
     console.log(id);
  
    try {
      // Check if downloadFile is null or empty, and handle accordingly
      const downloadFileValue = downloadFile ? downloadFile : null;
  
      // Insert new record into the table
      await pool.query(
        `INSERT INTO "Conference_Paper" (
           "id", "Impact Factor (Clarivate Analytics)", "Impact Factor (Journal)", 
           "Year of Publication", "JournalType", "Month of Publication", "IndexIn", 
           "ISSN No", "Voume No", "Issue No", "Page No", "Author1", "Author2", "Author3", 
           "Author4", "Author5", "Author6", "Author7", "Author8", "Author9", "Author10", 
           "WebsiteJournalLink", "ArticleLink", "Institute Name", "Download File", 
           "Department Name", "Paper Title", "FileName", "Name of Journal"
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, 
           $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29)`,
        [
          id, clarivateImpactFactor, journalImpactFactor, yearOfPublication, journalType,
          monthOfPublication, indexIn, issnNo, volumeNo, issueNo, pageNo, author1,
          author2, author3, author4, author5, author6, author7, author8, author9,
          author10, websiteJournalLink, articleLink, instituteName, downloadFileValue,
          departmentName, paperTitle, fileName, journalName
        ]
      );
    } catch (error) {
      console.error("Error merging data:", error);
      throw new Error("Error while merging data");
    }
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

const uploadConferenceData = async(req, res) => {

    console.log("shyam");
   //  console.log(req.file);

   if (!req.file) {
     return res.status(400).json({ message: 'No file uploaded' });
   }

   console.log("Uploaded file details:", req.file);
 
   try {
    
     const __filename = fileURLToPath(import.meta.url);
     const __dirname = path.dirname(__filename);
         
        console.log("__filename",__filename);
        console.log("__dirname",__dirname);
    //  const filePath = path.join(__dirname, req.file.path);
    const filePath = path.join(__dirname, '..', 'uploads', 'Conference_Papers', req.file.filename);
    // const filePath = path.join(__dirname, '..', '..', 'uploads', 'Conference_Papers', req.file.filename);

     console.log("file path",filePath);
 
     // Read the Excel file
     const workbook = XLSX.readFile(filePath);
     const firstSheetName = workbook.SheetNames[0];
     const worksheet = workbook.Sheets[firstSheetName];
 
     // Parse the Excel data into JSON
     const importedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
 
     console.log('Parsed Data:', importedData);
 
     if (!importedData || !importedData.length) {
       return res.status(400).json({ message: 'No data received from the file' });
     }
 
     // Proceed with merging the data into the database
     const dataRows = importedData.slice(1);
     // const result = await handleFileUpload(importedData);
     const result = await handleFileUpload(dataRows);
     res.status(200).json(result);
 
   } catch (error) {
     console.error("Error processing file:", error);
     res.status(500).json({ message: 'An error occurred while uploading data' });
   }
 };


export {exportData,uploadConferenceData};