const TableView = ({ data }) => (
	<div className="overflow-x-auto">
		<table className="min-w-full divide-y divide-gray-200">
			<thead className="bg-gray-50">
				<tr>
					{data.length > 0 &&
						Object.keys(data[0]).map((key) => (
							<th
								key={key}
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								{key}
							</th>
						))}
				</tr>
			</thead>
			<tbody className="bg-white divide-y divide-gray-200">
				{data.map((row, index) => (
					<tr key={index}>
						{Object.values(row).map((value, idx) => (
							<td
								key={idx}
								className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
							>
								{value}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

export default TableView;
