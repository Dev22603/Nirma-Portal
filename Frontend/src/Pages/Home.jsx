// import React, { useEffect, useRef, useState } from "react";
// import Navbar from "../Components/Navbar";
// import LeftDrawer from "../Components/LeftDrawer";
// import TableView from "../Components/TableView";
// import { fetchConferences, fetchConferencesWithFilters } from "../api.js"; // Import functions for all data types

// function Home() {
// 	const [menu, setMenu] = useState(false);
// 	const [filter, setFilter] = useState(true);
// 	const [currentPage, setCurrentPage] = useState(null);
// 	const [data, setData] = useState([]);

// 	//
// 	//
// 	//
// 	//

// 	const [startMonth, setStartMonth] = useState("");
// 	const [startYear, setStartYear] = useState("");
// 	const [endMonth, setEndMonth] = useState("");
// 	const [endYear, setEndYear] = useState("");
// 	const [authorName, setAuthorName] = useState("");
// 	const [impactFactor, setImpactFactor] = useState(0);
// 	const handleSubmit = async (e) => {
// 		e.preventDefault();

// 		// Call the API with the user-provided filters
// 		const response = await fetchConferencesWithFilters(
// 			startMonth,
// 			startYear,
// 			endMonth,
// 			endYear
// 		);
// 		console.log(response.data);
// 		setData(response.data); // Update the data to display the filtered results
// 	};

// 	const handleFilter = async () => {
// 		console.log("Hii");
// 		console.log(startMonth, startYear, endMonth, endYear);
// 		const response = await fetchConferencesWithFilters(
// 			startMonth,
// 			startYear,
// 			endMonth,
// 			endYear
// 		);
// 		setData(response.data);
// 	};
// 	//
// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const response = await fetchConferences(); // Assuming fetchCounts now returns counts for all four types
// 				console.log(response.data);
// 				setData(response.data);
// 			} catch (error) {
// 				console.log(error);
// 			}
// 		};
// 		fetchData();
// 	}, []);
// 	const setPage = (page) => {
// 		setCurrentPage(page);
// 	};

// 	const toggleMenu = () => {
// 		setMenu(!menu);
// 	};

// 	const multiIconsRef = useRef(null);
// 	const navbarRef = useRef(null);

// 	useEffect(() => {
// 		const handleClickOutside = (event) => {
// 			if (
// 				multiIconsRef.current &&
// 				!multiIconsRef.current.contains(event.target) &&
// 				navbarRef.current &&
// 				!navbarRef.current.contains(event.target)
// 			) {
// 				setMenu(false);
// 			}
// 		};
// 		document.addEventListener("mousedown", handleClickOutside);
// 		return () => {
// 			document.removeEventListener("mousedown", handleClickOutside);
// 		};
// 	}, [multiIconsRef, navbarRef]);

// 	return (
// 		<div className="h-full w-full ">
// 			<Navbar Menu={toggleMenu} ref={navbarRef}></Navbar>
// 			<div className="h-full w-full flex justify-around">
// 				{/* Left Aligned Drawer */}
// 				{menu && (
// 					<LeftDrawer
// 						ref={multiIconsRef}
// 						toggleCurrentPage={setPage}
// 						currentPageName={currentPage}
// 						className="bg-gray-50 mr-10"
// 					></LeftDrawer>
// 				)}
// 				<div className="flex flex-col">
// 					<div className="border mt-10 p-4">
// 						<form onSubmit={handleSubmit}>
// 							<div className="flex flex-wrap space-x-4 justify-center container mx-auto">
// 								{/* Start Month */}
// 								<div>
// 									<label
// 										htmlFor="startMonth"
// 										className="mr-1 font-semibold text-lg"
// 									>
// 										Start Month:
// 									</label>
// 									<select
// 										id="startMonth"
// 										value={startMonth}
// 										onChange={(e) =>
// 											setStartMonth(e.target.value)
// 										}
// 										className="border p-2 rounded-sm"
// 									>
// 										<option value="">Select Month</option>
// 										<option value="1">January</option>
// 										<option value="2">February</option>
// 										<option value="3">March</option>
// 										<option value="4">April</option>
// 										<option value="5">May</option>
// 										<option value="6">June</option>
// 										<option value="7">July</option>
// 										<option value="8">August</option>
// 										<option value="9">September</option>
// 										<option value="10">October</option>
// 										<option value="11">November</option>
// 										<option value="12">December</option>
// 									</select>
// 								</div>

// 								{/* Start Year */}
// 								<div>
// 									<label htmlFor="startYear" className="mr-1">
// 										Start Year:
// 									</label>
// 									<input
// 										type="month"
// 										id="startYear"
// 										placeholder="Start Year"
// 										value={startYear}
// 										onChange={(e) =>
// 											setStartYear(e.target.value)
// 										}
// 										className="border p-2 rounded-sm"
// 										min="1900" // or any valid range for your use case
// 										max="2100"
// 									/>
// 								</div>

