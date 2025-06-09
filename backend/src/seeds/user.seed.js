import { config } from "dotenv";
config();

import { connectDB } from "../lib/db.js";
import User from "../models/user.models.js";

// Debug: Check if MONGODB_URI is loaded
console.log("MONGODB_URI:", process.env.MONGODB_URI);

const seedUsers = [
    {
        email: "isaac.newton@science.com",
        fullName: "Isaac Newton",
        password: "123456",
        profilePic: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Portrait_of_Sir_Isaac_Newton%2C_1689.jpg",
    },
    {
        email: "albert.einstein@science.com",
        fullName: "Albert Einstein",
        password: "123456",
        profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqvm3msNDB0rSc0bvD99xTAaCaWJxm8EVrj9geZhVFJfvrRG8R",
    },
    {
        email: "marie.curie@science.com",
        fullName: "Marie Curie",
        password: "123456",
        profilePic: "https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ2I9ieDiBlwmmy42coJrwRiIL1wX43R2e3-v20lmeRIZByG8OaFgqRVG2CdkhqpXZS",
    },
    {
        email: "nikola.tesla@science.com",
        fullName: "Nikola Tesla",
        password: "123456",
        profilePic: "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQEa5vIB5rge7TBnRlfcRE3aenGyBmTuIVJFOxEFkEphZVxcaxDQkImgUzPPsBEAy7N",
    },
    {
        email: "galileo.galilei@science.com",
        fullName: "Galileo Galilei",
        password: "123456",
        profilePic: "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQEa5vIB5rge7TBnRlfcRE3aenGyBmTuIVJFOxEFkEphZVxcaxDQkImgUzPPsBEAy7N",
    },
];

const seedDatabase = async () => {
    try {
        await connectDB();
        await User.insertMany(seedUsers);
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

seedDatabase();