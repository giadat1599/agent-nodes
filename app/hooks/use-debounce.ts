import { useEffect, useRef, useState } from "react"

export default function useDebounce<T>(value: T, delay = 300): T {
	const [debounced, setDebounced] = useState<T>(value)
	const timeoutRef = useRef<number | null>(null)

	useEffect(() => {
		if (timeoutRef.current !== null) {
			window.clearTimeout(timeoutRef.current)
		}

		timeoutRef.current = window.setTimeout(() => {
			setDebounced(value)
			timeoutRef.current = null
		}, delay)

		return () => {
			if (timeoutRef.current !== null) {
				window.clearTimeout(timeoutRef.current)
				timeoutRef.current = null
			}
		}
	}, [value, delay])

	return debounced
}
