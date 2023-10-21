import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false, timestamps: true })
class Estimate {
  @Prop()
  hallTariff: number;

  @Prop()
  furnitureUtilityCharges: number;

  @Prop()
  maintenanceCharges: number;

  @Prop()
  applicableTaxes: number;

  @Prop()
  additionalGuestRoomTariff: number;

  @Prop()
  electricityTariff: number;

  @Prop()
  securityTariff: number;

  @Prop()
  generatorTariff: number;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export default Estimate;
