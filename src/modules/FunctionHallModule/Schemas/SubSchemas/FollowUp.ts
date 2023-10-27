import { Prop, Schema } from '@nestjs/mongoose';
import { User } from '../../../UserModule/User';
import { SchemaTypes } from 'mongoose';

@Schema({ _id: false, timestamps: true })
class FollowUp {
  @Prop()
  remark: string;

  @Prop()
  datetime: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export default FollowUp;
