import { createModule } from "./domain/module/factory"
import {
  completeModInCourse,
  createCourse,
  subscribe,
} from "./domain/course/factory"
import { createStudent } from "./domain/student/factory"
import { createCertificate } from "./infrastructure/observers/certificate"
import { createGamification } from "./infrastructure/observers/gamification"

let module1
let module2
let module3
let course
let student

try {
  module1 = createModule("Introduction to Contracts", "pending", 20)
  module2 = createModule("Offer and Acceptance", "pending", 30)
  module3 = createModule("Remedies", "pending", 50)
} catch (error) {
  console.error("Error creating modules:", (error as Error).message)
}

try {
  course = createCourse("Contract Law Basics", [module1, module2, module3])
} catch (error) {
  console.error("Error creating course:", (error as Error).message)
}

try {
  student = createStudent()
} catch (error) {
  console.error("Error creating student:", (error as Error).message)
}

const certificateObserver = createCertificate()

const gamificationObserver = createGamification({
  getStudent: () => student,
  setStudent: (updatedStudent) => {
    student = updatedStudent
  },
  xpPerCourse: 100,
})

if (course) {
  course = subscribe(course, certificateObserver)
  course = subscribe(course, gamificationObserver)
}

console.log("\nTEST 1 — course should NOT complete early")

try {
  course = completeModInCourse(course, module1.id)
  console.log("Course completed:", course.completed)
} catch (error) {
  console.error("Error completing module:", (error as Error).message)
}

console.log("\nTEST 2 — completing remaining modules")

try {
  course = completeModInCourse(course, module2.id)
  course = completeModInCourse(course, module3.id)
  console.log("Course completed:", course.completed)
} catch (error) {
  console.error("Error completing modules:", (error as Error).message)
}

console.log("\nTEST 3 — completing module again")

try {
  course = completeModInCourse(course, module3.id)
} catch (error) {
  console.error("Error completing module again:", (error as Error).message)
}

if (student) {
  console.log("Student XP:", student.xp)
  console.log("Student rank:", student.rank)
}

console.log("\nTEST 4 — second course progression")

try {
  const moduleA = createModule("Contracts II", "pending", 20)
  const moduleB = createModule("Contracts III", "pending", 30)

  let course2 = createCourse("Advanced Contracts", [moduleA, moduleB])

  course2 = subscribe(course2, certificateObserver)
  course2 = subscribe(course2, gamificationObserver)

  course2 = completeModInCourse(course2, moduleA.id)
  course2 = completeModInCourse(course2, moduleB.id)

  console.log("Student XP:", student?.xp)
  console.log("Student rank:", student?.rank)
} catch (error) {
  console.error("Error in second course:", (error as Error).message)
}

console.log("\nTEST 5 — invalid title")

try {
  createCourse("", [module1])
} catch (error) {
  console.log("Validation error:", (error as Error).message)
}

console.log("\nTEST 6 — invalid module status")

try {
  createModule("Bad Module", "completed", 10)
} catch (error) {
  console.log("Validation error:", (error as Error).message)
}