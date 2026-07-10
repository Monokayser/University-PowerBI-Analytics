const palette = ["#1f5a7a", "#5d7f3a", "#b8792b", "#ad3f4a", "#2f7e7a", "#7a4e8a", "#3d405b", "#5c6b73"];
const money = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
const num = (value) => new Intl.NumberFormat("en-US").format(value);
const pct = (value) => `${Number(value).toFixed(1)}%`;

const labels = (rows) => rows.map((row) => row.label);
const values = (rows) => rows.map((row) => row.value);

function baseOptions(extra = {}) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    resizeDelay: 100,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    layout: { padding: { top: 6, right: 8, bottom: 0, left: 0 } },
    ...extra
  };
}

function makeChart(id, type, rows, label, extra = {}) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  const dataset = {
    label,
    data: values(rows),
    backgroundColor: type === "line" ? "rgba(31, 90, 122, 0.14)" : palette,
    borderColor: "#1f5a7a",
    borderWidth: 2,
    pointRadius: type === "line" ? 4 : 0,
    pointHoverRadius: 5,
    tension: 0.28,
    fill: type === "line"
  };
  new Chart(canvas, {
    type,
    data: { labels: labels(rows), datasets: [dataset] },
    options: baseOptions(extra)
  });
}

const cartesian = {
  scales: {
    y: { beginAtZero: true, grid: { color: "#e6edf3" }, ticks: { color: "#5b6875" } },
    x: { grid: { display: false }, ticks: { color: "#5b6875", maxRotation: 0, autoSkip: true } }
  }
};

const horizontal = {
  indexAxis: "y",
  scales: {
    x: { beginAtZero: true, grid: { color: "#e6edf3" }, ticks: { color: "#5b6875" } },
    y: { grid: { display: false }, ticks: { color: "#5b6875" } }
  }
};

fetch("assets/dashboard-data.json")
  .then((response) => response.json())
  .then((data) => {
    const k = data.kpis;
    const cards = [
      ["Total Students", num(k.totalStudents)],
      ["Active Students", num(k.activeStudents)],
      ["Enrollments", num(k.enrollments)],
      ["Average GPA", k.avgGpa],
      ["Pass Rate", pct(k.passRate)],
      ["Average Attendance", pct(k.avgAttendance)],
      ["Outstanding Fees", money(k.outstanding)],
      ["Collection Rate", pct(k.collectionRate)]
    ];

    document.getElementById("kpis").innerHTML = cards
      .map(([label, value]) => `<div class="kpi"><b>${value}</b><span>${label}</span></div>`)
      .join("");

    makeChart("enrollSemester", "line", data.charts.enrollmentBySemester, "Enrollments", cartesian);
    makeChart("studentsDept", "bar", data.charts.studentsByDepartment, "Students", horizontal);
    makeChart("avgMarkDept", "bar", data.charts.averageMarkByDepartment, "Average mark", horizontal);
    makeChart("paymentStatus", "doughnut", data.charts.paymentStatus, "Payments", {
      cutout: "62%",
      plugins: { legend: { display: true, position: "bottom" }, tooltip: { enabled: true } }
    });
    makeChart("outstandingDept", "bar", data.charts.outstandingByDepartment, "Outstanding amount", horizontal);
    makeChart("gradeDist", "bar", data.charts.gradeDistribution, "Records", cartesian);
    makeChart("attendanceDept", "bar", data.charts.attendanceByDepartment, "Attendance %", horizontal);
    makeChart("courseFail", "bar", data.charts.courseFailureRate, "Failure rate %", horizontal);

    document.getElementById("budgetTable").innerHTML =
      "<thead><tr><th>Department</th><th>Allocated</th><th>Used</th><th>Remaining</th><th>Utilization</th></tr></thead><tbody>" +
      data.charts.budgetUtilization
        .map((row) => `<tr><td>${row.DepartmentName}</td><td>${money(row.AllocatedBudget)}</td><td>${money(row.UsedBudget)}</td><td>${money(row.RemainingBudget)}</td><td>${pct(row.UtilizationRate)}</td></tr>`)
        .join("") +
      "</tbody>";

    document.getElementById("findings").innerHTML = data.findings
      .map((finding) => `<div class="finding"><b>${finding.Finding}</b><p>${finding.Observation}</p><p><strong>Action:</strong> ${finding["Recommended Action"]}</p></div>`)
      .join("");
  })
  .catch((error) => {
    document.querySelector(".wrap").insertAdjacentHTML("afterbegin", `<section class="notice"><strong>Load error:</strong> ${error.message}</section>`);
  });
