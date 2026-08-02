const INTERVIEW_STATUS = Object.freeze({
  SCHEDULED: "SCHEDULED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED"
});

const COMPANY_TIERS = Object.freeze({
  TIER_1: "Tier 1 (FAANG / Top Product)",
  TIER_2: "Tier 2 (High-Growth Startups)",
  TIER_3: "Tier 3 (Service / Enterprise Standard)"
});

export default {
  INTERVIEW_STATUS,
  COMPANY_TIERS
};
export { INTERVIEW_STATUS, COMPANY_TIERS };