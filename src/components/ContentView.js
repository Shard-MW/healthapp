import React, { Component } from "react";
import axios from 'axios';
import PatientsTable from "./PatientsTable";

export default class PersonList extends React.Component {
    state = {
        patients: []
    };

    getPatients(params){
        axios.get(`https://stu3.test.pyrohealth.net/fhir/Patient`,
            {
                params: {
                    ...params
                }
            })
            .then(res => {
                const patients = res.data.entry;
                this.setState({ patients });
            })
    };

    componentDidMount() {
        this.getPatients({ _count:10 });
    };

    render() {
        return (/*
            <ul>
                {
                    this.state.patients.map((row) =>
                        row.resource.name && <li key={row.resource.id}><span style={styles.lastname}>{row.resource.name[0].family}</span> <span style={styles.firstname}>{(row.resource.name[0].given[0]).toLowerCase()}</span></li>
                    )
                }
            </ul>
            */
            <PatientsTable />
        )
    };
}

const styles = {
    lastname: {
        textTransform: 'uppercase',
    },
    firstname: {
        textTransform: 'capitalize',
    },
};