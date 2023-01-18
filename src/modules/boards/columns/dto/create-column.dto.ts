import { IsNotEmpty, Min, MinLength } from 'class-validator';

export class CreateColumnDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly title: string;

  @IsNotEmpty()
  @Min(1)
  readonly boardId: number;
}
