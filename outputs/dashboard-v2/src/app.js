const data = window.ADMISSIONS_360_DATA;

const state = {
  filters: {
    faculty: "Все",
    program: "Все",
    form: "Все",
    risk: "Все",
    source: "Все",
    status: "Все"
  },
  search: "",
  hiddenColumns: new Set(),
  selectedProgramId: "130301",
  summaryMode: "actions",
  charts: {
    applications: 5,
    payments: 5
  }
};

const filterSelectMap = {
  facultyFilter: "faculty",
  programFilter: "program",
  formFilter: "form",
  riskFilter: "risk",
  sourceFilter: "source",
  statusFilter: "status"
};

const formatNumber = (value) => {
  if (typeof value !== "number") return value;
  return new Intl.NumberFormat("ru-RU").format(value);
};

const unique = (items) => ["Все", ...Array.from(new Set(items)).sort((a, b) => a.localeCompare(b, "ru"))];

function populateSelect(id, values, selected = "Все") {
  const select = document.getElementById(id);
  select.innerHTML = values.map((value) => `<option ${value === selected ? "selected" : ""}>${value}</option>`).join("");
}

function setupFilters() {
  populateSelect("facultyFilter", unique(data.programs.map((item) => item.faculty)));
  populateSelect("programFilter", unique(data.programs.map((item) => item.program)));
  populateSelect("formFilter", unique(data.programs.map((item) => item.form)));
  populateSelect("riskFilter", unique(data.programs.map((item) => item.risk)));
  populateSelect("sourceFilter", unique(data.programs.map((item) => item.source)));
  populateSelect("statusFilter", unique(data.programs.map((item) => item.status)));

  Object.entries(filterSelectMap).forEach(([id, key]) => {
    document.getElementById(id).addEventListener("change", (event) => {
      state.filters[key] = event.target.value;
      render();
    });
  });

  document.getElementById("searchInput").addEventListener("input", (event) => {
    state.search = event.target.value.trim().toLowerCase();
    render();
  });

  document.getElementById("resetFilters").addEventListener("click", () => {
    Object.keys(state.filters).forEach((key) => {
      state.filters[key] = "Все";
    });
    Object.keys(filterSelectMap).forEach((id) => {
      document.getElementById(id).value = "Все";
    });
    state.search = "";
    document.getElementById("searchInput").value = "";
    render();
  });
}

function getFilteredPrograms() {
  return data.programs.filter((item) => {
    const matchesFilters = Object.entries(state.filters).every(([key, value]) => value === "Все" || item[key] === value);
    const haystack = `${item.faculty} ${item.program} ${item.action}`.toLowerCase();
    return matchesFilters && (!state.search || haystack.includes(state.search));
  });
}

function renderMetrics() {
  document.getElementById("metrics").innerHTML = data.metrics.map((metric) => `
    <article class="metric-card">
      <div class="metric-icon">${metric.icon}</div>
      <div>
        <p>${metric.label}</p>
        <strong>${formatNumber(metric.value)}</strong>
        <span>${metric.delta}</span>
        ${metric.progress ? `<div class="mini-progress"><i style="width:${metric.progress}%"></i></div>` : ""}
      </div>
    </article>
  `).join("");
}

function renderSourceHealth() {
  document.getElementById("sourceHealth").innerHTML = `
    <div class="source-health-title">
      <span>Демо</span>
      <strong>${data.demoLabel}</strong>
    </div>
    ${data.sourceHealth.map((source) => `
      <article class="source-status ${source.status}">
        <i aria-hidden="true"></i>
        <div>
          <span>${source.label}</span>
          <strong>${source.value}</strong>
          <small>${source.note}</small>
        </div>
      </article>
    `).join("")}
  `;
}

function riskClass(risk) {
  return {
    "Низкий": "risk-low",
    "Средний": "risk-medium",
    "Высокий": "risk-high"
  }[risk] || "";
}

function progressClass(progress) {
  if (progress < 70) return "danger";
  if (progress < 78) return "warning";
  return "good";
}

