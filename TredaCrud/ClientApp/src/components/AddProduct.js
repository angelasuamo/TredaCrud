"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProduct = void 0;
var React = require("react");
var FetchProduct_1 = require("./FetchProduct");
var AddProduct = /** @class */ (function (_super) {
    __extends(AddProduct, _super);
    function AddProduct(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { title: "", loading: true, TiendaList: [], productData: new FetchProduct_1.ProductData };
        fetch('api/Producto/GetTiendaList')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ TiendaList: data });
        });
        var SKU = _this.props.match.params["SKU"];
        if (SKU > 0) {
            fetch('api/Producto/Details/' + SKU)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.setState({ title: "Edit", loading: false, productData: data });
            });
        }
        else {
            _this.state = { title: "Create", loading: false, TiendaList: [], productData: new FetchProduct_1.ProductData };
        }
        _this.handleSave = _this.handleSave.bind(_this);
        _this.handleCancel = _this.handleCancel.bind(_this);
        return _this;
    }
    AddProduct.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderCreateForm(this.state.TiendaList);
        return React.createElement("div", null,
            React.createElement("h1", null, this.state.title),
            React.createElement("h3", null, "Producto"),
            React.createElement("hr", null),
            contents);
    };
    AddProduct.prototype.handleSave = function (event) {
        var _this = this;
        event.preventDefault();
        var data = new FormData(event.target);
        if (this.state.productData.SKU) {
            fetch('api/Producto/Edit', {
                method: 'PUT',
                body: data,
            }).then(function (response) { return response.json(); })
                .then(function (responseJson) {
                _this.props.history.push("/fetchproduct");
            });
        }
        else {
            fetch('api/Producto/Create', {
                method: 'POST',
                body: data,
            }).then(function (response) { return response.json(); })
                .then(function (responseJson) {
                _this.props.history.push("/fetchproduct");
            });
        }
    };
    // This will handle Cancel button click event.  
    AddProduct.prototype.handleCancel = function (e) {
        e.preventDefault();
        this.props.history.push("/fetchproduct");
    };
    // Returns the HTML Form to the render() method.  
    AddProduct.prototype.renderCreateForm = function (TiendaList) {
        return (React.createElement("form", { onSubmit: this.handleSave },
            React.createElement("div", { className: "form-group row" },
                React.createElement("input", { type: "hidden", name: "SKU", value: this.state.productData.SKU })),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: " control-label col-md-12", htmlFor: "Name" }, "Nombre"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "name", defaultValue: this.state.productData.nombre, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: " control-label col-md-12", htmlFor: "Description" }, "Descripci\u00F3n"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "description", defaultValue: this.state.productData.descripcion, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "value" }, "Valor"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "value", defaultValue: this.state.productData.valor, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "Departament" }, "Tienda"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("select", { className: "form-control", "data-val": "true", name: "Departament", defaultValue: this.state.productData.tienda, required: true },
                        React.createElement("option", { value: "" }, "-- Seleccionar Tienda--"),
                        TiendaList.map(function (tienda) {
                            return React.createElement("option", { key: tienda.id, value: tienda.nombre }, tienda.fechaApertura);
                        })))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "image" }, "Imagen"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "image", defaultValue: this.state.productData.imagen, required: true }))),
            React.createElement("div", { className: "form-group" },
                React.createElement("button", { type: "submit", className: "btn btn-default" }, "Save"),
                React.createElement("button", { className: "btn", onClick: this.handleCancel }, "Cancel"))));
    };
    return AddProduct;
}(React.Component));
exports.AddProduct = AddProduct;
//# sourceMappingURL=AddProduct.js.map