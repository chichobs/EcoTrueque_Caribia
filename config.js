const APPWRITE_ENDPOINT = 'https://nyc.cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = '69cf25d0a03e524341de';

const client = new Appwrite.Client();
const account = new Appwrite.Account(client);
const databases = new Appwrite.Databases(client);

client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

const DATABASE_ID = 'database-69cf2810001cabc4f4ba';
const COLLECTION_USUARIOS = 'usuarios';
const COLLECTION_ENTREGAS = 'entregas';
const COLLECTION_PRODUCTOS = 'productos';
