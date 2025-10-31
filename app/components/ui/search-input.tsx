import { SearchIcon } from "lucide-react"
import { type ComponentProps, useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import useDebounce from "~/hooks/use-debounce"
import { cn } from "~/lib/utils"
import { Input } from "./input"

export function SearchInput(props: ComponentProps<typeof Input>) {
	const [searchParams, setSearchParams] = useSearchParams()
	const [search, setSearch] = useState<string>(searchParams.get("search") || "")
	const debouncedValue = useDebounce(search, 300)

	useEffect(() => {
		const currentSearch = searchParams.get("search") || ""
		// Only update URL if the debounced value is different from current URL param
		if (debouncedValue !== currentSearch) {
			if (debouncedValue) {
				searchParams.set("search", debouncedValue)
			} else {
				searchParams.delete("search")
			}
			setSearchParams(searchParams)
		}
	}, [debouncedValue, searchParams, setSearchParams])

	return (
		<div className="relative">
			<SearchIcon className="size-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
			<Input
				{...props}
				className={cn("pl-7", props.className)}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</div>
	)
}
