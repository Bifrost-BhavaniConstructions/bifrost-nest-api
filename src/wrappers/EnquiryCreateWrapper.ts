// Create a file, e.g., enquiry.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsNumber,
  IsArray,
  IsMongoId,
} from 'class-validator';
import Estimate from '../modules/FunctionHallModule/Schemas/SubSchemas/Estimate';

export class EnquiryCreateWrapper {
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

  @IsArray()
  estimates: Estimate[];

  @IsNotEmpty()
  @IsMongoId()
  primaryReference: string;

  @IsNotEmpty()
  @IsString()
  secondaryReference: string;

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
