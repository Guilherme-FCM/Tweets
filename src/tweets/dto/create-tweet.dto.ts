import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTweetDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
