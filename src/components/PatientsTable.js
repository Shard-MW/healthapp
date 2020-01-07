import React from 'react';
import { MDBDataTable } from 'mdbreact';
import axios from "axios";

const columns = [
    {
        label: 'Nom',
        field: 'nom',
        sort: 'asc',
        width: '250',
    },
    {
        label: 'Prénoms',
        field: 'prenom',
        sort: 'asc',
        width: '500',
    },
];

class PatientsTable extends React.Component {
    state = {
        data: {
            columns: columns,
            rows: []
        }
    };

    getPatients(params){
        axios.get(`https://stu3.test.pyrohealth.net/fhir/Patient`,
            {
                params: {
                    ...params
                }
            })
            .then(res => {
                let rows = [];
                res.data.entry.map((row) => {
                        if(row.resource.name) {
                            rows.push({
                                nom: (row.resource.name[0].family).toUpperCase(),
                                prenom: (row.resource.name[0].given[0]).toLowerCase().charAt(0).toUpperCase() + (row.resource.name[0].given[0]).toLowerCase().substring(1),
                            });
                        }
                    }
                );
                const data = {columns: columns, rows: rows};
                this.setState({ data });
            })
    };

    componentDidMount() {
        this.getPatients({ _count:20 });
    };

    render() {
        return (
            <MDBDataTable
                striped
                bordered
                small
                data={this.state.data}
            />
        )
    };
}
export default PatientsTable;