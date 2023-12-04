import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance } from './Schemas/Attendance';
import { AttendanceCreateUpdateWrapper } from '../../wrappers/AttendanceCreateUpdateWrapper';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name)
    private Attendances: Model<Attendance>,
  ) {}

  async createAttendance(
    requestData: AttendanceCreateUpdateWrapper,
  ): Promise<Attendance> {
    try {
      return await this.Attendances.create(requestData);
    } catch (error) {
      throw new Error('Failed to create Purchase Request');
    }
  }
}
