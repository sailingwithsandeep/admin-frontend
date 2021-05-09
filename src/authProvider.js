import {
	AUTH_LOGIN,
	AUTH_LOGOUT,
	AUTH_CHECK,
	AUTH_ERROR /*AUTH_GET_PERMISSIONS,*/,
} from "react-admin";
import { SERVER_URL } from "./App";

export const authProvider = (type, params) => {
	if (type === AUTH_LOGIN) {
		const { username, password } = params;
		const request = new Request(SERVER_URL + "/users/login", {
			method: "POST",
			body: JSON.stringify({ email: username, password: password }),
			headers: new Headers({
				"Content-Type": "application/json",
			}),
		});
		return fetch(request)
			.then((response) => {
				if (response.status < 200 || response.status >= 300) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then((res) => {
				console.log(res);
				localStorage.setItem("token", res.token);
				localStorage.setItem("user", JSON.stringify(res.user));
			});
	}

	if (type === AUTH_LOGOUT) {
		localStorage.removeItem("token");
		return Promise.resolve();
	}
	if (type === AUTH_ERROR) {
		const status = params.status;
		if (status === 401 || status === 403) {
			localStorage.removeItem("token");
			return Promise.reject();
		}
		return Promise.resolve();
	}
	if (type === AUTH_CHECK) {
		return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
	}
	/*if (type === AUTH_GET_PERMISSIONS) {
        const role = localStorage.getItem('permissions');
        return role ? Promise.resolve(role) : Promise.reject();
    }*/
	return Promise.resolve();
};
