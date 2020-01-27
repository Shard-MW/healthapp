import React from 'react';
import {MDBDataTable, MDBBtn, MDBIcon, MDBBtnGroup} from 'mdbreact';
import axios from "axios";

const columns = [
    {
        label: '#',
        field: 'countId',
        sort: 'asc',
    },
    {
        label: 'Nom',
        field: 'nom',
        sort: 'asc',
    },
    {
        label: 'Prénom',
        field: 'prenom',
        sort: 'asc',
    },
    {
        label: 'Date nais.',
        field: 'birth',
        sort: 'asc',
    },
    {
        label: 'Genre',
        field: 'gender',
        sort: 'asc',
    },
    {
        label: '',
        field: 'button',
        sort: 'asc',
    },
];

class PatientsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                columns: columns,
                rows: []
            }
        };

        this.deleteRow = this.deleteRow.bind(this);
    }

    deleteRow(e, id) {
        e.preventDefault();

        // Search for in array index (array is re-organized after each changes)
        let index = -1;
        let clength = this.state.data.rows.length;

        for( let i = 0; i < clength; ++i ) {
            if(this.state.data.rows[i].resourceId === id) {
                index = i;
                break;
            }
        }

        // Delete if found
        if(index > -1) {
            this.state.data.rows.splice(index, 1);
            this.setState((state) => {
                return {
                    data: {
                        columns: state.data.columns,
                        rows: state.data.rows
                    }
                }
            });
        }
    }

    getPatients(params){
        axios.get(`https://stu3.test.pyrohealth.net/fhir/Patient`,
            {
                params: {
                    ...params
                }
            })
            .then(res => {
                let rows = [];
                res.data.entry.map((row, index) => {
                        if(row.resource.name) {
                            rows.push({
                                resourceId: row.resource.id,
                                countId:
                                    <span style={{marginLeft: '1rem'}}>{index+1}</span>,
                                nom: (row.resource.name[0].family).toUpperCase(),
                                prenom: (row.resource.name[0].given[0]).toLowerCase().charAt(0).toUpperCase() + (row.resource.name[0].given[0]).toLowerCase().substring(1),
                                birth : row.resource.birthDate,
                                gender: row.resource.gender,
                                button:
                                    <MDBBtnGroup style={{width: '100%'}}>
                                        <MDBBtn color="primary" onClick={(e) => console.log("Modify clicked for " + row.resource.id)}>
                                            <MDBIcon icon="user-edit"/>
                                        </MDBBtn>
                                        <MDBBtn color="danger" onClick={(e) => this.deleteRow(e, row.resource.id)}>
                                            <MDBIcon icon="trash-alt"/>
                                        </MDBBtn>
                                    </MDBBtnGroup>
                            });
                        }
                    }
                );
                const data = {columns: columns, rows: rows};
                this.setState({ data });
            })
    };

    componentDidMount() {
        this.getPatients({ _count: 200 });
    };

    render() {
        return (
            <MDBDataTable
                btn fixed
                entriesOptions={[ 10, 25, 50, 100 ]}
                striped
                bordered
                hover
                small
                noBottomColumns
                data={this.state.data}
            />
        )
    };
}
export default PatientsTable;