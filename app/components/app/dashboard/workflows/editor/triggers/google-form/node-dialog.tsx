import { CopyIcon } from "lucide-react"
import { useParams } from "react-router"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

interface GoogleFormTriggerDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function GoogleFormTriggerDialog({ open, onOpenChange }: GoogleFormTriggerDialogProps) {
	const params = useParams()
	const workflowId = params.workflowId as string
	const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api"
	const webhookUrl = `${baseUrl}/webhooks/google-form?workflowId=${workflowId}`

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(webhookUrl)
			toast.success("Webhook URL copied to clipboard")
		} catch {
			toast.error("Failed to copy webhook URL")
		}
	}

	const generateGoogleFormScript = (webhookUrl: string) => `function onFormSubmit(e) {
			var formResponse = e.response;
			var itemResponses = formResponse.getItemResponses();

			// Build responses object
			var responses = {};
			for (var i = 0; i < itemResponses.length; i++) {
				var itemResponse = itemResponses[i];
				responses[itemResponse.getItem().getTitle()] = itemResponse.getResponse();
			}

			// Prepare webhook payload
			var payload = {
				formId: e.source.getId(),
				formTitle: e.source.getTitle(),
				responseId: formResponse.getId(),
				timestamp: formResponse.getTimestamp(),
				respondentEmail: formResponse.getRespondentEmail(),
				responses: responses
			};

			// Send to webhook
			var options = {
				'method': 'post',
				'contentType': 'application/json',
				'payload': JSON.stringify(payload)
			};

			var WEBHOOK_URL = '${webhookUrl}';

			try {
				UrlFetchApp.fetch(WEBHOOK_URL, options);
			} catch(error) {
				console.error('Webhook failed:', error);
			}
}`

	const copyGoogleFormScript = async (webhookUrl: string) => {
		const script = generateGoogleFormScript(webhookUrl)
		try {
			await navigator.clipboard.writeText(script)
			toast.success("Google Apps Script copied to clipboard")
		} catch {
			toast.error("Failed to copy Google Apps Script")
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Google Form Trigger Configuration</DialogTitle>
					<DialogDescription>
						Use this webhook URl in your Google Form's Apps Script to trigger this workflow when a form is submitted.
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="webhookUrl">Webhook URL</Label>
						<div className="flex gap-2">
							{/** biome-ignore lint/correctness/useUniqueElementIds: <use htmlFor> */}
							<Input id="webhookUrl" value={webhookUrl} readOnly className="font-mono text-sm" />
							<Button type="button" size="icon" variant="outline" onClick={copyToClipboard}>
								<CopyIcon className="size-4" />
							</Button>
						</div>
					</div>
					<div className="rounded-lg bg-muted p-4 space-y-2">
						<h4 className="font-medium text-sm">Setup instructions:</h4>
						<ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
							<li>Open your Google Form</li>
							<li>Click on the three dots → Script Editor</li>
							<li>Copy and paste the script below</li>
							<li>Replace WEBHOOK_URL with your webhook URL above</li>
							<li>Save and click "Trigger" → Add Trigger</li>
							<li>Choose: From from → On form submit → Save</li>
						</ol>
					</div>
					<div className="rounded-lg bg-muted p-4 space-y-3">
						<h4 className="font-medium text-sm">Google Apps Script</h4>
						<Button type="button" variant="outline" onClick={() => copyGoogleFormScript(webhookUrl)}>
							<CopyIcon className="size-4 mr-2" />
							Copy Google Apps Script
						</Button>
						<p className="text-xs text-muted-foreground">
							This script includes your webhook URl and handles form submission.
						</p>
					</div>
					<div className="rounded-lg bg-muted p-4 space-y-2">
						<h4 className="font-medium text-sm">Available Variables</h4>
						<ol className="text-sm text-muted-foreground space-y-1">
							<li>
								<code className="bg-background px-1 py-0.5 rounded">{"{{googleForm.respondentEmail}}"}</code>-
								Respondent's email
							</li>
							<li>
								<code className="bg-background px-1 py-0.5 rounded">{"{{googleForm.responses['Question Name']}}"}</code>
								- Specific answer
							</li>
							<li>
								<code className="bg-background px-1 py-0.5 rounded">{"{{json googleForm.responses}}"}</code>- All
								responses as JSON
							</li>
						</ol>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