function renderTable() {
  const rows = getFilteredPrograms();
  const limit = Number(document.getElementById("pageSize").value || 13);
  const visibleRows = rows.slice(0, limit);

  document.getElementById("programRows").innerHTML = visibleRows.map((item) => `
    <tr data-program-id="${item.id}" class="${item.id === state.selectedProgramId ? "selected-row" : ""}" tabindex="0" aria-label="Открыть детали направления ${item.program}">
      <td>
        <div class="faculty-cell"><span>${item.icon}</span><b>${item.faculty}</b></div>
      </td>
      <td class="program-name">${item.program}</td>
      <td data-col="plan">${item.plan}</td>
      <td data-col="potential">${item.potential}</td>
      <td data-col="submitted">${item.submitted}</td>
      <td data-col="contest">${String(item.contest).replace(".", ",")}</td>
      <td data-col="risk"><span class="risk ${riskClass(item.risk)}">${item.risk}</span></td>
      <td data-col="progress">
        <div class="progress-cell">
          <span>${item.progress}%</span>
          <div class="progress-track"><i class="${progressClass(item.progress)}" style="width:${item.progress}%"></i></div>
        </div>
      </td>
      <td data-col="action"><span class="action-icon">✉</span>${item.action}</td>
    </tr>
  `).join("");

  document.getElementById("tableCount").textContent = `1–${visibleRows.length} из ${rows.length}`;
  document.querySelectorAll("#programRows tr").forEach((row) => {
    const selectRow = () => {
      state.selectedProgramId = row.dataset.programId;
      renderTable();
      renderProgramDetail();
    };
    row.addEventListener("click", selectRow);
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectRow();
      }
    });
  });
  applyHiddenColumns();
}

function renderRecommendations() {
  const items = data.executiveSummary[state.summaryMode];
  document.getElementById("recommendations").innerHTML = items.map((item) => `
    <article class="rec-item ${item.tone}">
      <span class="rec-number">${item.priority}</span>
      <p>${item.action}</p>
      <strong>${formatNumber(item.count)} <small>${item.unit}</small></strong>
    </article>
  `).join("");

  document.querySelectorAll("[data-summary]").forEach((button) => {
    button.setAttribute("aria-selected", String(button.dataset.summary === state.summaryMode));
  });
}

function renderProgramDetail() {
  const item = data.programs.find((program) => program.id === state.selectedProgramId) || data.programs[0];
  const detail = item.detail;
  const root = document.getElementById("programDetail");

  if (!detail) {
    root.innerHTML = `
      <div class="program-detail-placeholder">
        <strong>${item.program}</strong>
        <span>Для этого демонстрационного направления детальная выгрузка пока не подключена.</span>
      </div>
    `;
    return;
  }

  const maxFunnel = Math.max(...detail.funnel.map((step) => step.value));
  root.innerHTML = `
    <div class="detail-head">
      <div>
        <span>Выбранное направление</span>
        <h3>${item.program}</h3>
        <p>${detail.subtitle}</p>
      </div>
      <span class="detail-risk ${riskClass(item.risk)}">${item.risk} риск</span>
    </div>
    <div class="detail-grid">
      <section class="detail-block">
        <h4>Воронка</h4>
        <div class="funnel">
          ${detail.funnel.map((step) => `
            <div>
              <span>${step.label}${step.kind === "model" ? " · модель" : ""}</span>
              <strong>${formatNumber(step.value)}</strong>
              <i><b style="width:${Math.max(8, (step.value / maxFunnel) * 100)}%"></b></i>
            </div>
          `).join("")}
        </div>
      </section>
      <section class="detail-block facts-block">
        <h4>Параметры приема</h4>
        <div class="detail-facts">
          ${detail.facts.map((fact) => `<div><span>${fact.label}</span><strong>${fact.value}</strong></div>`).join("")}
        </div>
      </section>
      <section class="detail-block">
        <h4>Следующие действия</h4>
        <ol class="detail-actions">
          ${detail.actions.map((action) => `<li>${action}</li>`).join("")}
        </ol>
      </section>
    </div>
    <p class="detail-provenance">${detail.provenance}</p>
  `;
}

