# Date Table DAX

Create this table in Power BI Desktop using **Modeling > New table**, then mark it as the official Date table using the `Date` column.

```DAX
Date =
ADDCOLUMNS (
    CALENDAR ( DATE ( 2023, 1, 1 ), DATE ( 2026, 8, 31 ) ),
    "Year", YEAR ( [Date] ),
    "Quarter", QUARTER ( [Date] ),
    "QuarterName", "Q" & QUARTER ( [Date] ),
    "MonthNumber", MONTH ( [Date] ),
    "MonthName", FORMAT ( [Date], "MMMM" ),
    "ShortMonthName", FORMAT ( [Date], "MMM" ),
    "YearMonth", FORMAT ( [Date], "YYYY-MM" ),
    "YearMonthSort", YEAR ( [Date] ) * 100 + MONTH ( [Date] ),
    "WeekNumber", WEEKNUM ( [Date], 2 ),
    "DayNumber", DAY ( [Date] ),
    "DayName", FORMAT ( [Date], "dddd" ),
    "AcademicYear", YEAR ( [Date] ),
    "SemesterPeriod",
        SWITCH (
            TRUE (),
            MONTH ( [Date] ) IN { 1, 2, 3, 4 }, "Spring",
            MONTH ( [Date] ) IN { 5, 6, 7, 8 }, "Summer",
            "Fall"
        )
)
```

Recommended active relationship:

| From | To | Status | Purpose |
|---|---|---|---|
| `Date[Date]` | `Enrollment[EnrollmentDate]` | Active | Enrollment trend analysis |

Recommended inactive relationships:

| From | To | Status | Measure usage |
|---|---|---|---|
| `Date[Date]` | `Payments[PaymentDate]` | Inactive | Use with `USERELATIONSHIP` for payment collection trend |
| `Date[Date]` | `Attendance[AttendanceDate]` | Inactive | Use for attendance event trend pages |
| `Date[Date]` | `Students[AdmissionDate]` | Inactive | Use for admission-year trend analysis |

Use inactive relationships when multiple date fields exist in the model to avoid ambiguous filter paths.
