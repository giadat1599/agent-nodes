import { createContext } from "react-router"
import type { Auth } from "./types/auth"

export const sessionContext = createContext<Auth | null>(null)
