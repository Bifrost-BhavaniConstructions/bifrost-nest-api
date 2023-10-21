// Create a file, e.g., enquiry.dto.ts
import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Optional } from '@nestjs/common';
import Estimate from '../modules/FunctionHallModule/Schemas/SubSchemas/Estimate';

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
  @IsDate()
  fromDate: Date;

  @IsDate()
  toDate: Date;

  @IsNotEmpty()
  @IsMongoId()
  primaryReference: string;

  @IsNotEmpty()
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

  @IsNumber()
  secondaryContactNumber: number;

  @IsNotEmpty()
  @IsString()
  secondaryContactName: string;

  @IsNotEmpty()
  @IsMongoId()
  enquiryType: string;
}
