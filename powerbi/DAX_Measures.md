# DAX Measures

Storage table: `_Measures`.

## 1. Total Students
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Total Students = COUNTROWS(Students)
```

## 2. Active Students
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Active Students = CALCULATE([Total Students], Students[StudentStatus] = "Active")
```

## 3. Inactive Students
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Inactive Students = CALCULATE([Total Students], Students[StudentStatus] <> "Active")
```

## 4. Total Departments
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Total Departments = COUNTROWS(Departments)
```

## 5. Total Courses
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Total Courses = COUNTROWS(Courses)
```

## 6. Total Faculty
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Total Faculty = COUNTROWS(Faculty)
```

## 7. Total Enrollments
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Total Enrollments = COUNTROWS(Enrollment)
```

## 8. Unique Enrolled Students
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Unique Enrolled Students = DISTINCTCOUNT(Enrollment[StudentID])
```

## 9. Average Final Mark
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Average Final Mark = AVERAGE(Enrollment[FinalMark])
```

## 10. Average Grade Point
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Average Grade Point = AVERAGE(Enrollment[GradePoint])
```

## 11. Pass Count
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Pass Count = CALCULATE(COUNTROWS(Enrollment), Enrollment[PassedStatus] = "Passed")
```

## 12. Fail Count
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Fail Count = CALCULATE(COUNTROWS(Enrollment), Enrollment[PassedStatus] = "Failed")
```

## 13. Pass Rate
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Percentage

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Pass Rate = DIVIDE([Pass Count], [Total Enrollments])
```

## 14. Failure Rate
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Percentage

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Failure Rate = DIVIDE([Fail Count], [Total Enrollments])
```

## 15. Average Attendance Percentage
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Average Attendance Percentage = AVERAGE(Enrollment[AttendancePercentage])
```

## 16. Students Below Attendance Requirement
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Students Below Attendance Requirement = CALCULATE(DISTINCTCOUNT(Enrollment[StudentID]), FILTER(Enrollment, Enrollment[AttendancePercentage] < 75))
```

## 17. Attendance Risk Rate
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Percentage

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Attendance Risk Rate = DIVIDE([Students Below Attendance Requirement], [Unique Enrolled Students])
```

## 18. Total Tuition Payable
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Total Tuition Payable = SUM(Payments[TotalPayable])
```

## 19. Total Amount Paid
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Total Amount Paid = SUM(Payments[AmountPaid])
```

## 20. Total Outstanding Amount
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Total Outstanding Amount = SUM(Payments[OutstandingAmount])
```

## 21. Payment Collection Rate
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Percentage

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Payment Collection Rate = DIVIDE([Total Amount Paid], [Total Tuition Payable])
```

## 22. Fully Paid Students
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Fully Paid Students = CALCULATE(DISTINCTCOUNT(Payments[StudentID]), Payments[PaymentStatus] = "Paid")
```

## 23. Students with Outstanding Payments
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Students with Outstanding Payments = CALCULATE(DISTINCTCOUNT(Payments[StudentID]), Payments[OutstandingAmount] > 0)
```

## 24. Average Courses per Student
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Average Courses per Student = AVERAGEX(VALUES(Students[StudentID]), CALCULATE(DISTINCTCOUNT(Enrollment[CourseID])))
```

## 25. Average Students per Course
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Average Students per Course = AVERAGEX(VALUES(Courses[CourseID]), CALCULATE(DISTINCTCOUNT(Enrollment[StudentID])))
```

## 26. Faculty Course Load
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Faculty Course Load = AVERAGEX(VALUES(Faculty[FacultyID]), CALCULATE(DISTINCTCOUNT(Enrollment[CourseID])))
```

## 27. Department Average Result
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Department Average Result = AVERAGEX(VALUES(Departments[DepartmentID]), CALCULATE([Average Final Mark]))
```

## 28. Semester-over-Semester Enrollment Growth
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Percentage

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Semester-over-Semester Enrollment Growth = VAR Prev = CALCULATE([Total Enrollments], DATEADD('Date'[Date], -4, MONTH)) RETURN DIVIDE([Total Enrollments] - Prev, Prev)
```

## 29. Year-over-Year Enrollment Growth
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Percentage

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Year-over-Year Enrollment Growth = VAR Prev = CALCULATE([Total Enrollments], SAMEPERIODLASTYEAR('Date'[Date])) RETURN DIVIDE([Total Enrollments] - Prev, Prev)
```

## 30. Budget Utilization Rate
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Percentage

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Budget Utilization Rate = DIVIDE(SUM(DepartmentBudget[UsedBudget]), SUM(DepartmentBudget[AllocatedBudget]))
```

## 31. Remaining Department Budget
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Remaining Department Budget = SUM(DepartmentBudget[RemainingBudget])
```

## 32. Graduation-Eligible Students
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Graduation-Eligible Students = CALCULATE(DISTINCTCOUNT(Enrollment[StudentID]), FILTER(VALUES(Students[StudentID]), CALCULATE(SUM(Courses[CreditHours])) >= 120 && CALCULATE([Average Grade Point]) >= 2.00))
```

## 33. Scholarship Student Count
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Scholarship Student Count = CALCULATE([Total Students], Students[ScholarshipStatus] <> "None")
```

## 34. Scholarship Rate
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Percentage

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Scholarship Rate = DIVIDE([Scholarship Student Count], [Total Students])
```

## 35. Department Performance Rank
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Department Performance Rank = RANKX(ALL(Departments[DepartmentName]), [Department Average Result], , DESC, Dense)
```

## 36. Selected Department Title
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Selected Department Title = "Department: " & SELECTEDVALUE(Departments[DepartmentName], "All Departments")
```

## 37. Top Courses by Failure
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Top Courses by Failure = CONCATENATEX(TOPN(5, VALUES(Courses[CourseTitle]), [Failure Rate], DESC), Courses[CourseTitle], ", ")
```

## 38. Outstanding Share All Selected
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Percentage

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Outstanding Share All Selected = DIVIDE([Total Outstanding Amount], CALCULATE([Total Outstanding Amount], ALLSELECTED(Departments)))
```

## 39. Paid Share Without Filters
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Percentage

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Paid Share Without Filters = DIVIDE([Total Amount Paid], CALCULATE([Total Amount Paid], REMOVEFILTERS(Students)))
```

## 40. Payment Count via USERELATIONSHIP
Purpose: Supports required academic, attendance, finance, or department analysis.

Format: Whole number / decimal / currency as applicable

Visuals: KPI cards, charts, matrices, slicer-aware dynamic titles.

```DAX
Payment Count via USERELATIONSHIP = CALCULATE(COUNTROWS(Payments), USERELATIONSHIP('Date'[Date], Payments[PaymentDate]))
```