// 								{/* End Month */}
// 								<div>
// 									<label htmlFor="endMonth" className="mr-1">
// 										End Month:
// 									</label>
// 									<select
// 										id="endMonth"
// 										value={endMonth}
// 										onChange={(e) =>
// 											setEndMonth(e.target.value)
// 										}
// 										className="border p-2 rounded-sm"
// 									>
// 										<option value="">Select Month</option>
// 										<option value="1">January</option>
// 										<option value="2">February</option>
// 										<option value="3">March</option>
// 										<option value="4">April</option>
// 										<option value="5">May</option>
// 										<option value="6">June</option>
// 										<option value="7">July</option>
// 										<option value="8">August</option>
// 										<option value="9">September</option>
// 										<option value="10">October</option>
// 										<option value="11">November</option>
// 										<option value="12">December</option>
// 									</select>
// 								</div>

// 								{/* End Year */}
// 								<div>
// 									<label htmlFor="endYear" className="mr-1">
// 										End Year:
// 									</label>
// 									<input
// 										type="number"
// 										id="endYear"
// 										placeholder="End Year"
// 										value={endYear}
// 										onChange={(e) =>
// 											setEndYear(e.target.value)
// 										}
// 										className="border p-2 rounded-sm"
// 										min="1900" // or any valid range for your use case
// 										max="2100"
// 									/>
// 								</div>

// 								{/* Author Name */}
// 								<div>
// 									<label
// 										htmlFor="authorName"
// 										className="mr-1"
// 									>
// 										Author Name:
// 									</label>
// 									<input
// 										type="text"
// 										id="authorName"
// 										placeholder="Author Name"
// 										value={authorName}
// 										onChange={(e) =>
// 											setAuthorName(e.target.value)
// 										}
// 										className="border p-2 rounded-sm"
// 									/>
// 								</div>

// 								{/* Impact Factor */}
// 								<div>
// 									<label
// 										htmlFor="impactFactor"
// 										className="mr-1"
// 									>
// 										Impact Factor:
// 									</label>
// 									<input
// 										type="range"
// 										id="impactFactor"
// 										min="0"
// 										max="10"
// 										step="0.1"
// 										value={impactFactor}
// 										onChange={(e) =>
// 											setImpactFactor(e.target.value)
// 										}
// 										className="border p-2 rounded-sm"
// 									/>
// 									<span>{impactFactor}</span>
// 								</div>

// 								<button
// 									type="submit"
// 									onClick={handleFilter}
// 									className="bg-blue-500 text-white p-2"
// 								>
// 									Submit
// 								</button>
// 							</div>
// 						</form>
// 					</div>
// 					<div className="container mx-auto p-4 my-10 border ">
// 						<TableView data={data} />
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default Home;

import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import LeftDrawer from "../Components/LeftDrawer";
import TableView from "../Components/TableView";
import { fetchConferences } from "../services/api.mjs"; // Import functions for all data types

function Home() {
	const [menu, setMenu] = useState(false);
	const [filter, setFilter] = useState(true);
	const [currentPage, setCurrentPage] = useState(null);
	const [data, setData] = useState([]);

	// State for filter form inputs
	const [startDate, setStartDate] = useState(""); // e.g., "2024-08"
	const [endDate, setEndDate] = useState(""); // e.g., "2024-12"
	const [authorName, setAuthorName] = useState("");
	const [impactFactor, setImpactFactor] = useState(0);

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		// Call API with all filters, including author name and impact factor
		const response = await fetchConferences({
			startDate,
			endDate,
			authorName,
			impactFactor,
		});

		// Update data with filtered results
		setData(response.data);
		console.log("Filtered data:", response.data);
	};

	const handleFilter = async () => {
		console.log("Applying Filters");
		console.log("Start Date:", startDate, "End Date:", endDate);
		const response = await fetchConferences({
			startDate,
			endDate,
			authorName,
			impactFactor,
		});

		setData(response.data);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchConferences();
				console.log(response.data);
				setData(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const setPage = (page) => {
		setCurrentPage(page);
	};

	const toggleMenu = () => {
		setMenu(!menu);
	};

	const multiIconsRef = useRef(null);
	const navbarRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				multiIconsRef.current &&
				!multiIconsRef.current.contains(event.target) &&
				navbarRef.current &&
				!navbarRef.current.contains(event.target)
			) {
				setMenu(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [multiIconsRef, navbarRef]);

	return (
		<div className="h-full w-full">
			<Navbar Menu={toggleMenu} ref={navbarRef}></Navbar>
			<div className="h-full w-full flex justify-around relative">
				{/* Left Aligned Drawer */}
				{menu && (
					<LeftDrawer
						ref={multiIconsRef}
						toggleCurrentPage={setPage}
						currentPageName={currentPage}
						className="bg-gray-50 mr-10 left-0 absolute"
					></LeftDrawer>
				)}
				<div className="w-[400px] h-[500px]">Home Page	</div>
			</div>
		</div>
	);
}

export default Home;
