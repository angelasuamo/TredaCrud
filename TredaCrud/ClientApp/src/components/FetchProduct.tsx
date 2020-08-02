import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
interface FetchProductDataState {
    productList: ProductData[];
    loading: boolean;
}
export class FetchProduct extends React.Component<RouteComponentProps<{}>, FetchProductDataState> {
    constructor(props) {
        super(props);
        this.state = { productList: [], loading: true };
        fetch('api/Producto/Index')
            .then(response => response.json() as Promise<ProductData[]>)
            .then(data => {
                this.setState({ productList: data, loading: false });
            });
      
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProductTable(this.state.productList);
        return <div>
            <h1>Productos</h1>
            <p>
                <Link to="/addproduct">Create New</Link>
            </p>
            {contents}
        </div>;
    }
    
    private handleDelete(id: number) {
        //if (!confirm("Do you want to delete employee with Id: " + id))
        //    return;
        //else {
            fetch('api/Producto/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        productList: this.state.productList.filter((rec) => {
                            return (rec.SKU != id);
                        })
                    });
            });
        //}
    }
    private handleEdit(id: number) {
        this.props.history.push("/Producto/edit/" + id);
    }
 
    private renderProductTable(productList: ProductData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>SKU</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Valor</th>
                    <th>Tienda</th>
                    <th>Imagen</th>
                </tr>
            </thead>
            <tbody>
                {productList.map(product =>
                    <tr key={product.SKU}>
                        <td></td>
                        <td>{product.nombre}</td>
                        <td>{product.descripcion}</td>
                        <td>{product.valor}</td>
                        <td>{product.tienda}</td>
                        <td>{product.imagen}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(product.SKU)}>Edit</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(product.SKU)}>Delete</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
export class ProductData {
    SKU: number = 0;
    nombre: string = "";
    descripcion: string = "";
    valor: number = 0;
    tienda: number = 0;
    imagen: string = "";
}