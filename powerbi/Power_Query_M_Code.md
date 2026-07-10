# Power Query M Code

This document records the major Power Query transformations required by the assignment. The same cleaning logic has also been implemented in `scripts/clean_dataset.py` so the cleaned workbook can be reproduced before loading it into Power BI.

## Common Import Pattern - All Tables

Purpose: Import Excel worksheets, promote headers, and remove blank rows.

Operation: Excel Workbook import, promote headers, remove empty rows.

```powerquery
let
    Source = Excel.Workbook(File.Contents("data/cleaned/University_Academic_Analytics_Cleaned.xlsx"), null, true),
    Students_Sheet = Source{[Item="Students", Kind="Sheet"]}[Data],
    PromotedHeaders = Table.PromoteHeaders(Students_Sheet, [PromoteAllScalars=true]),
    RemovedBlankRows = Table.SelectRows(PromotedHeaders, each List.NonNullCount(Record.FieldValues(_)) > 0)
in
    RemovedBlankRows
```

Result: Each worksheet loads with correct headers and without fully blank rows.

## Students - Trim, Clean, Rename, and Type Columns

Purpose: Standardize student identifiers and demographic fields.

Operation: Trim text, clean non-printable characters, standardize capitalization, and apply date types.

```powerquery
let
    Source = Students,
    CleanText = Table.TransformColumns(
        Source,
        {
            {"StudentID", each Text.Upper(Text.Trim(Text.Clean(_))), type text},
            {"StudentName", each Text.Proper(Text.Trim(Text.Clean(_))), type text},
            {"Gender", each Text.Proper(Text.Trim(Text.Clean(_))), type text},
            {"StudentStatus", each Text.Proper(Text.Trim(Text.Clean(_))), type text},
            {"District", each Text.Proper(Text.Trim(Text.Clean(_))), type text}
        }
    ),
    StandardGender = Table.ReplaceValue(CleanText, "M", "Male", Replacer.ReplaceText, {"Gender"}),
    StandardStatus = Table.ReplaceValue(StandardGender, "Active ", "Active", Replacer.ReplaceText, {"StudentStatus"}),
    ChangedTypes = Table.TransformColumnTypes(StandardStatus, {{"DateOfBirth", type date}, {"AdmissionDate", type date}}),
    RemovedDuplicates = Table.Distinct(ChangedTypes, {"StudentID"}),
    AgeGroup = Table.AddColumn(RemovedDuplicates, "Age Group", each if Date.Year(Date.From(DateTime.LocalNow())) - Date.Year([DateOfBirth]) < 20 then "Below 20" else if Date.Year(Date.From(DateTime.LocalNow())) - Date.Year([DateOfBirth]) <= 24 then "20-24" else "25+", type text),
    AdmissionYear = Table.AddColumn(AgeGroup, "Admission Year Group", each Text.From(Date.Year([AdmissionDate])), type text)
in
    AdmissionYear
```

Result: Student values are standardized, duplicate student identifiers are removed, and useful age/admission categories are available.

## StudentProfile - One-to-One Cleanup

Purpose: Ensure each `StudentID` appears once and numeric admission scores are valid.

Operation: Remove duplicates, trim text, set numeric type.

```powerquery
let
    Source = StudentProfile,
    CleanText = Table.TransformColumns(Source, {{"StudentID", each Text.Upper(Text.Trim(Text.Clean(_))), type text}}),
    ChangedTypes = Table.TransformColumnTypes(CleanText, {{"AdmissionScore", type number}}),
    RemovedDuplicates = Table.Distinct(ChangedTypes, {"StudentID"})
in
    RemovedDuplicates
```

Result: StudentProfile supports a true one-to-one relationship with Students.

## Departments - Standardize Department Labels

Purpose: Correct inconsistent department labels and protect relationship keys.

Operation: Trim, clean, title-case names, remove duplicate department identifiers.

