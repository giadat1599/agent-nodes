export function AppContainer({ children }: React.PropsWithChildren) {
	return <div className="flex-1 flex flex-col px-4 md:px-10 md:py-6">{children}</div>
}
