import axios from "axios";
import { BASE_URL, endpoints } from "./apiEndPoints.mjs";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || BASE_URL,
});

export const fetchConferences = ({
	startDate = "",
	endDate = "",
	authorName = "",
	impactFactorMinimum = "",
	impactFactorMaximum = "",
	filterOption = "",
}) => {
	console.log({
		startDate,
		endDate,
		authorName,
		impactFactorMinimum,
		impactFactorMaximum,
		filterOption,
	});
	console.log(
		`${endpoints.GET_CONFERENCES}?startDate=${startDate}&endDate=${endDate}&authorName=${authorName}&impactFactorMinimum=${impactFactorMinimum}&impactFactorMaximum=${impactFactorMaximum}&filterOption=${filterOption}`
	);

	return api.get(
		`${endpoints.GET_CONFERENCES}?startDate=${startDate}&endDate=${endDate}&authorName=${authorName}&impactFactorMinimum=${impactFactorMinimum}&impactFactorMaximum=${impactFactorMaximum}&filterOption=${filterOption}`
	);
};
export const fetchConferencesColumns = () => {
	console.log(`${endpoints.GET_CONFERENCES_COLUMNS}`);

	return api.get(`${endpoints.GET_CONFERENCES_COLUMNS}`);
};
export const exportConferences = (data) => {
	console.log(`${endpoints.EXPORT_CONFERENCES}`);
	return api.post(`${endpoints.EXPORT_CONFERENCES}`, data, {
		responseType: "blob", // Important for downloading files
	});
};
