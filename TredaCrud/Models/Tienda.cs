using System;
using System.Collections.Generic;

namespace TredaCrud.Models
{
    public partial class Tienda
    {
        public Tienda()
        {
            Producto = new HashSet<Producto>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public DateTime FechaApertura { get; set; }

        public ICollection<Producto> Producto { get; set; }
    }
}
