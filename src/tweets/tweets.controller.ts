import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Post()
  create(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetsService.create(createTweetDto);
  }

  @Get()
  findAll() {
    return this.tweetsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const tweet = await this.tweetsService.findOne(+id);
    if (!tweet) return { error: 'Tweet not found.' };
    return tweet;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTweetDto: UpdateTweetDto) {
    return this.tweetsService.update(+id, updateTweetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tweetsService.remove(+id);
  }
}
