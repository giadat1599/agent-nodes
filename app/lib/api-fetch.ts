import { ofetch } from "ofetch"

const apiFetch = ofetch.create({
	baseURL: "http://localhost:3000/api",
	credentials: "include",
})

export default apiFetch
