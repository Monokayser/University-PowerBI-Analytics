# Prompt Compliance Cross-Check

Cross-check date: 2026-07-10

## Completed Locally

| Requirement Area | Status | Evidence |
|---|---|---|
| Synthetic university analytics topic | Complete | `README.md`, generated data files |
| Raw and cleaned datasets | Complete | `data/raw/`, `data/cleaned/` |
| 10 required tables | Complete | Cleaned workbook has Students, StudentProfile, Departments, Courses, Faculty, Semesters, Enrollment, Attendance, Payments, DepartmentBudget |
| Required row scale | Complete | 1,000 students, 70 courses, 50 faculty, 12,500 enrollment records, 22,577 attendance records |
| One-to-one relationship | Complete/documented | `Students[StudentID]` to `StudentProfile[StudentID]` |
| One-to-many relationships | Complete/documented | `documentation/Relationship_Documentation.md` |
| Many-to-many resolved by bridge | Complete/documented | Students -> Enrollment <- Courses |
| Controlled raw data-quality issues | Complete | Raw workbook contains duplicates, inconsistent text, null attendance, invalid marks, text dates, payment inconsistencies |
| Cleaned dataset | Complete | `data/cleaned/University_Academic_Analytics_Cleaned.xlsx` |
| Validation report | Complete/pass | `data/validation/Data_Validation_Results.xlsx` |
| Python scripts | Complete/tested | `scripts/generate_dataset.py`, `clean_dataset.py`, `validate_dataset.py`, `exploratory_analysis.py` |
| Data dictionary | Complete | `documentation/University_Data_Dictionary.xlsx` |
| DAX measures | Complete | `powerbi/DAX_Measures.md`, 40 measures |
| Date table DAX | Complete | `powerbi/Date_Table_DAX.md` |
| DAX calculated columns | Complete | `powerbi/DAX_Calculated_Columns.md` |
| Power Query transformations | Complete/documented | `powerbi/Power_Query_M_Code.md` |
| Dashboard page specifications | Complete | `documentation/Dashboard_Page_Specifications.md` |
| Report files | Complete | `report/PowerBI_Project_Report.docx`, `report/PowerBI_Project_Report.pdf` |
| Presentation | Complete | `presentation/PowerBI_Project_Presentation.pptx` |
| Web landing page source | Complete | `web/index.html` |
| GitHub repository | Complete | `https://github.com/Monokayser/University-PowerBI-Analytics` |
| GitHub release | Complete | `https://github.com/Monokayser/University-PowerBI-Analytics/releases/tag/v1.1.0` |
| Public static analytics viewer | Complete locally / pending Pages verification | `docs/index.html` |
| Demo video | Complete | `docs/downloads/University_Analytics_Demo.mp4` |
| Public report/presentation downloads | Complete | `docs/downloads/` |

## Environment-Limited Items

| Requirement Area | Status | Reason |
|---|---|---|
| `.pbix` file | Not created | Power BI Desktop was not installed in the environment |
| Actual dashboard screenshots | Not created | Would require a real `.pbix`; screenshots were not fabricated |
| Power BI Service publication | Not completed | Requires Power BI Desktop and a licensed/authorized Power BI account |
| Power BI App URL | Not completed | Requires Power BI workspace/app permissions |
| Public Power BI embed URL | Not completed | Requires tenant permission and tested Publish to Web |
| GitHub Pages activation | Pending verification | Source exists in `docs/`; Pages must be enabled or confirmed through repository settings/API |

## Verification Commands

```powershell
python scripts\generate_dataset.py
python scripts\clean_dataset.py
python scripts\validate_dataset.py
python scripts\exploratory_analysis.py
```

Latest validation result: all automated validation checks pass.

## Correct Repository Placement

The project is in the dedicated repository:

`https://github.com/Monokayser/University-PowerBI-Analytics`

The earlier accidental upload to `Monokayser/Data-Visualization` was removed, and that repository was restored to its previous latest commit `4774987`.
