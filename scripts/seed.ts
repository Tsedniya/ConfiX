import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User";

const users = [
  {
    name: "Super Admin",
    email: "admin@conference.com",
    password: "password123",
    role: "admin" as const,
    status: "active" as const,
  },
  {
    name: "John Organizer",
    email: "organizer@conference.com",
    password: "password123",
    role: "organizer" as const,
    status: "active" as const,
  },
  {
    name: "Dr. Sarah Chen",
    email: "sarah.speaker@conference.com",
    password: "password123",
    role: "speaker" as const,
    status: "active" as const,
  },
  {
    name: "Michael Roberts",
    email: "michael.speaker@conference.com",
    password: "password123",
    role: "speaker" as const,
    status: "pending" as const,
  },
  {
    name: "Alice Johnson",
    email: "alice.attendee@gmail.com",
    password: "password123",
    role: "attendee" as const,
    status: "active" as const,
  },
  {
    name: "David Kim",
    email: "david.attendee@gmail.com",
    password: "password123",
    role: "attendee" as const,
    status: "active" as const,
  },
];

const seedDatabase = async () => {
  try {
    const mongoUri =
      process.env.MONGODB_URI || process.env.MONGO;

    if (!mongoUri) {
      throw new Error(
        "Please define MONGODB_URI or MONGO in your .env file."
      );
    }

    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    const shouldReset = process.argv.includes("--reset");

    if (shouldReset) {
      await User.deleteMany({});
      console.log("🔄 Cleared existing users");
    }

    for (const userData of users) {
      const existingUser = await User.findOne({
        email: userData.email,
      });

      if (existingUser) {
        console.log(
          `⚠️ User already exists: ${userData.email}`
        );
        continue;
      }

      const hashedPassword = await bcrypt.hash(
        userData.password,
        10
      );

      await User.create({
        ...userData,
        password: hashedPassword,
      });

      console.log(
        `✅ Created ${userData.role}: ${userData.email}`
      );
    }

    console.log("\n🎉 Seeding completed successfully!");
    console.log("\nLogin Credentials:");
    console.log("-------------------");
    console.log(
      "Admin      → admin@conference.com / password123"
    );
    console.log(
      "Organizer  → organizer@conference.com / password123"
    );
    console.log(
      "Speaker    → sarah.speaker@conference.com / password123"
    );
    console.log(
      "Attendee   → alice.attendee@gmail.com / password123"
    );
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await mongoose.disconnect();
  }
};

seedDatabase();