import { connect } from "mongoose";
const dbConnect = async () => {
  try {
    const mongoDbConnection = await connect(
      "mongodb+srv://chiranjibikusari0_db_user:QpLaiRL9xL8YHm2p@cluster0.hwcm8pa.mongodb.net/?appName=Cluster0"
    );
    console.log(`database connected :${mongoDbConnection.connection.host}`);
  } catch (error) {
    console.log(`database connection failed ${error}`);
    process.exit(1);
  }
};
export default dbConnect;
