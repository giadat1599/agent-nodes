import type { ReactFlowInstance } from "@xyflow/react"
import { create } from "zustand"

interface EditorStore {
	editor: ReactFlowInstance | null
	isAutoSaving: boolean
	setEditor: (editor: ReactFlowInstance | null) => void
	setIsAutoSaving: (isAutoSaving: boolean) => void
}

export const useEditorStore = create<EditorStore>((set) => ({
	editor: null,
	isAutoSaving: false,
	setEditor: (editor: ReactFlowInstance | null) => set({ editor }),
	setIsAutoSaving: (isAutoSaving: boolean) => set({ isAutoSaving }),
}))
