# Build Power BI Report Step by Step

1. Open Power BI Desktop.
2. Get Data > Excel Workbook > select `data/cleaned/University_Academic_Analytics_Cleaned.xlsx`.
3. Select all worksheets and choose Transform Data.
4. Promote headers, confirm data types, trim text, remove duplicates, and validate marks/payment fields.
5. Load the data.
6. In Model view, create the documented relationships in `Relationship_Documentation.md`.
7. Create a calculated Date table, mark it as the official Date table, and relate it to semester/enrollment/payment date fields where required.
8. Create a table named `_Measures` and add every measure from `powerbi/DAX_Measures.md`.
9. Import `powerbi/University_Analytics_Theme.json`.
10. Build pages: Executive Overview, Student Analytics, Academic Performance, Attendance Analytics, Financial Analytics, Department and Faculty Analytics, and optional Drill-Through Detail.
11. Add slicers for department, semester, academic year, gender, course, student status, payment status, and scholarship status.
12. Test cross-filtering, drill-through, dynamic titles, conditional formatting, and page navigation.
13. Save as `powerbi/University_Academic_Analytics.pbix`.
14. Publish only after signing in to an authorized Power BI account.
