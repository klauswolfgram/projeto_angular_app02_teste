import React, {Component} from 'react';

import api from '../../services/api';

import './style.css';

export default class Main extends Component{

    state = {
        products: [],
        productInfo: {},
    }

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        
        const response = await api.get('/products?page=' + page);

        const {docs, ...productInfo} = response.data;

        this.setState({products: docs, productInfo});

        console.log(docs);
    }

    prevPage = () => {};
    nextPage = () => {
        
        const { productInfo } = this.state;
        const { page } = this.state;

        if(page === productInfo.pages) return;

        const pageNumber = page + 1; // Erro aqui

        this.loadProducts(pageNumber);

    };

    render(){
        const {products} = this.state
        return (
            <div className="product-list">
                { products.map( product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>
                        <a href="www.google.com">Acessar</a>
                    </article>
                    //<h2 key={product._id} accessKey ={product._id}>{product.title}</h2>
                )) }
                <div className="actions">
                    <button onClick={this.prevPage}>Anterior</button>
                    <button onClick={this.nextPage}>Proximo</button>
                </div>                
            </div>
        )
    //return <h1>Contagem de produtos: {this.state.products.length}</h1>
    }
}