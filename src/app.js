
import express from "express";
import ProductManager from "./productManager.js";
const productManager = new ProductManager('./products.json');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Example app listening http://localhost:${PORT}`);
});
/* let productos = [
  {
    id: "234514872813534",
    name: "real madridd",
    price: 100,
    createdAt: 1683242395115,
  },
  {
    id: "456514872813512",
    name: "tigre",
    price: 150,
    createdAt: 1683242395117,
  },
  {
    id: "846514872813578",
    name: "river",
    price: 170,
    createdAt: 1683242395118,
  },
]; */
//INICIO ENDPOINT PRODUCTS
app.get("/products", async (req, res) => {
  const product = await productManager.getProducts()
  if (req.query.limit) {
    const limit = parseInt(req.query.limit)
    const limitProduct = product.slice(0, limit)
      // const result = product.slice(0, limit);
    return res.status(200).json({
      status: "success",
      msg: "producto ",
      data: limitProduct,
    });
  }else{
    return res.status(200).json({
      status: "success",
      msg: "producto ",
      data: product,
    });
  }
});
//Filtra por Id del producto
app.get("/products/:pid", async (req, res) => {
  const id = req.params.pid;
  const product = await productManager.getProductById(parseInt(id));
  if (product) {
    return res.status(200).json({
      status: "success",
      msg: "producto ",
      data: product,
    });
  } else {
    res.status(404).json({ message: `Product with id ${id} not found` });
  }
    // return res.status(200).json({
    //   status: "success",
    //   msg: "producto ",
    //   data: product,
    // });
});
//BORRAR UN PRODUCTO > SI TENGO QUE PASAR EL ID

/* app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  productos = productos.filter((p) => p.id != id);
  return res
    .status(200)
    .json({ status: "success", msg: "producto eliminado", data: {} });
}); */

//CREAR UN PRODUCTO (NO NECESITO PASAR ID)

/* app.post("/products", (req, res) => {
  const producto = req.body;
  producto.id = (Math.random() * 1000000000000000).toFixed(0);
  producto.createdAt = Date.now();
  productos.push(producto);
  return res
    .status(201)
    .json({ status: "success", msg: "producto creado", data: producto });
}); */

//MODIFICAR UN PRODUCTO > SI TENGO QUE PASAR EL ID

/* app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const producto = req.body;
  const indiceEncontrado = productos.findIndex((p) => p.id == id);
  productos[indiceEncontrado] = {
    id: productos[indiceEncontrado].id,
    ...producto,
  };
  return res.status(200).json({
    status: "success",
    msg: "producto modificado",
    data: productos[indiceEncontrado],
  });
}); */

//FIN ENDPOINT PRODUCTS
//Url Erronea
app.get("*", (req, res) => {
  return res
    .status(404)
    .json({ status: "error", msg: "no se encuentra esa ruta"});
});
