# Dashboard Page Specifications

These page specifications map the assignment requirements to a Power BI Desktop build plan. They are not fabricated screenshots; they are implementation instructions for the final `.pbix`.

## Page 1 - Executive Overview

Purpose: Give management a one-page institutional performance snapshot.

Visuals:

- KPI cards: Total Students, Total Enrollments, Average Grade Point, Pass Rate, Average Attendance, Total Outstanding Amount
- Line chart: Enrollment trend by semester
- Bar chart: Students by department
- Stacked column chart: Academic performance distribution
- Donut or bar chart: Payment status distribution
- Slicers: Academic Year, Department, Semester

## Page 2 - Student Analytics

Purpose: Analyze student demographics, scholarship distribution, and student status.

Visuals:

- Bar charts: Students by department, district, batch, study level
- Stacked bar chart: Students by gender and department
- Matrix: Scholarship status by department
- Table: Detailed student list with profile attributes
- Slicers: Gender, Department, Scholarship Status, Student Status

## Page 3 - Academic Performance

Purpose: Identify performance patterns by course, department, semester, gender, and level.

Visuals:

- Column chart: Average final mark by department
- Bar chart: Pass rate by course
- Stacked chart: Grade distribution
- Tables: Top-performing and lowest-performing courses
- Line chart: Performance by semester
- Matrix: Performance by gender and study level

## Page 4 - Attendance Analytics

Purpose: Monitor attendance risk and its association with final marks.

Visuals:

- KPI cards: Average Attendance Percentage, Students Below Attendance Requirement, Attendance Risk Rate
- Stacked bar chart: Present vs Absent/Late/Excused records
- Bar charts: Attendance by department and course
- Scatter plot: Attendance percentage vs final mark
- Detailed attendance table

## Page 5 - Financial Analytics

Purpose: Track tuition billing, collection, and outstanding balances.

Visuals:

- KPI cards: Total Payable, Total Amount Paid, Outstanding Amount, Collection Rate
- Bar chart: Outstanding amount by department
- Column chart: Payment method analysis
- Line chart: Payment trend by semester using Payment Date
- Table: Students with highest outstanding balances

## Page 6 - Department and Faculty Analytics

Purpose: Compare departments by students, courses, faculty workload, results, and budget use.

Visuals:

- Bar charts: Students, courses, and faculty by department
- Matrix: Faculty course load
- KPI/Bar: Department pass rate and average grade point
- Column chart: Budget utilization and remaining budget
- Ranking table: Department Performance Rank

## Optional Page 7 - Student Drill-Through Detail

Purpose: Provide an individual student-level review page.

Visuals:

- Student identity and profile cards
- Academic summary
- Course enrollment table
- Attendance summary
- Payment summary
- Scholarship and graduation eligibility indicators

## Required Interactivity

- Department, semester, academic-year, gender, course, student-status, payment-status, and scholarship-status slicers
- Drill-down on department, course, and semester visuals
- Student drill-through page
- Cross-filtering enabled where analytical relationships are valid
- Dynamic title using `Selected Department Title`
- Conditional formatting for risk levels and outstanding balances
- Report-page tooltips for course, department, and student details
- Navigation buttons between report pages
