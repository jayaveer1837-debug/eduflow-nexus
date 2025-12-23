import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const mongoUri = Deno.env.get('MONGODB_URI');
  
  if (!mongoUri) {
    console.error('MONGODB_URI not configured');
    return new Response(
      JSON.stringify({ error: 'MongoDB connection not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  let client: MongoClient | null = null;

  try {
    const { action, collection, data, query } = await req.json();
    
    console.log(`MongoDB action: ${action}, collection: ${collection}`);

    // Connect to MongoDB
    client = new MongoClient();
    await client.connect(mongoUri);
    
    const db = client.database(); // Uses database from connection string
    const coll = db.collection(collection);

    let result;

    switch (action) {
      case 'insert':
        result = await coll.insertOne(data);
        console.log('Insert result:', result);
        break;
      
      case 'insertMany':
        result = await coll.insertMany(data);
        console.log('InsertMany result:', result);
        break;
      
      case 'find':
        result = await coll.find(query || {}).toArray();
        console.log(`Found ${result.length} documents`);
        break;
      
      case 'findOne':
        result = await coll.findOne(query || {});
        console.log('FindOne result:', result ? 'found' : 'not found');
        break;
      
      case 'update':
        result = await coll.updateOne(query, { $set: data });
        console.log('Update result:', result);
        break;
      
      case 'updateMany':
        result = await coll.updateMany(query, { $set: data });
        console.log('UpdateMany result:', result);
        break;
      
      case 'delete':
        result = await coll.deleteOne(query);
        console.log('Delete result:', result);
        break;
      
      case 'deleteMany':
        result = await coll.deleteMany(query);
        console.log('DeleteMany result:', result);
        break;
      
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action. Use: insert, insertMany, find, findOne, update, updateMany, delete, deleteMany' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    return new Response(
      JSON.stringify({ success: true, result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('MongoDB error:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } finally {
    if (client) {
      client.close();
    }
  }
});
