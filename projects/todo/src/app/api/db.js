import mysql from "serverless-mysql";

const db = mysql({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

export default async function excuteQuery({ query, values }) {
  try {
    const res = await db.query(query, values);
    await db.end();
    return res;
  } catch (error) {
    console.error("[16] ERROR >> ", error);
    return { error };
  }
}
