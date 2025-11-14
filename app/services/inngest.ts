import type { Realtime } from "@inngest/realtime"
import apiFetch, { type ApiResponse } from "~/lib/api-fetch"

const RESOURCE = "/inngest"

export async function getHttpRequestRealTimeRefreshToken() {
	const response = await apiFetch<ApiResponse<{ token: Realtime.Subscribe.Token }>>(
		`${RESOURCE}/http-request/refresh-token`,
		{
			method: "GET",
		},
	)

	if (!response.success) return null
	return response.data?.token
}

export async function getManualTriggerRealTimeRefreshToken() {
	const response = await apiFetch<ApiResponse<{ token: Realtime.Subscribe.Token }>>(
		`${RESOURCE}/manual-trigger/refresh-token`,
		{
			method: "GET",
		},
	)

	if (!response.success) return null
	return response.data?.token
}
