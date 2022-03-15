export interface Page {
  route: string;
  text: string;
}

export const pages: Page[] = [
  { route: "/", text: "ホーム" },
  { route: "/01", text: "01" },
  { route: "/02", text: "02" },
];