```powerquery
let
    Source = Departments,
    CleanText = Table.TransformColumns(
        Source,
        {
            {"DepartmentID", each Text.Upper(Text.Trim(Text.Clean(_))), type text},
            {"DepartmentName", each Text.Proper(Text.Trim(Text.Clean(_))), type text},
            {"FacultyName", each Text.Proper(Text.Trim(Text.Clean(_))), type text}
        }
    ),
    RemovedDuplicates = Table.Distinct(CleanText, {"DepartmentID"})
in
    RemovedDuplicates
```

Result: Departments become reliable dimensions for student, course, faculty, and budget analysis.

## Courses - Standardize Course Categories

Purpose: Clean inconsistent course-category labels and set numeric credit-hour type.

Operation: Trim, clean, replace values, change data types.

```powerquery
let
    Source = Courses,
    CleanText = Table.TransformColumns(
        Source,
        {
            {"CourseID", each Text.Upper(Text.Trim(Text.Clean(_))), type text},
            {"CourseCategory", each Text.Proper(Text.Trim(Text.Clean(_))), type text},
            {"CourseType", each Text.Proper(Text.Trim(Text.Clean(_))), type text}
        }
    ),
    ChangedTypes = Table.TransformColumnTypes(CleanText, {{"CreditHours", Int64.Type}}),
    RemovedDuplicates = Table.Distinct(ChangedTypes, {"CourseID"})
in
    RemovedDuplicates
```

Result: Course categories and credit hours support reliable course popularity and performance visuals.

## Faculty - Date Type and Experience Group

Purpose: Prepare faculty workload and experience analysis.

Operation: Convert joining date and add a conditional experience category.

```powerquery
let
    Source = Faculty,
    ChangedTypes = Table.TransformColumnTypes(Source, {{"JoiningDate", type date}}),
    ExperienceGroup = Table.AddColumn(
        ChangedTypes,
        "Faculty Experience Group",
        each if Date.Year(Date.From(DateTime.LocalNow())) - Date.Year([JoiningDate]) < 3 then "Early Career"
        else if Date.Year(Date.From(DateTime.LocalNow())) - Date.Year([JoiningDate]) <= 8 then "Experienced"
        else if Date.Year(Date.From(DateTime.LocalNow())) - Date.Year([JoiningDate]) <= 15 then "Senior"
        else "Highly Experienced",
        type text
    )
in
    ExperienceGroup
```

Result: Faculty experience can be used in workload and staffing analysis.

## Semesters - Date Logic

Purpose: Validate semester start and end dates and support trend analysis.

Operation: Convert dates and add semester period.

```powerquery
let
    Source = Semesters,
    ChangedTypes = Table.TransformColumnTypes(Source, {{"StartDate", type date}, {"EndDate", type date}, {"AcademicYear", Int64.Type}}),
    ValidDates = Table.SelectRows(ChangedTypes, each [EndDate] > [StartDate]),
    SemesterPeriod = Table.AddColumn(ValidDates, "SemesterPeriod", each Text.BeforeDelimiter([SemesterName], " "), type text)
in
    SemesterPeriod
```

Result: Semester records are valid and ready for academic-year and semester slicers.

## Enrollment - Validate Marks and Build Risk Categories

Purpose: Clean the bridge/fact table and create academic/attendance risk categories.

Operation: Remove duplicate enrollment IDs, convert date text, clamp invalid marks, recalculate grades, and add conditional columns.

```powerquery
let
    Source = Enrollment,
    RemovedDuplicates = Table.Distinct(Source, {"EnrollmentID"}),
    ChangedTypes = Table.TransformColumnTypes(RemovedDuplicates, {{"EnrollmentDate", type date}, {"FinalMark", type number}, {"GradePoint", type number}, {"AttendancePercentage", type number}}),
    ValidMarks = Table.TransformColumns(ChangedTypes, {{"FinalMark", each Number.Min(100, Number.Max(0, _)), type number}}),
    AcademicCategory = Table.AddColumn(
        ValidMarks,
        "Academic Performance Category",
        each if [FinalMark] < 40 then "At Risk" else if [FinalMark] < 60 then "Satisfactory" else if [FinalMark] < 75 then "Good" else "Excellent",
        type text
    ),
    AttendanceRisk = Table.AddColumn(
        AcademicCategory,
        "Attendance Risk Level",
        each if [AttendancePercentage] < 60 then "High Risk" else if [AttendancePercentage] < 75 then "Moderate Risk" else "Low Risk",
        type text
    ),
    ResultCategory = Table.AddColumn(AttendanceRisk, "Course Result Category", each if [FinalMark] >= 40 then "Passed" else "Failed", type text)
in
    ResultCategory
```

