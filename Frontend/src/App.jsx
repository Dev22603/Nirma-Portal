import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { ToastContainer } from "react-toastify";
import Conference from "./Pages/Conference";

const categories = [
	{
		name: "Conference Papers",
		href: "/categories/Conference Papers",
		element: Conference,
	},
	{
		name: "Journal Papers",
		href: "/categories/Journal Papers",
		element: null,
	},
	{
		name: "Book Chapters",
		href: "/categories/Book Chapters",
		element: null,
	},
	{
		name: "Projects",
		href: "/categories/Projects",
		element: null, // Update with the appropriate component when available
	},
];

function App() {
	return (
		<div>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {categories.map((category) => (
                        <Route
                            key={category.href}
                            path={category.href}
                            element={category.element ? <category.element /> : <div>Coming Soon...</div>}
                        />
                    ))}
                </Routes>
            </BrowserRouter>
        </div>
	);
}

export default App;
