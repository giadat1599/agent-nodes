import { FetchError } from "ofetch"

export function redirectOnUnauthorized(error: Error) {
	if (error instanceof FetchError && error.status === 401) {
		window.location.href = "/auth/login"
	}
}
