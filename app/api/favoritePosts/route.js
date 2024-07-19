import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '../authOptions/route';

export async function GET() {
  const { NEXT_PUBLIC_MONGODB_ID_FAVORITES } = process.env;

  if (!NEXT_PUBLIC_MONGODB_ID_FAVORITES) {
    return new Response('Missing environment variable', { status: 500 });
  }

  const url = `${process.env.NEXT_PUBLIC_MONGODB_DATA_API_URL_FAVORITES}/action/find`;

  const session = await getServerSession(authOptions);
  const favoritedByUser = session?.user?.email;

  const body = JSON.stringify({
    dataSource: 'Cluster0',
    database: 'test',
    collection: 'favorites',
    filter: { favoritedByUser },
  });

  try {
    const config = {
      method: 'post',
      url,
      data: body,
      headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_MONGODB_ID_FAVORITES}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await axios(config);
    return new Response(JSON.stringify(response.data.documents), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: error.response?.status || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(req) {
  const { NEXT_PUBLIC_MONGODB_ID_FAVORITES } = process.env;

  if (!NEXT_PUBLIC_MONGODB_ID_FAVORITES) {
    return new Response('Missing environment variable', { status: 500 });
  }

  const url = `${process.env.NEXT_PUBLIC_MONGODB_DATA_API_URL_FAVORITES}/action/deleteOne`;

  const { _id } = await req.json();

  const body = JSON.stringify({
    dataSource: 'Cluster0',
    database: 'test',
    collection: 'favorites',
    filter: { _id: { $oid: _id } },
  });

  try {
    const config = {
      method: 'post',
      url,
      data: body,
      headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_MONGODB_ID_FAVORITES}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await axios(config);
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting data:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete data' }), {
      status: error.response?.status || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
export async function POST(req) {
  const { NEXT_PUBLIC_MONGODB_ID_FAVORITES } = process.env;

  if (!NEXT_PUBLIC_MONGODB_ID_FAVORITES) {
    return new Response('Missing environment variable', { status: 500 });
  }

  const url = `${process.env.NEXT_PUBLIC_MONGODB_DATA_API_URL_FAVORITES}/action/insertOne`;

  const data = await req.json();

  const body = JSON.stringify({
    dataSource: 'Cluster0',
    database: 'test',
    collection: 'favorites',
    document: data,
  });

  try {
    const config = {
      method: 'post',
      url,
      data: body,
      headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_MONGODB_ID_FAVORITES}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await axios(config);
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating data:', error);
    return new Response(JSON.stringify({ error: 'Failed to create data' }), {
      status: error.response?.status || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
// import { favoritesConnection } from '../../../lib/MongoDBConnections'; // Adjust the import path accordingly
// import { Favorite } from '../models/FavoritePosts';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../authOptions/route';

// // Ensure the connection is ready before using it
// async function ensureConnection() {
//   if (!favoritesConnection.readyState) {
//     await favoritesConnection.openUri(
//       process.env.NEXT_PUBLIC_MONGODB_FAVORITES
//     );
//   }
// }

// export async function POST(req) {
//   await ensureConnection();

//   const data = await req.json();
//   const FavoriteModel = favoritesConnection.model('Favorite', Favorite.schema);
//   const FavoritePost = await FavoriteModel.create({ ...data });

//   return new Response(JSON.stringify(FavoritePost), { status: 201 });
// }

// export async function DELETE(req) {
//   await ensureConnection();

//   const data = await req.json();
//   const FavoriteModel = favoritesConnection.model('Favorite', Favorite.schema);
//   const deleteFavoritePost = await FavoriteModel.findByIdAndDelete(data?._id);

//   return new Response(JSON.stringify(deleteFavoritePost), { status: 200 });
// }

// export async function GET() {
//   await ensureConnection();

//   const session = await getServerSession(authOptions);
//   const favoritedByUser = session?.user?.email;

//   const FavoriteModel = favoritesConnection.model('Favorite', Favorite.schema);
//   const favoritePosts = await FavoriteModel.find({ favoritedByUser });

//   return new Response(JSON.stringify(favoritePosts), { status: 200 });
// }

// import mongoose from 'mongoose';
// import { Favorite } from '../models/FavoritePosts';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../authOptions/route';

// export async function POST(req) {
//   await mongoose.createConnection(process.env.NEXT_PUBLIC_MONGODB);
//   const data = await req.json();
//   //   console.log('data from favoritePosts', data);
//   const FavoritePost = await Favorite.create({ ...data });
//   return Response.json(FavoritePost);
// }

// export async function DELETE(req) {
//   await mongoose.createConnection(process.env.NEXT_PUBLIC_MONGODB);
//   const data = await req.json();
//   const deleteFavoritePost = await Favorite.findByIdAndDelete(data?._id);
//   return Response.json(deleteFavoritePost);
// }

// export async function GET() {
//   await mongoose.createConnection(process.env.NEXT_PUBLIC_MONGODB);
//   const session = await getServerSession(authOptions);
//   const favoritedByUser = session?.user?.email;
//   // console.log('favoritedByUser', favoritedByUser);
//   const favoritePosts = await Favorite.find({ favoritedByUser });
//   // console.log('favoritePosts', favoritePosts);
//   return Response.json(favoritePosts);
// }
