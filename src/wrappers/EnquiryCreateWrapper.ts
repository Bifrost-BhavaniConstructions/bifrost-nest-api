// Create a file, e.g., enquiry.dto.ts
import { IsNotEmpty, IsString, IsArray, IsMongoId } from 'class-validator';
import Estimate from '../modules/FunctionHallModule/Schemas/SubSchemas/Estimate';
import { PartOfDayEnum } from '../enums/PartOfDayEnum';

export class EnquiryCreateWrapper {
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

  @IsArray()
  estimates: Estimate[];

  @IsNotEmpty()
  @IsMongoId()
  primaryReference: string;

  @IsString()
  secondaryReference: string;

  @IsNotEmpty()
  primaryContactNumber: number;

  @IsNotEmpty()
  pax: number;

  partOfDay: PartOfDayEnum;

  @IsNotEmpty()
  @IsString()
  primaryContactName: string;

  secondaryContactNumber: number;

  @IsString()
  secondaryContactName: string;

  @IsNotEmpty()
  @IsMongoId()
  enquiryType: string;
}
