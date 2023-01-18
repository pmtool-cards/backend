import { IsNotEmpty, MinLength } from 'class-validator';

export class BoardDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly title: string;
}
