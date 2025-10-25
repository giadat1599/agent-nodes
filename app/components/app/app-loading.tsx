import { Spinner } from "../ui/spinner"

interface AppLoadingProps {
	message?: string
}

export function AppLoading({ message }: AppLoadingProps) {
	return (
		<div className="flex items-center flex-col justify-center flex-1 gap-2">
			<p>{message || "Loading..."}</p>
			<Spinner className="size-8 text-muted-foreground" />
		</div>
	)
}
