import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
class DriverAllowanceData {
  @Prop()
  dayShift: number;

  @Prop()
  nightShift: number;

  @Prop()
  doubleShift: number;
}
@Schema({ _id: false })
class DriverData {
  @Prop()
  salary: number;

  @Prop({ type: DriverAllowanceData })
  allowance: DriverAllowanceData;

  @Prop({ type: String })
  license: string;

  @Prop({ type: Number })
  idlePay?: number;
}

export default DriverData;
