using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TredaCrud.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TredaCrud.Controllers
{
    [Route("api/[controller]")]
    public class ProductosController : Controller
    {
        AppAccess objProduct = new AppAccess();

        [HttpGet]
        [Route("api/Producto/Index")]
        public IEnumerable<Producto> Index()
        {
            return objProduct.GetAllProducts();
        }

        [HttpPost]
        [Route("api/Producto/Create")]
        public int Create(Producto producto)
        {
            return objProduct.AddProduct(producto);
        }

        [HttpGet]
        [Route("api/Producto/Details/{id}")]
        public Producto Details(int id)
        {
            return objProduct.GetProductData(id);
        }

        [HttpPut]
        [Route("api/Producto/Edit")]
        public int Edit(Producto producto)
        {
            return objProduct.UpdateProduct(producto);
        }

        [HttpDelete]
        [Route("api/Producto/Delete/{id}")]
        public int Delete(int id)
        {
            return objProduct.DeleteProduct(id);
        }

        [HttpGet]
        [Route("api/Producto/GetTiendasList")]
        public IEnumerable<Tienda> Details()
        {
            return objProduct.GetTienda();
        }
    }
}
