import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdbreact";
import "./css/index.css";
import ContentView from "./components/ContentView";

class App extends Component {
    render() {
        return (
            <MDBContainer fluid style={styles.container}>
                <MDBRow>
                    <MDBCol style={styles.leftMenu} md="2">Menu</MDBCol>
                    <MDBCol style={styles.content} md="10">
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
        border: '1px solid black',
        paddingTop : '4%',
        textAlign: 'center',
    },
    content : {
        border: '1px solid yellow',
        padding: '4%',
        height: '100vh',
        overflow: 'auto',
    },
};

export default App;
