import React, { Component } from "react";
import { MDBNotification } from "mdbreact";

class Notification extends Component {
    render() {
        return (
            <MDBNotification {...this.props}
                show
                autohide={5000}
                fade
            />
        );
    }
}

export default Notification;