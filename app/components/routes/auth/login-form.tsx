import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { LoadingSwap } from "~/components/ui/loading-swap"
import { PasswordInput } from "~/components/ui/password-input"
import { Separator } from "~/components/ui/separator"
import { authClient } from "~/lib/auth-client"
import { SocialAuthButtons } from "./social-auth-buttons"

const loginSchema = z.object({
	email: z.email("Invalid email address."),
	password: z.string().min(6, "Password must be at least 6 characters long."),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
	const navigate = useNavigate()
	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const isPending = form.formState.isSubmitting

	const handleSubmit = async (data: LoginFormData) => {
		await authClient.signIn.email(
			{
				...data,
				callbackURL: window.location.origin,
			},
			{
				onSuccess: () => {
					navigate("/")
				},
				onError: (error) => {
					toast.error(error.error.message || "Failed to sign in. Please try again.")
				},
			},
		)
	}

	return (
		<Card className="w-full max-w-md">
			<CardHeader className="text-center">
				<CardTitle>Welcome Back</CardTitle>
				<CardDescription>Please login to continue</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="a@example.com" type="email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<PasswordInput placeholder="********" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button className="w-full" disabled={isPending} type="submit">
								<LoadingSwap isLoading={isPending}>Login</LoadingSwap>
							</Button>
							<p className="text-sm text-center">
								Dont have an account?{" "}
								<Link to="/auth/signup" className="underline">
									Sign up
								</Link>
							</p>
						</div>
						<Separator className="my-4" />

						<SocialAuthButtons />
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
