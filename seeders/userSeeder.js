import User from "../models/User.js";

async function userSeeder() {
  await User.create({
    firstname: "Leia",
    lastname: "Organa",
    email: "leia@starwars.com",
    password: "123123123",
  });
  await User.create({
    firstname: "Luke",
    lastname: "Skywalker",
    email: "luke@starwars.com",
    password: "123123123",
  });
  await User.create({
    firstname: "Han",
    lastname: "Solo",
    email: "han@starwars.com",
    password: "123123123",
  });
  console.log("[Seeder] Users created");
  process.exit();
}

userSeeder();
