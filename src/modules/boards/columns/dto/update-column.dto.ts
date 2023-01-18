import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateColumnDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly title: string;
}
