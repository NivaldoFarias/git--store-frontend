import { useState, useEffect } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
import Typewriter from "typewriter-effect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";

import logo from './../assets/git--store-logo.png';

dotenv.config();

// para testes
const teste = [
    {
        title: 'mouse gamer foda',
        image: 'https://images.kabum.com.br/produtos/fotos/112948/mouse-gamer-logitech-g203-rgb-lightsync-6-botoes-8000-dpi-preto-910-005793_1612880277_g.jpg',
        price: 'R$ 129.90'
    },
    {
        title: 'Processador Intel Core i3 2100 3.10ghz Cache 3MB LGA 1155 OEM',
        image: 'https://a-static.mlcdn.com.br/1500x1500/processador-intel-core-i3-2100-3-10ghz-cache-3mb-lga-1155-oem/reibatuta3/879/7f9f0f0d1c3b03848c28aad57d22de33.jpg',
        price: 'R$ 400.00'
    },
    {
        title: 'Placa de Vídeo Zotac NVIDIA GeForce RTX 3090 Trinity, 24GB, GDDR6X - ZT-A30900D-10P',
        image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRxBDxP3yS6r33ssbUlJ-vuV2o9RAJ2PlHSAno-XNe5eoCadObBXHIc-2VHfj5jsq4N5T7OLTK9KAwwLhx7qNEe0JDNdaSEKbAZNc4LNAKHImy17PS6kHg1_w&usqp=CAE',
        price: 'R$ 17.119,89'
    }
]

export default function Home() {
    const [sideBar, setSideBar] = useState(false);
    const [products, setProducts] = useState(null);

    function toggleSideBar() {
        setSideBar(!sideBar);
    }
    
    function addToCart() {
        console.log('adicionar')
    }

    function getProducts() {
        const URL = process.env.REACT_APP_API_URL
        axios.get(`${URL}/products`)
            .then(response => {
                setProducts(response.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    useEffect(() => {
        setProducts(teste) 
    }, [])

    // useEffect(getProducts, []) 

    return (
        <main id="home-page">
            <header>
                <img src={logo} alt="git --store" />
                <Typewriter onInit={(typewriter) => {
                    typewriter
                        .typeString("git --store")
                        .pauseFor(3000)
                        .start()
                }} />
            </header>
            <div className="banner"></div>
            <nav>
                <div>
                    <div className="nav-menu">
                        <FontAwesomeIcon onClick={toggleSideBar} icon={sideBar ? faXmark : faBars} className="menu" />
                    </div>
                    <div className="nav-item">
                        nav-item
                    </div>
                    <div className="nav-item">
                        nav-item
                    </div>
                    <div className="nav-item">
                        nav-item
                    </div>
                </div>
                <aside className={sideBar ? undefined : 'hidden-aside'}>
                    <div className='sidebar-item'>
                        Carrinho
                    </div>
                    <div className='sidebar-item'>
                        Historico
                    </div>
                    <div className='sidebar-item'>
                        Checkout
                    </div>
                </aside>
            </nav>
            <div className='products'>
                {products ? products.map(product => {
                    return (
                    <article className='product'>
                        <a href="#"><img src={product.image} alt={product.title} /></a>
                        <h1>{product.title}</h1>
                        <span>{product.price}</span>
                        <button onClick={addToCart}>Adicionar ao carrinho</button>
                    </article>)
                }) : <></>}
            </div>


        </main>
    )
}