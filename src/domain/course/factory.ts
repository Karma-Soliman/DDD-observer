import { Course } from "./course"
import { Module } from "../module/module" 
import { CourseId, CourseTitle } from "./types"
import { v4 as uuidv4 } from "uuid"

export function createCourse(title: string, modules: Module[]): Course {
    if (title.trim() === "") {
        throw new Error("Title cannot be empty")
    }
    if (modules.length === 0) {
        throw new Error("Course should have at least one module")
    }

    return {
        id: uuidv4() as CourseId,
        title: title as CourseTitle,
        modules,
        completed: false,
    }
}

export function evaluateCompletion(courses: Course): void {
  const pass = courses.modules.every(m => m.status === "passed")
  if (pass) {
    courses.completed = true
  }
}


