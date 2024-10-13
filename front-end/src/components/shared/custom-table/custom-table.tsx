import React from 'react'
import { Form, Table } from 'react-bootstrap'
import './custom-table.scss'
import editIcon from '@/assets/images/edit-icon.svg'

function CustomTable<dataRowType extends Record<string, unknown>>({
	tableHeaders,
	tableData,
	children,
	rowClickHandler,
	selectedDataRows,
	editClickHandler,
}: {
	tableHeaders?: string[]
	tableData?: dataRowType[]
	children?: React.ReactNode
	rowClickHandler?: (item: dataRowType) => void
	selectedDataRows?: dataRowType[]
	editClickHandler?: (item: dataRowType) => void
}) {
	return (
		<div className="custom-table">
			<div className="select-all-row">
				{/* <Form.Check
					type="checkbox"
					id="custom-table-select-all"
					label="Select All"
				/> */}
				<div className="total-count-container">
					Total: <span>{tableData?.length}</span>
				</div>
			</div>
			<Table responsive hover>
				{tableHeaders && (
					<thead>
						<tr>
							{tableHeaders.map((header, index) => (
								<th key={index}>{header}</th>
							))}
							{/* {Array.from({ length: 12 }).map((_, index) => (
						<th key={index}>Table heading</th>
					))} */}
						</tr>
					</thead>
				)}

				{/* use for data rows with custom buttons set */}
				{children ? (
					children
				) : (
					<tbody>
						{tableData &&
							tableData.length > 0 &&
							tableData.map((item, index) => {
								return (
									<tr
										key={index}
										onClick={
											// rowClickHandler ? () => rowClickHandler(item) : undefined
											undefined
										}
										style={rowClickHandler ? { cursor: 'pointer' } : {}}
										// className={rowClickHandler ? 'clickable-row' : ''}
										className={
											item.status === 'Inactive'
												? 'disabled-div'
												: 'enabled-div'
										}
									>
										{rowClickHandler && selectedDataRows && (
											<td key={index}>
												<Form.Check
													type="checkbox"
													id={`custom-table-select-${index}`}
													checked={selectedDataRows.some(
														(selectedUser: dataRowType) =>
															selectedUser.id === item.id
													)}
													onChange={
														rowClickHandler
															? () => rowClickHandler(item)
															: undefined
													}
												/>
											</td>
										)}
										{Object.entries(item).map(([key, value]) => {
											if (key === 'status' && value === 'Active') {
												return (
													<td key={key}>
														<span className="badge text-bg-success">
															{value as string}
														</span>
													</td>
												)
											} else if (key === 'status' && value === 'Inactive') {
												return (
													<td key={key}>
														<span className="badge text-bg-danger">
															{value as string}
														</span>
													</td>
												)
											} else if (key !== 'id') {
												return <td key={key}>{value as string}</td>
											} else {
												return (
													<td key={key} hidden>
														{value as string}
													</td>
												)
											}
										})}

										{editClickHandler && (
											<td
												key={`edit-${index}`}
												className={
													item.status === 'Inactive' ? 'enabled-div' : ''
												}
											>
												<div
													onClick={
														editClickHandler
															? () => editClickHandler(item)
															: undefined
													}
												>
													<img src={editIcon} width="20px" />
												</div>
											</td>
										)}
									</tr>
								)
							})}

						{tableData?.length === 0 && <tr>No Data Found</tr>}
					</tbody>
				)}
			</Table>
		</div>
	)
}

export default CustomTable
