import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useSearchParams } from "react-router"
import { Button } from "~/components/ui/button"
import { SearchInput } from "~/components/ui/search-input"
import { useGetWorkflows } from "~/hooks/queries/workflows/use-get-workflows"
import { AppLoading } from "../../app-loading"
import { CreateWorkflowButton } from "./create-workflow-button"
import { EmptyWorkflows } from "./empty-workflows"
import { WorkflowList } from "./workflow-list"

export function WorkflowView() {
	const [, setSearchParams] = useSearchParams()
	const { data, isPending } = useGetWorkflows()
	const workflows = data?.data || []

	const handleNextPage = () => {
		if (data?.pagination.hasNextPage) {
			setSearchParams({ page: (data.pagination.currentPage + 1).toString() })
		}
	}

	const handlePreviousPage = () => {
		if (data?.pagination.hasPreviousPage) {
			if (data.pagination.currentPage - 1 === 1) {
				setSearchParams({})
				return
			}
			setSearchParams({ page: (data.pagination.currentPage - 1).toString() })
		}
	}

	return (
		<>
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-xl font-semibold">Workflows</h1>
					<p className="text-sm text-muted-foreground">Create and manage your workflows</p>
				</div>
				<CreateWorkflowButton />
			</div>
			<SearchInput className="my-4" placeholder="Search a workflow" />
			<div className="flex items-center justify-between mb-4">
				<span className="text-sm">
					Page {data?.pagination.currentPage} of {data?.pagination.totalPages}
				</span>
				<div className="flex items-center">
					<Button
						variant="ghost"
						onClick={handlePreviousPage}
						disabled={!data?.pagination.hasPreviousPage || isPending}
					>
						<ChevronLeftIcon />
						Previous
					</Button>
					<Button variant="ghost" onClick={handleNextPage} disabled={!data?.pagination.hasNextPage || isPending}>
						Next
						<ChevronRightIcon />
					</Button>
				</div>
			</div>
			{isPending && <AppLoading />}
			{!isPending && data?.pagination && workflows.length > 0 && <WorkflowList workflows={workflows} />}
			{!isPending && workflows.length === 0 && <EmptyWorkflows />}
		</>
	)
}
