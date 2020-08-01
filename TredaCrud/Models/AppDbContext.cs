using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TredaCrud.Models
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Producto> Producto { get; set; }
        public virtual DbSet<Tienda> Tienda { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-28V9CDI\\SQLEXPRESS;Initial Catalog=TredaCrud;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Producto>(entity =>
            {
                entity.HasKey(e => e.Sku);

                entity.ToTable("producto");

                entity.HasIndex(e => e.Sku)
                    .HasName("UQ__producto__CA1ECF0D46CF5928")
                    .IsUnique();

                entity.Property(e => e.Sku).HasColumnName("SKU");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.IdTienda).HasColumnName("id_tienda");

                entity.Property(e => e.Imagen)
                    .IsRequired()
                    .HasColumnName("imagen")
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Valor)
                    .HasColumnName("valor")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdTiendaNavigation)
                    .WithMany(p => p.Producto)
                    .HasForeignKey(d => d.IdTienda)
                    .HasConstraintName("FK_producto_tienda");
            });

            modelBuilder.Entity<Tienda>(entity =>
            {
                entity.ToTable("tienda");

                entity.HasIndex(e => e.Id)
                    .HasName("UQ__tienda__3213E83ED38B61A8")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.FechaApertura)
                    .HasColumnName("fecha_apertura")
                    .HasColumnType("date");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });
        }
    }
}
