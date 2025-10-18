import { EyeIcon, EyeOffIcon } from "lucide-react"
import { type ComponentProps, useState } from "react"
import { cn } from "~/lib/utils"
import { Button } from "./button"
import { Input } from "./input"

export function PasswordInput({ className, ...props }: Omit<ComponentProps<typeof Input>, "type">) {
	const [showPassword, setShowPassword] = useState(false)
	const Icon = showPassword ? EyeOffIcon : EyeIcon

	return (
		<div className="relative">
			<Input {...props} type={showPassword ? "text" : "password"} className={cn("pr-9", className)} />
			<Button
				variant="ghost"
				size="icon"
				type="button"
				className="absolute inset-y-1/2 right-1 size-7 -translate-y-1/2"
				onClick={() => setShowPassword((p) => !p)}
			>
				<Icon className="size-5" />
				<span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
			</Button>
		</div>
	)
}