function renderDonut() {
  const colors = ["#0d5bff", "#ff7a00", "#07965a"];
  let start = 0;
  const slices = data.forms.map((item, index) => {
    const end = start + item.percent;
    const slice = `${colors[index]} ${start}% ${end}%`;
    start = end;
    return slice;
  });

  document.getElementById("formDonut").style.background = `conic-gradient(${slices.join(",")})`;
  document.getElementById("formLegend").innerHTML = data.forms.map((item, index) => `
    <div><i style="background:${colors[index]}"></i><span>${item.label}</span><b>${item.percent}%</b><em>${formatNumber(item.value)}</em></div>
  `).join("") + `<p>Всего подано заявлений <strong>${formatNumber(data.forms.reduce((sum, item) => sum + item.value, 0))}</strong></p>`;
}

function createLineChart(rootId, series, options) {
  const root = document.getElementById(rootId);
  const width = 520;
  const height = 210;
  const pad = { left: 45, right: 22, top: 24, bottom: 34 };
  const allValues = options.lines.flatMap((line) => series[line.key]);
  const max = Math.max(...allValues) * 1.08;
  const labels = series.labels;
  const activeIndex = state.charts[options.stateKey];
  const x = (index) => pad.left + (index * (width - pad.left - pad.right)) / (labels.length - 1);
  const y = (value) => height - pad.bottom - (value / max) * (height - pad.top - pad.bottom);
  const ticks = [0, Math.round(max / 2), Math.round(max)];

  const path = (values) => values.map((value, index) => `${index === 0 ? "M" : "L"} ${x(index).toFixed(1)} ${y(value).toFixed(1)}`).join(" ");
  const circles = (values, colorClass, key) => values.map((value, index) => `
    <g class="chart-point-hit" data-chart="${options.stateKey}" data-index="${index}" role="button" aria-label="${labels[index]}: ${formatNumber(value)} ${options.units[key] || ""}">
      <circle class="${colorClass} hit-area" cx="${x(index)}" cy="${y(value)}" r="11"></circle>
      <circle class="${colorClass} ${index === activeIndex ? "active-point" : ""}" cx="${x(index)}" cy="${y(value)}" r="${index === activeIndex ? 6 : 4}">
        <title>${labels[index]}: ${formatNumber(value)} ${options.units[key] || ""}</title>
      </circle>
    </g>
  `).join("");
  const grid = ticks.map((tick) => `<g><line x1="${pad.left}" x2="${width - pad.right}" y1="${y(tick)}" y2="${y(tick)}"></line><text x="10" y="${y(tick) + 4}">${tick >= 1000 ? Math.round(tick / 1000) + "K" : tick}</text></g>`).join("");
  const axisLabels = labels.map((label, index) => `<text class="x-label" x="${x(index)}" y="${height - 8}">${label}</text>`).join("");
  const activeX = x(activeIndex);

  root.innerHTML = `
    <div class="chart-legend">
      ${options.legend.map((item) => `<span><i class="${item.className}"></i>${item.label}</span>`).join("")}
    </div>
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${options.label}">
      <g class="grid">${grid}</g>
      <g class="axis">${axisLabels}</g>
      <line class="active-month-line" x1="${activeX}" x2="${activeX}" y1="${pad.top}" y2="${height - pad.bottom}"></line>
      ${options.lines.map((line) => `<path class="${line.className}" d="${path(series[line.key])}"></path>${circles(series[line.key], line.className, line.key)}${line.directLabel ? `<text class="${line.className} direct-label" x="${width - pad.right + 6}" y="${y(series[line.key].at(-1)) + 4}">${formatNumber(series[line.key].at(-1))}</text>` : ""}` ).join("")}
    </svg>
  `;

  root.querySelectorAll(".chart-point-hit").forEach((point) => {
    point.addEventListener("click", () => {
      state.charts[options.stateKey] = Number(point.dataset.index);
      syncChartControls();
      renderCharts();
    });
  });
}

function renderChartSummary(kind) {
  const index = state.charts[kind];
  if (kind === "applications") {
    const current = data.applicationSeries.current[index];
    const previous = data.applicationSeries.previous[index];
    const diff = current - previous;
    document.getElementById("applicationsSelectedLabel").textContent = data.applicationSeries.labels[index];
    document.getElementById("applicationsSummary").innerHTML = `
      <div><span>Текущий год</span><strong>${formatNumber(current)}</strong></div>
      <div><span>Ориентир</span><strong>${formatNumber(previous)}</strong></div>
      <div><span>Отклонение</span><strong>${diff >= 0 ? "+" : ""}${formatNumber(diff)}</strong></div>
    `;
    return;
  }

  const agreements = data.paymentSeries.agreements[index];
  const paid = data.paymentSeries.paid[index];
  const turnover = data.paymentSeries.turnover[index];
  document.getElementById("paymentsSelectedLabel").textContent = data.paymentSeries.labels[index];
  document.getElementById("paymentsSummary").innerHTML = `
    <div><span>Заключено</span><strong>${formatNumber(agreements)}</strong></div>
    <div><span>Оплачено</span><strong>${formatNumber(paid)}</strong></div>
    <div><span>Оборот</span><strong>${formatNumber(turnover)} млн ₽</strong></div>
  `;
}

