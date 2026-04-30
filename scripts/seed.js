require("dotenv").config();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

const uri = process.env.MONGO;

const client = new MongoClient(uri);

async function seed() {
  try {
    await client.connect();

    const db = client.db();
    const users = db.collection("users");

    console.log("🌱 Seeding database...");

    await users.deleteMany({});

    const hashedPassword = await bcrypt.hash("password123", 10);

    await users.insertMany([
      {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "ADMIN",
        createdAt: new Date(),
      },
      {
        name: "Test User 1",
        email: "user1@example.com",
        password: hashedPassword,
        role: "USER",
        createdAt: new Date(),
      },
      {
        name: "Test User 2",
        email: "user2@example.com",
        password: hashedPassword,
        role: "USER",
      },
    ]);

    console.log("✅ Seeding complete");
  } catch (err) {
    console.error("❌ Error seeding:", err);
  } finally {
    await client.close();
  }
}

seed();