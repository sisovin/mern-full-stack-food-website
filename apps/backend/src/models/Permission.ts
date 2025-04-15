import mongoose, { Schema, Document } from 'mongoose';

interface IPermission extends Document {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const PermissionSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Permission = mongoose.model<IPermission>('Permission', PermissionSchema);

export default Permission;
