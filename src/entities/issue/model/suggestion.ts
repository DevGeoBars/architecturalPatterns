import type { SuggestionDto } from '@/shared/api/endpoints/issue';

export class Suggestion {
  id: number;

  number: number;

  subject: string;

  constructor(dto: SuggestionDto) {
    this.id = Number(dto.Id);
    this.number = Number(dto.Number);
    this.subject = dto.Subject;
  }
}
