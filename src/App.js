import React from "react";
import { Admin, Resource, fetchUtils, EditGuesser } from "react-admin";

import restProvider from "ra-data-simple-rest";
import { authProvider } from "./authProvider";
import Users from "./components/users";
import OrderList from "./components/OrderList";

export const SERVER_URL = "http://localhost:3000";

function App() {
	// httpclient for sending creds to server
	const httpClient = (url, options = {}) => {
		if (!options.headers) {
			options.headers = new Headers({ Accept: "application/json" });
		}
		// Auth Key
		// options.headers.set('auth-key', 'mD-FB&ThQ,26E-}./`YS3F+=Xp>)x)2m/\'pFXhtxG}u8}G?Bb7.v/9XwT*,TM^LePKkK6fbmvJkXgR+%{V[~hwBX?BK7N9*aKD3');
		options.headers.set("Content-Type", "application/json");

		// JWT Token
		const token = localStorage.getItem("token");
		if (token) options.headers.set("Authorization", `Bearer ${token}`);

		return fetchUtils.fetchJson(url, options);
	};
	return (
		<Admin
			dataProvider={restProvider(SERVER_URL, httpClient)}
			authProvider={authProvider}
		>
			<Resource name='users' />
			<Resource name='orders' list={OrderList} />
		</Admin>
	);
}

export default App;
