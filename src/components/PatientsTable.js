import React from 'react';
import {MDBDataTable, MDBBtn, MDBIcon, MDBBtnGroup} from 'mdbreact';
import axios from "axios";
import * as stringOp from "../operations/stringOperations"

const columns = [
    {
        label: '#',
        field: 'countId',
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

        this.deletePatient = this.deletePatient.bind(this);
    }

    formalizeGender(gender) {
        switch (gender) {
            case "male":
                return "Homme";

            case "female":
                return "Femme";
        
            default:
                return gender;
        }
    }   

    async deletePatient(e, id, addNotification) {
        e.preventDefault();

        // Search for in array index (array is re-organized after each changes)
        let index = -1;
        let clength = this.state.data.rows.length;

        for(let i = 0; i < clength; ++i) {
            if(this.state.data.rows[i].resourceId === id) {
                index = i;
                break;
            }
        }

        // Delete if found
        if(index > -1) {
            let status = 0;
            // Wait for response before updating UI
            await axios.delete(`https://stu3.test.pyrohealth.net/fhir/Patient/` + id)
                .then(res => {
                    // Get the answer status
                    status = res.status;
                });

            // If delete is successful
            if(status === 204){ // According to doc https://fhir-drills.github.io/simple-patient.html#Step5 ok response is 204
                // Reindex ui display
                for(let i = index; i < clength; ++i)
                    this.state.data.rows[i].countId = <span style={{marginLeft: '1rem'}}>{this.state.data.rows[i].countId.props.children-1}</span>;

                // Delete row and refresh data
                this.state.data.rows.splice(index, 1);
                this.setState((state) => {
                    return {
                        data: {
                            columns: state.data.columns,
                            rows: state.data.rows
                        }
                    }
                });

                // Send success notification to client
                addNotification({
                    id: id,
                    icon: "trash-alt",
                    iconClassName: "text-success",
                    title: "Suppression",
                    message: "Le patient "+ id + " a été supprimé avec succès.",
                });
            }
            else {
                // Send error notification to client
                addNotification({
                    id: id,
                    icon: "trash-alt",
                    iconClassName: "red-text",
                    title: "Suppression",
                    message: "Une erreur est survenue lors de la suppression du patient " + id,
                });
            }
        }
    }

    getPatients(searchParams){
        axios.get(`https://stu3.test.pyrohealth.net/fhir/Patient`,
            {
                params: {
                    ...searchParams
                }
            })
            .then(res => {
                let rows = [];
                res.data.entry.forEach((row, index) => {
                        rows.push({
                            resourceId: row.resource.id,
                            countId:
                                <span style={{marginLeft: '1rem'}}>{index+1}</span>,
                            nom: row.resource.name
                                 ? (row.resource.name[0].family).toUpperCase()
                                 : "",
                            prenom: row.resource.name
                                    ? stringOp.capitalize(row.resource.name[0].given[0])
                                    : "",
                            birth : row.resource.birthDate,
                            gender: this.formalizeGender(row.resource.gender),
                            button:
                                <MDBBtnGroup style={{width: '100%'}}>
                                    <MDBBtn style={{marginTop: 0, marginBottom: 0, marginLeft: 0}} color="primary" onClick={(e) => console.log("Modify clicked for " + row.resource.id)}>
                                        <MDBIcon style={styles.icon} icon="user-edit"/>
                                    </MDBBtn>
                                    <MDBBtn style={{marginTop: 0, marginBottom: 0, marginRight: 0}} color="danger" onClick={(e) => this.deletePatient(e, row.resource.id, this.props.addNotification)}>
                                        <MDBIcon style={styles.icon} icon="trash-alt"/>
                                    </MDBBtn>
                                </MDBBtnGroup>
                        });
                    }
                );
                const data = {columns: columns, rows: rows};
                this.setState({ data });
            })
    };

    componentDidMount() {
        // Init table (200 seems to be the server limit)
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
                //noBottomColumns
                data={this.state.data}
                searchLabel="Recherche dans la liste :"
                paginationLabel={["Précédent", "Suivant"]}
                noRecordsFoundLabel="Aucun résultat trouvé"
                infoLabel={["Affiche", "à", "des", "résultats"]}
                entriesLabel="Montrer par page :"
            />
        )
    };
}
export default PatientsTable;


const styles = {
    icon: {
        marginLeft: '-.3rem',
    }
}