function syncChartControls() {
  document.getElementById("applicationsRange").value = state.charts.applications;
  document.getElementById("paymentsRange").value = state.charts.payments;
}

function setupColumnPanel() {
  const columns = [
    ["plan", "План бюджет"],
    ["potential", "Потенциально"],
    ["submitted", "Заявления"],
    ["contest", "Конкурс"],
    ["risk", "Риск"],
    ["progress", "План"],
    ["action", "Действие"]
  ];

  document.getElementById("columnPanel").innerHTML = columns.map(([key, label]) => `
    <label><input type="checkbox" value="${key}" checked /> ${label}</label>
  `).join("");

  document.getElementById("toggleColumns").addEventListener("click", () => {
    document.getElementById("columnPanel").classList.toggle("hidden");
  });

  document.querySelectorAll("#columnPanel input").forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const key = event.target.value;
      if (event.target.checked) state.hiddenColumns.delete(key);
      else state.hiddenColumns.add(key);
      applyHiddenColumns();
    });
  });
}

function applyHiddenColumns() {
  document.querySelectorAll("[data-col]").forEach((cell) => {
    cell.classList.toggle("hidden-col", state.hiddenColumns.has(cell.dataset.col));
  });
}

function setupExport() {
  document.getElementById("exportReport").addEventListener("click", () => {
    const report = {
      title: "Приемная кампания 360",
      generatedAt: new Date().toISOString(),
      sourceUpdatedAt: data.updatedAt,
      activeFilters: state.filters,
      rows: getFilteredPrograms()
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "admissions-360-report.json";
    link.click();
    URL.revokeObjectURL(url);
  });
}

function renderCharts() {
  renderDonut();
  createLineChart("applicationsChart", data.applicationSeries, {
    stateKey: "applications",
    label: "Динамика поданных заявлений по месяцам",
    units: { current: "заявлений", previous: "заявлений" },
    legend: [
      { label: "Текущий год", className: "current" },
      { label: "Ориентир", className: "previous" }
    ],
    lines: [
      { key: "current", className: "current", directLabel: false },
      { key: "previous", className: "previous", directLabel: false }
    ]
  });
  createLineChart("paymentsChart", data.paymentSeries, {
    stateKey: "payments",
    label: "Динамика оборота и договоров по месяцам",
    units: { turnover: "млн ₽", turnoverPlan: "млн ₽" },
    legend: [
      { label: "Фактический оборот", className: "turnover" },
      { label: "Плановый оборот", className: "previous" }
    ],
    lines: [
      { key: "turnover", className: "turnover", directLabel: false },
      { key: "turnoverPlan", className: "previous", directLabel: false }
    ]
  });
  renderChartSummary("applications");
  renderChartSummary("payments");
}

function render() {
  renderSourceHealth();
  renderMetrics();
  renderTable();
  renderRecommendations();
  renderProgramDetail();
}

document.getElementById("pageSize").addEventListener("change", renderTable);
document.getElementById("showAllRecommendations").addEventListener("click", () => {
  document.querySelector(".recommendations").scrollIntoView({ behavior: "smooth", block: "start" });
});
document.querySelectorAll("[data-summary]").forEach((button) => {
  button.addEventListener("click", () => {
    state.summaryMode = button.dataset.summary;
    renderRecommendations();
  });
});
document.getElementById("applicationsRange").addEventListener("input", (event) => {
  state.charts.applications = Number(event.target.value);
  renderCharts();
});
document.getElementById("paymentsRange").addEventListener("input", (event) => {
  state.charts.payments = Number(event.target.value);
  renderCharts();
});

setupFilters();
setupColumnPanel();
setupExport();
renderCharts();
render();
