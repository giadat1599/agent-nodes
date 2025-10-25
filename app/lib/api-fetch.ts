import { ofetch } from "ofetch"

export type ApiResponse<T> = {
	success: boolean
	data: T | null
	errors?: string
}

const apiFetch = ofetch.create({
	baseURL: "http://localhost:3000/api",
	credentials: "include",
})

export default apiFetch
