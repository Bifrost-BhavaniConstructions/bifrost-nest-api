import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class GeneratorSession {
  //data

  @Prop({ type: Date, required: true })
  from: Date;

  @Prop({ type: Date, required: false })
  to: Date;
}

@Schema({ _id: false })
export class GeneratorStatus {
  //data

  @Prop({ type: String, required: true })
  name: string;

  @Prop([{ type: GeneratorSession, required: true }])
  sessions: GeneratorSession[];
}
