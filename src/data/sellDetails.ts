export type WorkflowStepState = "done" | "current" | "pending";

export const workflowSteps: { label: string; state: WorkflowStepState }[] = [
  { label: "Draft", state: "done" },
  { label: "Internal Review", state: "done" },
  { label: "Customer Service Review", state: "done" },
  { label: "Collections Confirmation", state: "current" },
  { label: "e-PMS Receipts Confirmation", state: "pending" },
  { label: "Completed", state: "pending" },
];

export const secondaryTabs = [
  "Sell Details",
  "Payment Plan",
  "Smart Sheet Record",
  "ePMS Receipts",
  "Hold Information",
  "Finance",
  "Comments",
  "Audit",
  "Activities",
  "Documents",
];

export const sellRecord = {
  propertyRef: "Royal Park 1 - A-306",
};

export type FieldValue = {
  label: string;
  value: string;
  unit?: string;
  badge?: { text: string; tone: "green" | "muted" };
};

export const epmsFields: FieldValue[] = [
  { label: "ePMS Resv. No.", value: "8011445" },
  { label: "ePMS Customer Name", value: "Wadeema Ghamran Saeed Salem Alremeithi" },
  { label: "ePMS Price", value: "588,575.00", unit: "AED" },
  { label: "ePMS Parking", value: "0.00", unit: "AED" },
];

export const sellDetailFields: FieldValue[] = [
  { label: "Sell Date", value: "31/10/2024" },
  { label: "Sell Source", value: "In-Direct" },
  { label: "Customer Type", value: "Investor" },
  { label: "Agreement Type", value: "Standard SPA" },
  { label: "Down Payment", value: "0.00", unit: "%" },
  { label: "Commercial Area", value: "574.58", unit: "SQ.FT" },
  { label: "Original Price", value: "1,014,786.00", unit: "AED" },
  { label: "Discount", value: "426,211.00", unit: "AED", badge: { text: "42 %", tone: "green" } },
  { label: "Parking Count", value: "1" },
  { label: "Net Price", value: "588,575.00", unit: "AED" },
  { label: "Extra Discount", value: "0.00", unit: "AED", badge: { text: "0 %", tone: "muted" } },
  { label: "Parking Price", value: "60,000.00", unit: "AED" },
  { label: "Parking Options", value: "Pay Parking On Handover" },
  { label: "Services Price", value: "0.00", unit: "AED" },
  { label: "Billable Services", value: "–" },
  { label: "Interior Color", value: "–" },
  { label: "Interior Arabic Color", value: "–" },
  { label: "Final Price", value: "648,575.00", unit: "AED" },
];

export const specialConditions =
  "This unit is sold as per the standard terms and conditions of the company. Any additional requests from the customer must be documented and approved by the management.";
