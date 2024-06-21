import Category from "../models/Category.js";

async function categorySeeder() {
  await Category.create({
    _id: "6657fecf41bac694f2713951",
    name: "Fútbol",
  });
  await Category.create({
    _id: "6657ff0c09ad505820b78a24",
    name: "Calzado",
  });
  await Category.create({
    _id: "6658000f0140412eb9a29f9d",
    name: "Basketball",
  });

  console.log("[Seeder] Categories created");
  process.exit();
}

categorySeeder();
