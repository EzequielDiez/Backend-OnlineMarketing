class ProductManager {

    constructor() {
        
        this.products = [];
        this.autoId = 0;

    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      // Revisa que todos los campos estén completos, si no, devuelve un error.
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Error: Todos los campos deben estar completos");
            return;
        }
  
      // Validar que no exista el producto con el mismo código.
        const existingProduct = this.products.find((product) => product.code === code);

        if (existingProduct) {
            console.log(`Error: El código ${code} ya está en uso.`);
            return;
        }
  
      // Modelo para crear el objeto.
        const newProduct = {
            id: ++this.autoId,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };
  
      // Agregamos el objeto al array de productos.
        this.products.push(newProduct);
    }
  
    getProducts() {
        return this.products;
    }
  
    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (!product) {
            console.log(`Error: No se encontro el producto con el siguiente ${id}`);
            return;
        }
        return product;
    }
  }


    const productManager = new ProductManager();

    // Ejemplos de productos.
    productManager.addProduct("Template x9", "Diseño de Feed x9 plantillas editables", 5000, "/producto1.jpg", "TMP001", 100);
    productManager.addProduct("Template x12", "Diseño de Feed x12 plantillas editables", 6500, "/producto2.jpg", "TMP002", 100);
    productManager.addProduct("Template x15", "Diseño de Feed x15 plantillas editables", 7500, "/producto3.jpg", "TMP003", 100);
    
    // Mostrar el array de productos.
    console.log(productManager.getProducts());
    
    // Se busca un producto por id y otro por un id que no existe.
    const product = productManager.getProductById(2);
    console.log(product);

    const product4 = productManager.getProductById(4);
    console.log(product4)