# Relationship Documentation

| From | To | Key | Cardinality | Filter Direction | Purpose |
|---|---|---|---|---|---|
| Students | StudentProfile | StudentID | 1:1 | Single | Student profile extension |
| Departments | Students | DepartmentID | 1:* | Single | Student departmental grouping |
| Departments | Courses | DepartmentID | 1:* | Single | Course ownership |
| Departments | Faculty | DepartmentID | 1:* | Single | Faculty home department |
| Departments | DepartmentBudget | DepartmentID | 1:* | Single | Department-year budget |
| Students | Enrollment | StudentID | 1:* | Single | Student enrollment fact |
| Courses | Enrollment | CourseID | 1:* | Single | Course enrollment bridge |
| Semesters | Enrollment | SemesterID | 1:* | Single | Semester trend analysis |
| Faculty | Enrollment | FacultyID | 1:* | Single | Faculty workload |
| Enrollment | Attendance | EnrollmentID | 1:* | Single | Attendance events |
| Students | Payments | StudentID | 1:* | Single | Student-semester payments |
| Semesters | Payments | SemesterID | 1:* | Single | Payment trend analysis |

Students and Courses form a conceptual many-to-many relationship. It is resolved by Enrollment, which is both a transaction fact and bridge table. No direct uncontrolled Students-Courses relationship should be created.
