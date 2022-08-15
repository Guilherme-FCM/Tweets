import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Response } from 'express';

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
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const tweet = await this.tweetsService.findOne(+id);
    if (!tweet)
      res.status(HttpStatus.NOT_FOUND).json({ error: 'Tweet not found.' });
    return tweet;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTweetDto: UpdateTweetDto,
    @Res() res: Response,
  ) {
    const [result] = await this.tweetsService.update(+id, updateTweetDto);
    if (result === 0)
      res.status(HttpStatus.NOT_FOUND).json({ error: 'Tweet not found.' });
    return this.tweetsService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.tweetsService.remove(+id);
    if (result === 0)
      res.status(HttpStatus.NOT_FOUND).json({ error: 'Tweet not found.' });
    return { message: 'success.' };
  }
}
