import { useState } from "react"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { LoadingSwap } from "~/components/ui/loading-swap"
import { authClient } from "~/lib/auth-client"
import {
	SUPPORTED_OAUTH_PROVIDER_DETAILS,
	SUPPORTED_OAUTH_PROVIDERS,
	type SupportedOAuthProvider,
} from "~/lib/oauth-providers"

export function SocialAuthButtons() {
	const [isLoading, setIsLoading] = useState(false)

	const handleOauthSignIn = async (provider: SupportedOAuthProvider) => {
		setIsLoading(true)

		const res = await authClient.signIn.social({
			provider,
			callbackURL: window.location.origin,
		})

		if (res.error) {
			toast.error(res.error.message || "Failed to sign in. Please try again.")
		}

		setIsLoading(false)
	}
	return SUPPORTED_OAUTH_PROVIDERS.map((provider) => {
		const Icon = SUPPORTED_OAUTH_PROVIDER_DETAILS[provider].Icon
		return (
			<Button
				type="button"
				className="w-full"
				disabled={isLoading}
				variant="outline"
				key={provider}
				onClick={() => handleOauthSignIn(provider)}
			>
				<LoadingSwap isLoading={isLoading}>
					<div className="flex items-center gap-x-1">
						<Icon />
						{SUPPORTED_OAUTH_PROVIDER_DETAILS[provider].name}
					</div>
				</LoadingSwap>
			</Button>
		)
	})
}
