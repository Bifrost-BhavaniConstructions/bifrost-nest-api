import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class VendorTypeData {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Number, required: true })
  charge: number;
}
@Schema({ _id: false })
class VendorData {
  @Prop([{ type: VendorTypeData }])
  items: VendorTypeData[];
}

export default VendorData;
