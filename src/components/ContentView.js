import React, { Component } from "react";
import axios from 'axios';
import PatientsTable from "./PatientsTable";
import Notification from "./Notification";
import {MDBBtn, MDBBtnGroup, MDBContainer, MDBIcon, MDBNotification} from "mdbreact";

export default class ContentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications : [],
        };

        this.addNotification = this.addNotification.bind(this);
    }

    addNotification(notification){
        // Update notifications
        this.setState((state) => {
            return {
                // Limit notifications to 3
                notifications: state.notifications.length >= 3 ? state.notifications.slice(1).concat(notification) : state.notifications.concat(notification)
            }
        });
    }

    render() {
        return (
            <>
                <MDBContainer style={styles.notifContainer} id="notifContainer">
                    {
                        this.state.notifications.map((notification) =>
                            <Notification key={notification.id}
                                          icon={notification.icon}
                                          iconClassName={notification.iconClassName}
                                          title={notification.title}
                                          message={notification.message}
                            />,
                        )
                    }
                </MDBContainer>
                <h4 style={styles.title}>Liste des patients</h4>
                <PatientsTable addNotification={this.addNotification}/>
            </>
        )
    };
}

const styles = {
    title : {
        marginBottom: '4vh',
        fontWeight: 'bolder',
    },
    notifContainer: {
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 9999,
        maxWidth: "350px",
    }
};