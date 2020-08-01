using System;
using System.Collections.Generic;

namespace TredaCrud.Models
{
    public partial class Producto
    {
        public int Sku { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public decimal Valor { get; set; }
        public int? IdTienda { get; set; }
        public string Imagen { get; set; }

        public Tienda IdTiendaNavigation { get; set; }
    }
}
