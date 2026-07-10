# DAX Calculated Columns

The cleaned dataset already contains several Power Query-derived columns. The following DAX calculated columns may be added in Power BI Desktop where interactive model-level categorization is preferred.

## Students - Student Age

```DAX
Student Age =
DATEDIFF ( Students[DateOfBirth], TODAY (), YEAR )
```

## Students - Student Age Group

```DAX
Student Age Group =
SWITCH (
    TRUE (),
    Students[Student Age] < 20, "Below 20",
    Students[Student Age] <= 24, "20-24",
    Students[Student Age] <= 29, "25-29",
    "30+"
)
```

## Enrollment - Course Result Category

```DAX
Course Result Category =
IF ( Enrollment[PassedStatus] = "Passed", "Successful Completion", "Needs Retake / Support" )
```

## Enrollment - Graduation Eligibility

```DAX
Graduation Eligibility =
VAR StudentCredits =
    CALCULATE (
        SUM ( Courses[CreditHours] ),
        FILTER ( Enrollment, Enrollment[PassedStatus] = "Passed" )
    )
VAR StudentGPA =
    CALCULATE ( AVERAGE ( Enrollment[GradePoint] ) )
RETURN
    IF ( StudentCredits >= 120 && StudentGPA >= 2.00, "Eligible", "Not Yet Eligible" )
```

## Faculty - Faculty Experience Group

```DAX
Faculty Experience Group =
VAR YearsOfService = DATEDIFF ( Faculty[JoiningDate], TODAY (), YEAR )
RETURN
    SWITCH (
        TRUE (),
        YearsOfService < 3, "Early Career",
        YearsOfService <= 8, "Experienced",
        YearsOfService <= 15, "Senior",
        "Highly Experienced"
    )
```

## Conceptual Difference

| Type | Created in | Best for | Example in this project |
|---|---|---|---|
| Power Query calculated column | Power Query before loading data | Cleaning, type correction, reusable low-cardinality categories | `Payment Risk Level`, `Budget Utilization Category` |
| DAX calculated column | Data model after loading data | Row-level model logic that depends on relationships | `Student Age`, `Faculty Experience Group` |
| DAX measure | Data model at query time | Aggregations that respond to slicers and visual context | `Pass Rate`, `Payment Collection Rate`, `Department Performance Rank` |

Avoid calculated columns when a measure can answer the question more efficiently, especially for high-cardinality transaction tables.
