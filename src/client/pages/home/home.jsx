import React from "react";
import Topbar from "../../components/topbar/topbar";
import SearchBar from "../../components/searchbar/searchbar";
import Banner from "../../components/banner/banner";
import List from "../../components/lists/list";
import Footer from "../../components/footer/footer";
import Discount from "../../components/discount/discount";

const styles = {
    homecontainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '10px'
    },
    topbarcontainer: {
        marginTop: '20px'
    },
    searchbarcontainer: {
        margin: '20px 0'
    },
    bannercontainer: {
        margin: '20px 0'
    },
    discountcontainer:{
        margin:'60px'
    },
    listcontainer: {
        margin: '60px 0',
        alignItems: 'center',
        justifyContent: 'center',
        position:'relative'
    },
    footercontainer:{
        margin:'60px 0'
    }
}

const Home = () => {
    return(
        <div style={styles.homecontainer}>

            <div style={styles.topbarcontainer}>
                <Topbar />
            </div>

            <div style={styles.searchbarcontainer}>
                <SearchBar/>
            </div>

            <div style={styles.bannercontainer}>
                <Banner/>
            </div>

            <div style={styles.discountcontainer}>
                <Discount/>
            </div>

            <div style={styles.listcontainer}>
                <List/>
            </div>

            <div style={{
                height:'1px',
                backgroundColor:'gray',
                width:'100%',

            }}></div>

            <div style={styles.footercontainer}>
                <Footer/>
            </div>
        </div>
    )
}

export default Home;
