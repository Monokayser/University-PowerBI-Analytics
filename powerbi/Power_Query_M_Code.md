# Power Query M Code

These expressions document the transformations demonstrated by the Python cleaning pipeline and intended for Power BI Power Query.

## Students - Trim and Standardize Categories
```powerquery
= Table.TransformColumns(Source, {{"Gender", each Text.Proper(Text.Trim(Text.Clean(_))), type text}, {"StudentStatus", each Text.Proper(Text.Trim(Text.Clean(_))), type text}})
```

## Enrollment - Validate Marks and Create Risk Columns
```powerquery
= Table.AddColumn(Table.TransformColumns(Source, {{"FinalMark", each Number.Min(100, Number.Max(0, Number.From(_))), type number}}), "Attendance Risk Level", each if [AttendancePercentage] < 60 then "High Risk" else if [AttendancePercentage] < 75 then "Moderate Risk" else "Low Risk")
```

## Payments - Recalculate Outstanding Balance
```powerquery
= Table.AddColumn(Source, "OutstandingAmount_Calculated", each [TotalPayable] - [AmountPaid], type number)
```

## DepartmentBudget - Budget Utilization Category
```powerquery
= Table.AddColumn(Source, "Budget Utilization Category", each if [UsedBudget] / [AllocatedBudget] < 0.7 then "Underutilized" else if [UsedBudget] / [AllocatedBudget] <= 0.9 then "On Track" else "High Utilization")
```
