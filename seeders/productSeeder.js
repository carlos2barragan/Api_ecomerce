import Product from "../models/Product.js";

async function productSeeder() {
  await Product.create({
    _id: "66580699c0e236433e7de55e",
    name: "Selección Colombia 24",
    price: 350000,
    category: "6657fecf41bac694f2713951",
    image:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/5705e3e7fbd54c268694ab3b8e3f6447_9366/Camiseta_Local_Seleccion_Colombia_24_Amarillo_IP8279_01_laydown.jpg",
  });
  await Product.create({
    _id: "66580699c0e236433e7de561",
    name: "Selección Argentina 24",
    price: 350000,
    category: "6657fecf41bac694f2713951",
    image:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/44536d67ee3e42e19e90922328d6a105_9366/Camiseta_Local_Seleccion_Argentina_24_Blanco_IP8409_01_laydown.jpg",
  });
  await Product.create({
    _id: "66580699c0e236433e7de563",
    name: "Samba OG",
    price: "590000",
    category: "6657ff0c09ad505820b78a24",
    image:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b067d21288bc43ec8298a8bf01180400_9366/Tenis_Samba_OG_Blanco_B75806_04_standard.jpg",
  });
  await Product.create({
    _id: "66580699c0e236433e7de565",
    name: "Campus 00s",
    price: 480000,
    category: "6657ff0c09ad505820b78a24",
    image:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/26f1751511384979b29aafaa00e57c81_9366/Tenis_Campus_00s_Negro_HP6396_04_standard.jpg",
  });
  await Product.create({
    _id: "66580699c0e236433e7de567",
    name: "D.O.N Issue 5",
    price: 440000,
    category: "6658000f0140412eb9a29f9d",
    image:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b6e6d6c5c91c42e9a2e953ec17c2d42e_9366/Tenis_de_Basquet_D.O.N_Issue_5_Blanco_IE7799_04_standard.jpg",
  });
  await Product.create({
    _id: "66580699c0e236433e7de569",
    name: "Balón All Court 3.0",
    price: 190000,
    category: "6658000f0140412eb9a29f9d",
    image:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/34946e215e7f46b7a4ebae420162a990_9366/Balon_All_Court_3.0_Naranja_HM4975_02_standard_hover.jpg",
  });

  console.log("[Seeder] Products created");
  process.exit();
}

productSeeder();
