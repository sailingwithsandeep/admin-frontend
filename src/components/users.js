import React from "react";
import {
	List,
	Datagrid,
	TextField,
	DateField,
	EditButton,
	DeleteButton,
} from "react-admin";

const OrderList = (props) => {
	return (
		<List {...props}>
			<Datagrid>
				<TextField source='id' />
				<TextField source='age' />
				<TextField source='name' />
				<TextField source='email' />
				<TextField source='createdAt' />
				<TextField source='updatedAt' />
			</Datagrid>
		</List>
	);
};

export default OrderList;
