/**
 * Current membership offers — mirrors the static promotion config shipped in the
 * Airborne booking app (Zuno). These are not exposed via a public API; the app
 * hardcodes them as `isActive` promotions, so we mirror them here. The site only
 * *shows* offers — redemption happens in the app at checkout. Keep this in sync
 * with the app's promotion config when offers change.
 */

export type OfferSlab = { label: string; percentOff: number };

export type Offer = {
  id: string;
  title: string;
  subtitle: string;
  /** Short badge, e.g. "10% off". */
  badge: string;
  detail: string;
  /** Tiered discounts (combination offer only). */
  slabs?: OfferSlab[];
};

export const currentOffers: Offer[] = [
  {
    id: "long-term-10",
    title: "Save 10% on long-term memberships",
    subtitle: "Available on Half-Yearly and Yearly plans.",
    badge: "10% off",
    detail:
      "Save 10% when you choose a Half-Yearly or Yearly membership for any class type.",
  },
  {
    id: "two-plans-together",
    title: "Unlock more value with multiple classes",
    subtitle:
      "Choose 2 or more class types together and unlock additional membership benefits.",
    badge: "Multi-class offer",
    detail:
      "When you enroll in 2 or more different class types together, your combination discount depends on the plan duration you choose:",
    slabs: [
      { label: "Monthly", percentOff: 5 },
      { label: "Quarterly", percentOff: 10 },
      { label: "Half-Yearly", percentOff: 15 },
      { label: "Yearly", percentOff: 20 },
    ],
  },
  {
    id: "free-trial-cross-class",
    title: "Try another class on us",
    subtitle:
      "Buy any membership plan and get 1 free trial session for another class type of your choice.",
    badge: "Free trial session",
    detail:
      "Buy any membership plan, excluding Walk-in / Trial, and unlock 1 free trial session for any other class type of your choice.",
  },
];
