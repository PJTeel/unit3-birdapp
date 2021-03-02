import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import './Homepage.css';
// import plantArray from './Assets/Testdata/plantArray'; // Test data

import HomePageList from "./HomePageList";  // provides user with limited selection for our initial app
import FRUIT_IMAGE from "./Assets/Exotic-fruit.jpg";
import VEGETABLE_IMAGE from './Assets/vegetable-set-5.jpg';
import FLOWER_IMAGE from './Assets/Late-summer-flowers.jpg';

//Define const for readable indexes
const FRUIT = 0;
const VEGETABLE = 1;
const FLOWER = 2;

//Example desired URL:  https://trefle.io/api/v1/plants/search?token=Nx5vC1gM25R5WZl5kR7p0V3M7Ry2TXXubzAkG1bQals&q=coconut
//In order, we have..
const CORS_URL = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = 'https://trefle.io/api/v1/plants/search?';
const TOKEN = "token=Nx5vC1gM25R5WZl5kR7p0V3M7Ry2TXXubzAkG1bQals";
const SEARCH_QUALIFIER = '=';
//User Selection from our list then follows at the end



class Homepage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userSelection: "",
            plantList: [],
        }
    }

    buildList(listType) {
        if ( (HomePageList !== undefined) && (listType >= 0) && (listType <= HomePageList.length) ) {
            let listNames = [];
            for (let i = 0; i < HomePageList.length; i++) {
                // console.log("listNames: ", i, listNames)
                listNames[i] =
                    <li key={i}><a href="#" className='Species-Select-tag' onClick={this.handleSelection}>
                        {HomePageList[listType][i]}
                    </a></li>
            }
            return listNames;
        }
        return null;
    }




    handleSelection = (event) => {

        event.preventDefault();

        let hyphenedPlantName = "";
        hyphenedPlantName = event.target.innerText.replace(" ", "-");

        // console.log(tempString);
        console.log(CORS_URL + BASE_URL + TOKEN + SEARCH_QUALIFIER + hyphenedPlantName);

        debugger ;

        let response = axios.get(CORS_URL + BASE_URL + TOKEN + SEARCH_QUALIFIER + hyphenedPlantName)
            .then(response => {
                this.setState({ plantList: response.data.data });
                this.setState({ userSelection: event.target.innerText });

                console.log("HomePage got selection : ", this.state);
            })
            .catch(error => {
                console.log('HomePage ERROR:', error);
            })
    }

    render() {

        let vegatableList = this.buildList(VEGETABLE);
        let fruitList = this.buildList(FRUIT);
        let flowerList = this.buildList(FLOWER);

        console.log(this.FRUIT_IMAGE)

        return (
            <div className='Homepage'>
                <form className='Homepage-Form'>

                    <div className='Homepage-Vegetable'>
                        <h2 className='Homepage-Vegetable-Label' >Vegetable</h2>
                        <img className='Homepage-Vegetable-Image' src={VEGETABLE_IMAGE} alt="Vegetable Image" /><br></br>
                        <label className='Search-Common-Name' >Chose a Vegetable</label>
                        <ul>
                            {vegatableList}
                        </ul>
                    </div>

                    <div className='Homepage-Fruit'>
                        <h2 className='Homepage-Vegetable-Label' >Fruit</h2>
                        <img className='Homepage-Vegetable-Image' src={FRUIT_IMAGE} alt="Vegetable Image" /><br></br>
                        <label className='Search-Common-Name' >Chose a Fruit</label>
                        <ul>
                            {fruitList}
                        </ul>
                    </div>

                    <div className='Homepage-Flower'>
                        <h2 className='Homepage-Vegetable-Label' >Flower</h2>
                        <img className='Homepage-Vegetable-Image' src={FLOWER_IMAGE} alt="Vegetable Image" /><br></br>
                        <label className='Search-Common-Name' >Chose a Flower</label>
                        <ul>
                            {flowerList}
                        </ul>
                    </div>

                </form>
            </div>
        )
    }
}

export default Homepage;



