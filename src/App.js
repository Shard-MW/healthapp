import React, { Component } from "react";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import "./css/index.css";
import ContentView from "./components/ContentView";
import SearchMenu from "./components/SearchMenu";

class App extends Component {
    render() {
        return (
            <MDBContainer fluid style={styles.container}>
                <MDBRow>
                    <MDBCol style={styles.leftMenu} md="3">
                        <SearchMenu />
                    </MDBCol>

                    <MDBCol style={styles.content} md="9">
                        <ContentView />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

const styles = {
    container : {
        //backgroundColor: '#bebebe',
    },
    leftMenu : {
        borderRight: '.05rem solid #dee2e6',
        paddingTop : '4vh',
        height: '100vh',
        overflow: 'auto',
    },
    content : {
        //border: '1px solid yellow',
        padding: '4vh',
        height: '100vh',
        overflow: 'auto',
    },
};

export default App;
