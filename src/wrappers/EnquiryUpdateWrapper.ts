// Create a file, e.g., enquiry.dto.ts
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Optional } from '@nestjs/common';
import Estimate from '../modules/FunctionHallModule/Schemas/SubSchemas/Estimate';
import { PartOfDayEnum } from '../enums/PartOfDayEnum';

export class EnquiryUpdateWrapper {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsMongoId()
  functionHall: string;

  @IsNotEmpty()
  fromDate: Date;

  @IsNotEmpty()
  toDate: Date;

  @IsNotEmpty()
  @IsMongoId()
  primaryReference: string;

  @IsString()
  secondaryReference: string;

  @Optional()
  @IsArray()
  estimates?: Estimate[];

  @IsNotEmpty()
  @IsNumber()
  primaryContactNumber: number;

  @IsNotEmpty()
  @IsString()
  primaryContactName: string;

  secondaryContactNumber: number;

  @IsNotEmpty()
  pax: number;

  partOfDay: PartOfDayEnum;

  @IsString()
  secondaryContactName: string;

  @IsNotEmpty()
  @IsMongoId()
  enquiryType: string;
}
