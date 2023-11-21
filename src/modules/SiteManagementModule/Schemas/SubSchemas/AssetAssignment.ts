import { Prop, Schema } from '@nestjs/mongoose';
import { User } from '../../../UserModule/User';

@Schema({ _id: false, timestamps: true })
export class AssetAssignment {
  //data

  @Prop({ type: 'ObjectId', ref: 'User' })
  assignedTo?: User;
}
