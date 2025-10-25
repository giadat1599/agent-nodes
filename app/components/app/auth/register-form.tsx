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

const registerFormSchema = z
	.object({
		name: z.string().min(1, "Name is required."),
		email: z.email("Invalid email address."),
		password: z.string().min(6, "Password must be at least 6 characters long."),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match.",
		path: ["confirmPassword"],
	})

type RegisterFormData = z.infer<typeof registerFormSchema>

export function RegisterForm() {
	const navigate = useNavigate()

	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	})

	const isPending = form.formState.isSubmitting

	const handleSubmit = async (data: RegisterFormData) => {
		await authClient.signUp.email(
			{
				name: data.name,
				email: data.email,
				password: data.password,
				callbackURL: window.location.origin,
			},
			{
				onSuccess: () => {
					navigate("/")
				},
				onError: (error) => {
					toast.error(error.error.message || "Failed to sign up. Please try again.")
				},
			},
		)
	}

	return (
		<Card className="w-full max-w-md">
			<CardHeader className="text-center">
				<CardTitle>Create an Account</CardTitle>
				<CardDescription>Create an account to get started</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="John Doe" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="john.doe@example.com" type="email" {...field} />
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
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<PasswordInput placeholder="********" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button className="w-full" disabled={isPending} type="submit">
								<LoadingSwap isLoading={isPending}>Register</LoadingSwap>
							</Button>
							<p className="text-sm text-center">
								Already have an account?{" "}
								<Link to="/auth/login" className="underline">
									Sign in
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
