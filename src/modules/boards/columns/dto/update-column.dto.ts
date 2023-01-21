import { IsNotEmpty, Min, MinLength } from 'class-validator';

export class UpdateColumnDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly title: string;

  @IsNotEmpty()
  @Min(0)
  readonly order: number;
}
