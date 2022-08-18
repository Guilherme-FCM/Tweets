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
  async create(@Body() createTweetDto: CreateTweetDto, @Res() res: Response) {
    const tweet = await this.tweetsService.create(createTweetDto);
    return res.status(HttpStatus.CREATED).json(tweet);
  }

  @Get()
  findAll() {
    return this.tweetsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const tweet = await this.tweetsService.findOne(+id);
    if (!tweet)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'Tweet not found.' });
    return res.json(tweet);
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
    return res.json(await this.tweetsService.findOne(+id));
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.tweetsService.remove(+id);
    if (result === 0)
      res.status(HttpStatus.NOT_FOUND).json({ error: 'Tweet not found.' });
    return res.json({ message: 'success.' });
  }
}
