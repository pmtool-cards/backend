import { IsNotEmpty, Min, MinLength } from 'class-validator';

export class CardDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly title: string;

  readonly description?: string;

  @IsNotEmpty()
  @Min(1)
  readonly columnId: number;

  @IsNotEmpty()
  @Min(0)
  readonly order: number;
}
