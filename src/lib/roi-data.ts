export interface BenchmarkData {
  company: string;
  industry: string;
  metric: string;
  value: string;
  context: string;
}

export const benchmarks: BenchmarkData[] = [
  {
    company: "Klarna",
    industry: "FinTech",
    metric: "Ticket automation rate",
    value: "66%",
    context: "AI handles 2/3 of customer service chats, equivalent to 700 FTEs",
  },
  {
    company: "Klarna",
    industry: "FinTech",
    metric: "Resolution time reduction",
    value: "82%",
    context: "11 minutes down to 2 minutes average resolution",
  },
  {
    company: "Klarna",
    industry: "FinTech",
    metric: "Profit improvement",
    value: "$40M",
    context: "Estimated annual profit improvement from AI customer service",
  },
  {
    company: "Morgan Stanley",
    industry: "Financial Services",
    metric: "Advisor adoption",
    value: "98%",
    context: "98% of wealth management advisor teams use AI daily",
  },
  {
    company: "Morgan Stanley",
    industry: "Financial Services",
    metric: "Query speed improvement",
    value: "99%+",
    context: "Research queries: 30+ minutes reduced to seconds",
  },
  {
    company: "Stripe",
    industry: "Payments",
    metric: "Invoice resolution speed",
    value: "35%",
    context: "35% faster invoice resolution with AI agents",
  },
  {
    company: "Indeed",
    industry: "HR/Recruiting",
    metric: "Application boost",
    value: "20%",
    context: "20% increase in job applications through AI recommendations",
  },
  {
    company: "Lowe's",
    industry: "Retail",
    metric: "Tagging accuracy",
    value: "20%",
    context: "20% improvement in product tagging with 60% error reduction via fine-tuning",
  },
  {
    company: "BBVA",
    industry: "Banking",
    metric: "Custom GPTs created",
    value: "2,900+",
    context: "Employees built 2,900+ custom GPTs in 5 months",
  },
  {
    company: "San Antonio Spurs",
    industry: "Sports",
    metric: "AI fluency",
    value: "14% → 85%",
    context: "AI fluency increased through workflow-integrated training",
  },
];

export const generalBenchmarks = {
  timeSavedPerDay: { min: 40, max: 60, unit: "minutes" },
  productivityGain: { value: 10, unit: "%" },
  positiveROI: { value: 75, unit: "% of enterprises" },
  negativeROI: { value: 5, unit: "% of enterprises" },
  roiTimeline: { value: 12, unit: "months" },
  enterpriseMessageGrowth: { value: 8, unit: "x YoY" },
};

export interface ROIInputs {
  employees: number;
  avgSalary: number;
  targetAIUsers: number;
  useCase: string;
  supportTicketsPerMonth: number;
  developerCount: number;
  chatgptEnterpriseCostPerSeat: number;
}

export const defaultInputs: ROIInputs = {
  employees: 1000,
  avgSalary: 100000,
  targetAIUsers: 500,
  useCase: "workforce",
  supportTicketsPerMonth: 10000,
  developerCount: 100,
  chatgptEnterpriseCostPerSeat: 60,
};

export interface ROIResults {
  annualTimeSavedHours: number;
  annualProductivityValue: number;
  annualCost: number;
  netAnnualValue: number;
  roiPercentage: number;
  monthsToBreakeven: number;
  perEmployeeValue: number;
  supportSavings: number;
  devProductivitySavings: number;
  fiveYearValue: number;
}

export function calculateROI(inputs: ROIInputs): ROIResults {
  const hourlyRate = inputs.avgSalary / 2080; // 2080 working hours/year
  const workingDaysPerYear = 260;

  // Workforce empowerment savings (40-60 min/day saved per user)
  const avgMinutesSavedPerDay = 50;
  const annualTimeSavedHours =
    (inputs.targetAIUsers * avgMinutesSavedPerDay * workingDaysPerYear) / 60;
  const annualProductivityValue = annualTimeSavedHours * hourlyRate;

  // Support automation savings (if applicable)
  let supportSavings = 0;
  if (inputs.useCase === "support" || inputs.useCase === "all") {
    const ticketsAutomated = inputs.supportTicketsPerMonth * 0.66 * 12; // Klarna benchmark
    const costPerTicket = 8; // industry average
    const costPerAITicket = 1.5;
    supportSavings = ticketsAutomated * (costPerTicket - costPerAITicket);
  }

  // Developer productivity savings (if applicable)
  let devProductivitySavings = 0;
  if (inputs.useCase === "development" || inputs.useCase === "all") {
    // Developers save ~1.5 hours/day with Codex
    const devHoursSaved = inputs.developerCount * 1.5 * workingDaysPerYear;
    const devHourlyRate = (inputs.avgSalary * 1.3) / 2080; // devs typically higher comp
    devProductivitySavings = devHoursSaved * devHourlyRate;
  }

  // Costs
  const annualCost =
    inputs.targetAIUsers * inputs.chatgptEnterpriseCostPerSeat * 12;

  // Net value
  const totalValue =
    annualProductivityValue + supportSavings + devProductivitySavings;
  const netAnnualValue = totalValue - annualCost;
  const roiPercentage = annualCost > 0 ? (netAnnualValue / annualCost) * 100 : 0;
  const monthsToBreakeven =
    totalValue > 0 ? Math.ceil((annualCost / totalValue) * 12) : 99;
  const perEmployeeValue =
    inputs.targetAIUsers > 0 ? netAnnualValue / inputs.targetAIUsers : 0;

  // 5-year projection (with 15% annual improvement compounding)
  let fiveYearValue = 0;
  for (let year = 0; year < 5; year++) {
    fiveYearValue += (totalValue * Math.pow(1.15, year)) - annualCost;
  }

  return {
    annualTimeSavedHours: Math.round(annualTimeSavedHours),
    annualProductivityValue: Math.round(annualProductivityValue),
    annualCost: Math.round(annualCost),
    netAnnualValue: Math.round(netAnnualValue),
    roiPercentage: Math.round(roiPercentage),
    monthsToBreakeven,
    perEmployeeValue: Math.round(perEmployeeValue),
    supportSavings: Math.round(supportSavings),
    devProductivitySavings: Math.round(devProductivitySavings),
    fiveYearValue: Math.round(fiveYearValue),
  };
}
