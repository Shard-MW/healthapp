import React, { Component } from "react";
import axios from 'axios';
import PatientsTable from "./PatientsTable";

export default class ContentView extends React.Component {
    render() {
        return (
            <PatientsTable />
        )
    };
}