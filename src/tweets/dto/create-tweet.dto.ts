import { IsNotEmpty } from 'class-validator';

export class CreateTweetDto {
  @IsNotEmpty()
  content: string;
}
