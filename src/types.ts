export interface Word {
  id: string;
  text: string;
  meaning: string;
  created_at: Date;
  last_date: Date | null;
  step: number | null;
}
