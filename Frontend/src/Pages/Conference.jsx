import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Papa from "papaparse";
import LeftDrawer from "../Components/LeftDrawer";
import {
	exportConferences,
	fetchConferences,
	fetchConferencesColumns,
} from "../services/api.mjs";
import TableView from "../Components/TableView";
import FilterInput from "../Components/FilterInput";
import ColumnSelector from "../Components/ColumnSelector";

function Conference() {
	const [menu, setMenu] = useState(false);
	const [displayTable, setDisplayTable] = useState(false);
	const [currentPage, setCurrentPage] = useState(null);
	const [data, setData] = useState([]);

	const toggleDisplayTable = () => {
		setDisplayTable(!displayTable);
	};

	const [filters, setFilters] = useState({
		startDate: "",
		endDate: "",
		authorName: "",
		impactFactorMinimum: 0,
		impactFactorMaximum: 10,
		filterOption: "", // Stores the selected radio option
	});

	const handleFilter = (newFilter) => {
		setFilters(newFilter);
		console.log(newFilter, "handleSubmit");
	};
	const [columns, setColumns] = useState([]);
	const [selectedColumns, setSelectedColumns] = useState([]);
	useEffect(() => {
		const fetchColumns = async () => {
			try {
				const response = await fetchConferencesColumns();
				setColumns(response.data);
				setSelectedColumns(response.data);
				console.log(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchColumns();
	}, []);

	const handleColumnChange = (newColumns) => {
		setSelectedColumns(newColumns);
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchConferences(filters);
				console.log("api call");
				console.log(response.data);
				setData(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [filters]);

	const setPage = (page) => {
		setCurrentPage(page);
	};

	const toggleMenu = () => {
		setMenu(!menu);
	};

	const multiIconsRef = useRef(null);
	const navbarRef = useRef(null);
	const buttonRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				multiIconsRef.current &&
				!multiIconsRef.current.contains(event.target) &&
				navbarRef.current &&
				!navbarRef.current.contains(event.target) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target)
			) {
				setMenu(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [multiIconsRef, navbarRef, buttonRef]);

	const exportHandler = async () => {
		const exportData = {
			filters: filters,
			columns: selectedColumns,
		};
		console.log(exportData);
		const res = await exportConferences(exportData);
		const url = window.URL.createObjectURL(new Blob([res.data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "table_view.xlsx"); // File name
		document.body.appendChild(link);
		link.click();
		link.remove(); // Clean up the link after the download
	};

	// const importHandler = () => {
	// 	// Add your import file functionality here
	// 	console.log("Import button clicked");
	// };
	const importHandler = (event) => {
		const file = event.target.files[0];  // Get the selected file
		if (!file) return;
	
		// Use PapaParse to parse the file
		Papa.parse(file, {
			complete: (result) => {
				const importedData = result.data;
				console.log("Imported Data:", importedData);
				// You can process the imported data here or pass it to the state
			},
			header: true,  // If your CSV has headers
		});
	};
	

	return (
		<div className="h-screen w-full flex flex-col">
			{/* Navbar */}
			<Navbar
				Menu={toggleMenu}
				ref={navbarRef}
				className="fixed top-0 left-0 w-full z-50 shadow-md bg-white"
			/>

			{/* Content Wrapper */}
			<div className="flex h-full ">
				{/* Left Drawer */}
				{menu && (
					<div className="fixed h-full bg-gray-50 shadow-md w-64">
						<LeftDrawer
							ref={multiIconsRef}
							toggleCurrentPage={setPage}
							currentPageName={currentPage}
						/>
					</div>
				)}

				{/* Main Content */}
				<div
					className={`flex-grow overflow-y-auto p-6 mx-auto w-full transition-all duration-500 ${
						menu ? "ml-64" : ""
					}`}
				>
					{/* Filter Section */}

					<div className="flex space-x-2">
						<div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
							<h2 className="text-xl font-semibold mb-4 text-gray-700">
								Filter Conferences
							</h2>
							<FilterInput onFilterChange={handleFilter} />
							{/* <FilterInput onFilterChange={handleFilter} onColumnChangeConf={handleColumnChange}/> */}
						</div>
						<ColumnSelector
							columns={columns}
							onColumnChange={handleColumnChange}
						/>
					</div>

					{/* Display Button */}
					<button
						onClick={toggleDisplayTable}
						className="bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-700 py-2 px-4 rounded-md shadow-md transition-colors duration-300"
						ref={buttonRef}
					>
						{displayTable ? "Hide Records" : "Display Records"}
					</button>

					{/* Export and Import Buttons */}
					<div className="flex space-x-4 mt-4">
						<button
							onClick={exportHandler}
							className="bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded-md shadow-md transition-colors duration-300"
							ref={buttonRef}
						>
							Export Table
						</button>
						
						{/* New Import Button */}
						<button
		                onClick={() => document.getElementById("importFileInput").click()}  // Trigger file input on button click
		                className="bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded-md shadow-md transition-colors duration-300"
	                    >
	                 	Import File
                     	</button>
                     	<input
	                 	id="importFileInput"
		                type="file"
						accept=".xlsx"
						onChange={importHandler}
						style={{ display: "none" }}  // Hide the file input field
						/>
					</div>

					{/* Table Section */}
					{displayTable && (
						<div className="bg-white shadow-lg rounded-lg p-6 my-10 border border-gray-200">
							{/* Record count */}
							{data.length > 0 && (
								<p className="text-gray-700 font-semibold mb-4">
									{`Total Records: ${data.length}`}
								</p>
							)}
							{data.length > 0 ? (
								<TableView
									data={data}
									selectedColumns={selectedColumns}
								/>
							) : (
								<p className="text-gray-500">
									No records found. Try adjusting the filters.
								</p>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Conference;
