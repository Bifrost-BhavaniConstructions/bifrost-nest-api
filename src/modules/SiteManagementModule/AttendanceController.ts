import { Body, Controller, Post } from '@nestjs/common';
import { AttendanceService } from './AttendanceService';
import { AttendanceCreateUpdateWrapper } from '../../wrappers/AttendanceCreateUpdateWrapper';
import { Attendance } from './Schemas/Attendance';

@Controller('/site-management/attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('/')
  async createAttendance(
    @Body() requestData: AttendanceCreateUpdateWrapper,
  ): Promise<Attendance> {
    return this.attendanceService.createAttendance(requestData);
  }
}
