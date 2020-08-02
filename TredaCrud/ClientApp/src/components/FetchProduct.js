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
exports.ProductData = exports.FetchProduct = void 0;
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var FetchProduct = /** @class */ (function (_super) {
    __extends(FetchProduct, _super);
    function FetchProduct(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { productList: [], loading: true };
        fetch('api/Producto/Index')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ productList: data, loading: false });
        });
        _this.handleDelete = _this.handleDelete.bind(_this);
        _this.handleEdit = _this.handleEdit.bind(_this);
        return _this;
    }
    FetchProduct.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderProductTable(this.state.productList);
        return React.createElement("div", null,
            React.createElement("h1", null, "Productos"),
            React.createElement("p", null,
                React.createElement(react_router_dom_1.Link, { to: "/addproduct" }, "Create New")),
            contents);
    };
    FetchProduct.prototype.handleDelete = function (id) {
        var _this = this;
        //if (!confirm("Do you want to delete employee with Id: " + id))
        //    return;
        //else {
        fetch('api/Producto/Delete/' + id, {
            method: 'delete'
        }).then(function (data) {
            _this.setState({
                productList: _this.state.productList.filter(function (rec) {
                    return (rec.SKU != id);
                })
            });
        });
        //}
    };
    FetchProduct.prototype.handleEdit = function (id) {
        this.props.history.push("/Producto/edit/" + id);
    };
    FetchProduct.prototype.renderProductTable = function (productList) {
        var _this = this;
        return React.createElement("table", { className: 'table' },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null),
                    React.createElement("th", null, "SKU"),
                    React.createElement("th", null, "Nombre"),
                    React.createElement("th", null, "Descripci\u00F3n"),
                    React.createElement("th", null, "Valor"),
                    React.createElement("th", null, "Tienda"),
                    React.createElement("th", null, "Imagen"))),
            React.createElement("tbody", null, productList.map(function (product) {
                return React.createElement("tr", { key: product.SKU },
                    React.createElement("td", null),
                    React.createElement("td", null, product.nombre),
                    React.createElement("td", null, product.descripcion),
                    React.createElement("td", null, product.valor),
                    React.createElement("td", null, product.tienda),
                    React.createElement("td", null, product.imagen),
                    React.createElement("td", null,
                        React.createElement("a", { className: "action", onClick: function (id) { return _this.handleEdit(product.SKU); } }, "Edit"),
                        "  |",
                        React.createElement("a", { className: "action", onClick: function (id) { return _this.handleDelete(product.SKU); } }, "Delete")));
            })));
    };
    return FetchProduct;
}(React.Component));
exports.FetchProduct = FetchProduct;
var ProductData = /** @class */ (function () {
    function ProductData() {
        this.SKU = 0;
        this.nombre = "";
        this.descripcion = "";
        this.valor = 0;
        this.tienda = 0;
        this.imagen = "";
    }
    return ProductData;
}());
exports.ProductData = ProductData;
//# sourceMappingURL=FetchProduct.js.map