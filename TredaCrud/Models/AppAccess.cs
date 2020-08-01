using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TredaCrud.Models
{
    public class AppAccess
    {
        AppDbContext db = new AppDbContext();

        //Listar productos
        public IEnumerable<Producto> GetAllProducts()
        {
            try
            {
                return db.Producto.ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

        //Agregar nuevo empleado
        public int AddProduct(Producto producto)
        {
            try
            {
                db.Producto.Add(producto);
                db.SaveChanges();
                return 1;
            }
            catch (Exception)
            {

                throw;
            }
        }

        //Editar productos
        public int UpdateProduct(Producto producto)
        {
            try
            {
                db.Entry(producto).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch (Exception)
            {

                throw;
            }
        }

        //obtener datos de un producto
        public Producto GetProductData(int id)
        {
            try
            {
                Producto producto = db.Producto.Find(id);
                return producto;
            }
            catch
            {
                throw;
            }
        }

        //Eliminar un producto
        public int DeleteEmployee(int id)
        {
            try
            {
                Producto producto = db.Producto.Find(id);
                db.Producto.Remove(producto);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Listar Tiendas
        public List<Tienda> GetTienda()
        {
            List<Tienda> lstTienda = new List<Tienda>();
            lstTienda = (from tienda in db.Tienda select tienda).ToList();
            return lstTienda;
        }

    }
}
