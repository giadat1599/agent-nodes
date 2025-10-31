import { Spinner } from "../ui/spinner"

interface AppLoadingProps {
	message?: string
}

export function AppLoading({ message }: AppLoadingProps) {
	return (
		<div className="flex-1 flex items-center justify-center flex-col gap-2">
			<p>{message || "Loading..."}</p>
			<Spinner className="size-8 text-muted-foreground" />
		</div>
	)
}
