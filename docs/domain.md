# Domain: Learning Management System (LMS) - Course Completion

## Core idea

In this domain, a learner progresses through modules inside a course.
Each module has a result status, and the course completion status is derived from those module results.

## Business rule

A course is marked as **Complete** only when **all modules linked to that course have status `Passed`**.

If even one module is still pending or failed, the course remains **In Progress**.

## State change flow

1. A module is completed by calling `Module.complete()`.
2. After that state change, the course immediately checks its own completion state through `Course.evaluateCompletion()`.
3. `Course.evaluateCompletion()` applies the business rule:
   - If every module is `Passed`, set course status to `Completed`.
   - If not all modules are Passed, the course remains InProgress.


## Observer opportunities

When the course transitions from `InProgress` to `Completed`, the domain emits a `CourseCompleted` event.
Observers can react without coupling business logic to infrastructure concerns.

Examples:

- Certificate Generator Observer: automatically create a PDF certificate when a course is completed.
- Learning Dashboard Observer: refresh learner progress and completion widgets.
- Notification Observer: send email or in-app completion messages.

## Why this matters

This keeps the rule in one place (the domain model), makes behavior predictable, and lets new features be added by subscribing observers instead of rewriting core course logic.
