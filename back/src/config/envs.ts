import "dotenv/config";

export const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : 3000;

export const DBPORT: number = process.env.DBPORT
  ? parseInt(process.env.DBPORT, 10)
  : 5432;

export const DBUSERNAME: string | undefined = process.env.DBUSERNAME;

export const DBPASSWORD: string | undefined = process.env.DBPASSWORD;

export const DBNAME: string | undefined = process.env.DBNAME;

export const DBTYPE: string | undefined = process.env.DBTYPE;

export const DBHOST: string | undefined = process.env.DBHOST;

export const DBSYNCHRONIZE: boolean | undefined = process.env.DBSYNCHRONIZE
  ? process.env.DBSYNCHRONIZE === "true"
  : true;

export const DBLOGGING: boolean | undefined = process.env.DBLOGGING
  ? process.env.DBLOGGING === "true"
  : true;
