import { Module } from "./module"
import { ModuleId, ModuleTitle, ModuleStatus, XpReward } from "./types"
import { v4 as uuidv4 } from "uuid"

export function createModule(title: string, status: string, xp: number): Module {
  const validStatuses: ModuleStatus[] = ["passed", "failed", "pending"]
  if (!validStatuses.includes(status as ModuleStatus)) {
    throw new Error(
      `Invalid status: "${status}". Must be passed | failed | pending`,
    )
  }
  if (xp < 0) {
    throw new Error(`XpReward cannot be negative: ${xp}`)
  }
  if (!Number.isInteger(xp)) {
    throw new Error(`XpReward must be a whole number: ${xp}`)
  }
  if (title.trim() === "") {
    throw new Error("Title cannot be empty")
  }

  return {
    id: uuidv4() as ModuleId,
    title: title as ModuleTitle,
    status: status as ModuleStatus,
    xpReward: xp as XpReward,
  }
}
