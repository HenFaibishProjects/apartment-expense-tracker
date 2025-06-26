export class CreateExpenseDto {
  apartmentId: number;
  category: string;
  description: string;
  estimatedCost: number;
  actualCost: number;
  paid: boolean;
  phase?: string;
}
