export interface ActivityRequestDto {
  subject: string;
  type: string;
  description: string | null;
  durationMinutes: number;
  responsibleName: string;
  partnerId: number;
}
