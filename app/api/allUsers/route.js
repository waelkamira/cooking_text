import { usersConnection } from '../../../lib/MongoDBConnections'; // Adjust the import path accordingly
import { User } from '../models/UserModel';

// Ensure the connection is ready before using it
async function ensureConnection() {
  if (!usersConnection.readyState) {
    await usersConnection.openUri(process.env.NEXT_PUBLIC_MONGODB);
  }
}

export async function GET() {
  await ensureConnection();

  // Using the existing connection to perform the operation
  const UserModel = usersConnection.model('User', User.schema);
  const users = await UserModel.find();

  return new Response(JSON.stringify(users), { status: 200 });
}

export async function DELETE(req) {
  await ensureConnection();

  const { email } = await req.json();

  // Using the existing connection to perform the operation
  const UserModel = usersConnection.model('User', User.schema);
  const deleteUser = await UserModel.findOneAndDelete({ email });

  return new Response(JSON.stringify(deleteUser), { status: 200 });
}

// import mongoose from 'mongoose';
// import { User } from '../models/UserModel';

// export async function GET() {
//   await mongoose.createConnection(process.env.NEXT_PUBLIC_MONGODB);
//   const users = await User.find();
//   return Response.json(users);
// }

// export async function DELETE(req) {
//   await mongoose.createConnection(process.env.NEXT_PUBLIC_MONGODB);
//   const { email } = await req.json();
//   const deleteUser = await User.findOneAndDelete({ email });
//   return Response.json(deleteUser);
// }