Result: Invalid marks are corrected, and the fact table can support performance and attendance-risk visuals.

## Attendance - Handle Null Values

Purpose: Clean class-session attendance events.

Operation: Convert attendance dates, replace null status values, and standardize text.

```powerquery
let
    Source = Attendance,
    ChangedTypes = Table.TransformColumnTypes(Source, {{"AttendanceDate", type date}, {"ClassDuration", type number}}),
    ReplaceNulls = Table.ReplaceValue(ChangedTypes, null, "Unknown", Replacer.ReplaceValue, {"AttendanceStatus"}),
    CleanStatus = Table.TransformColumns(ReplaceNulls, {{"AttendanceStatus", each Text.Proper(Text.Trim(Text.Clean(_))), type text}})
in
    CleanStatus
```

Result: Attendance records remain analytically usable even when raw status values are missing.

## Payments - Calculate Outstanding Balance and Payment Risk

Purpose: Correct payment balances and classify financial risk.

Operation: Convert numeric/date fields, recalculate outstanding balance, standardize payment status, add risk level.

```powerquery
let
    Source = Payments,
    ChangedTypes = Table.TransformColumnTypes(Source, {{"TotalPayable", type number}, {"AmountPaid", type number}, {"PaymentDate", type date}}),
    RecalculateOutstanding = Table.AddColumn(ChangedTypes, "OutstandingAmount_Calculated", each [TotalPayable] - [AmountPaid], type number),
    RemoveOldOutstanding = Table.RemoveColumns(RecalculateOutstanding, {"OutstandingAmount"}),
    RenameOutstanding = Table.RenameColumns(RemoveOldOutstanding, {{"OutstandingAmount_Calculated", "OutstandingAmount"}}),
    PaymentStatus = Table.AddColumn(
        RenameOutstanding,
        "Payment Status Clean",
        each if [OutstandingAmount] = 0 then "Paid" else if [AmountPaid] = 0 then "Unpaid" else "Partial",
        type text
    ),
    PaymentRisk = Table.AddColumn(
        PaymentStatus,
        "Payment Risk Level",
        each if [OutstandingAmount] = 0 then "No Risk" else if [OutstandingAmount] < [TotalPayable] * 0.5 then "Moderate Risk" else "High Risk",
        type text
    )
in
    PaymentRisk
```

Result: Finance visuals use reliable outstanding balances and risk categories.

## DepartmentBudget - Budget Utilization

Purpose: Define one record per department per academic year and classify budget use.

Operation: Recalculate remaining budget and add utilization category.

```powerquery
let
    Source = DepartmentBudget,
    ChangedTypes = Table.TransformColumnTypes(Source, {{"AcademicYear", Int64.Type}, {"AllocatedBudget", type number}, {"UsedBudget", type number}}),
    RemainingBudget = Table.AddColumn(ChangedTypes, "RemainingBudget_Calculated", each [AllocatedBudget] - [UsedBudget], type number),
    UtilizationRate = Table.AddColumn(RemainingBudget, "Budget Utilization Rate", each [UsedBudget] / [AllocatedBudget], Percentage.Type),
    UtilizationCategory = Table.AddColumn(
        UtilizationRate,
        "Budget Utilization Category",
        each if [Budget Utilization Rate] < 0.7 then "Underutilized" else if [Budget Utilization Rate] <= 0.9 then "On Track" else "High Utilization",
        type text
    )
in
    UtilizationCategory
```

Result: Budget visuals can compare allocation, usage, remaining budget, and utilization risk by department and academic year.
