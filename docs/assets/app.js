
const palette=['#1f5a7a','#5d7f3a','#b8792b','#ad3f4a','#2f7e7a','#7a4e8a','#3d405b','#5c6b73'];
const money=v=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(v);
const num=v=>new Intl.NumberFormat('en-US').format(v);
const pct=v=>`${Number(v).toFixed(1)}%`;
function labels(arr){return arr.map(x=>x.label)} function values(arr){return arr.map(x=>x.value)}
function chart(id,type,arr,label,opts={}){new Chart(document.getElementById(id),{type,data:{labels:labels(arr),datasets:[{label,data:values(arr),backgroundColor:palette,borderColor:'#1f5a7a',borderWidth:2,tension:.25}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:type==='doughnut'},tooltip:{enabled:true}},scales:type==='doughnut'?{}:{y:{beginAtZero:true},x:{ticks:{maxRotation:45,minRotation:0}}},...opts}})}
fetch('assets/dashboard-data.json').then(r=>r.json()).then(data=>{
 const k=data.kpis;
 const cards=[['Total Students',num(k.totalStudents)],['Active Students',num(k.activeStudents)],['Enrollments',num(k.enrollments)],['Average GPA',k.avgGpa],['Pass Rate',pct(k.passRate)],['Average Attendance',pct(k.avgAttendance)],['Outstanding Fees',money(k.outstanding)],['Collection Rate',pct(k.collectionRate)]];
 document.getElementById('kpis').innerHTML=cards.map(c=>`<div class="kpi"><b>${c[1]}</b><span>${c[0]}</span></div>`).join('');
 chart('enrollSemester','line',data.charts.enrollmentBySemester,'Enrollments');
 chart('studentsDept','bar',data.charts.studentsByDepartment,'Students');
 chart('avgMarkDept','bar',data.charts.averageMarkByDepartment,'Average mark');
 chart('paymentStatus','doughnut',data.charts.paymentStatus,'Payments');
 chart('outstandingDept','bar',data.charts.outstandingByDepartment,'Outstanding amount');
 chart('gradeDist','bar',data.charts.gradeDistribution,'Records');
 chart('attendanceDept','bar',data.charts.attendanceByDepartment,'Attendance %');
 chart('courseFail','bar',data.charts.courseFailureRate,'Failure rate %');
 document.getElementById('budgetTable').innerHTML='<thead><tr><th>Department</th><th>Allocated</th><th>Used</th><th>Remaining</th><th>Utilization</th></tr></thead><tbody>'+data.charts.budgetUtilization.map(r=>`<tr><td>${r.DepartmentName}</td><td>${money(r.AllocatedBudget)}</td><td>${money(r.UsedBudget)}</td><td>${money(r.RemainingBudget)}</td><td>${pct(r.UtilizationRate)}</td></tr>`).join('')+'</tbody>';
 document.getElementById('findings').innerHTML=data.findings.map(f=>`<div class="finding"><b>${f.Finding}</b><p>${f.Observation}</p><p><strong>Action:</strong> ${f['Recommended Action']}</p></div>`).join('');
});
