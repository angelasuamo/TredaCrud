import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { ProductData } from './FetchProduct';
interface FetchProductDataState {
    title: string;
    loading: boolean;
    TiendaList: Array<any>;
    productData: ProductData;
}
export class AddProduct extends React.Component<RouteComponentProps<{}>, FetchProductDataState> {
    constructor(props) {
        super(props);
        this.state = { title: "", loading: true, TiendaList: [], productData: new ProductData };
        fetch('api/Producto/GetTiendaList')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ TiendaList: data });
            });
        var SKU = this.props.match.params["SKU"];
        
        if (SKU > 0) {
            fetch('api/Producto/Details/' + SKU)
                .then(response => response.json() as Promise<ProductData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, productData: data });
                });
        }
       
        else {
            this.state = { title: "Create", loading: false, TiendaList: [], productData: new ProductData };
        }
     
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.TiendaList);
        return <div>
            <h1>{this.state.title}</h1>
            <h3>Producto</h3>
            <hr />
            {contents}
        </div>;
    }

    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        if (this.state.productData.SKU) {
            fetch('api/Producto/Edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchproduct");
                })
        }
        
        else {
            fetch('api/Producto/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchproduct");
                })
        }
    }
    // This will handle Cancel button click event.  
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchproduct");
    }
    // Returns the HTML Form to the render() method.  
    private renderCreateForm(TiendaList: Array<any>) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="SKU" value={this.state.productData.SKU} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Nombre</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.productData.nombre} required />
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Description">Descripción</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="description" defaultValue={this.state.productData.descripcion} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="value" >Valor</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="value" defaultValue={this.state.productData.valor} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Departament">Tienda</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="Departament" defaultValue={this.state.productData.tienda} required>
                            <option value="">-- Seleccionar Tienda--</option>
                            {TiendaList.map(tienda =>
                                <option key={tienda.id} value={tienda.nombre}>{tienda.fechaApertura}</option>
                            )}
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="image" >Imagen</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="image" defaultValue={this.state.productData.imagen} required />
                    </div>
                </div>
               
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}