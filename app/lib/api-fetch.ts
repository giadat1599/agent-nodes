import { ofetch } from "ofetch"
import type { Pagination } from "~/types/shared"

export type BaseResponse = {
	success: boolean
	errors?: string
}

export interface ApiResponse<T> extends BaseResponse {
	data?: T
}

export interface PaginatedResponse<T> extends BaseResponse {
	pagination: Pagination
	data?: T[]
}
const apiFetch = ofetch.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
	credentials: "include",
})

export default apiFetch
