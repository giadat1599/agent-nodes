import type { Route } from "./+types/credential-id"

export default function Page({ params }: Route.LoaderArgs) {
	return <div>Credential ID Page: {params.credentialId}</div>
}
