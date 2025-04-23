export interface ApiData {
  id: number;
  token: string;
  category: "CATEGORY_A" | "CATEGORY_B" | "CATEGORY_C";
  description?: string;
  created_at?: Date;
  expiration_date?: Date;
  access_level?: string;
  company_name: "COMPANY_X" | "COMPANY_Y" | "COMPANY_Z";
}
