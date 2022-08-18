import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateTweetDto } from './create-tweet.dto';

export class UpdateTweetDto extends PartialType(CreateTweetDto) {}
