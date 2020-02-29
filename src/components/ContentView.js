import React, { Component } from "react";
import PatientsTable from "./PatientsTable";
import Notification from "./Notification";
import {MDBContainer} from "mdbreact";
import AddPatientModal from "./AddPatientModal";

export default class ContentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications : [], // Stores notifications to show
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
                        // Map existing notifications to display them
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
                <div>
                    <h4 style={styles.title}>Liste des patients</h4>
                    <AddPatientModal addNotification={this.addNotification}/>
                </div>
                <PatientsTable addNotification={this.addNotification} params={this.props.params}/>
            </>
        )
    };
}

const styles = {
    title : {
        marginBottom: '4vh',
        fontWeight: 'bolder',
        display: 'inline-block',
        marginRight: '1rem',
    },
    notifContainer: {
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 9999,
        maxWidth: "350px",
    }
};