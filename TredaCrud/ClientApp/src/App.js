import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchProduct } from './components/FetchProduct';
import { AddProduct } from './components/AddProduct';

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/fetchproduct' component={FetchProduct} />
                <Route path='/addproduct' component={AddProduct} />
                <Route path='/product/edit/:SKU' component={AddProduct} /> 
            </Layout>
        );
    }
}