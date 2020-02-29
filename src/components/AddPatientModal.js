import React, { Component } from 'react';
import { MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBTooltip, MDBCol, MDBRow } from 'mdbreact';
import axios from "axios";

class AddPatientModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            lastname: '',
            firstname: '',
            gender: '',
            birthdate: '1930-01-01',
            city: '',
            country: '',
        };

        this.toggle = this.toggle.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }    
      
    // Toggles modal visibility
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleFieldChange(fieldId, value) {
        this.setState({ [fieldId]: value });
    }

    async handleSubmit() {
        let patientTemplate =`
            {
                "resourceType": "Patient",
                "name": [
                    {
                        "family": "{{LASTNAME}}",
                        "given": [
                            "{{FIRSTNAME}}"
                        ]
                    }
                ],
                "gender": "{{GENDER}}",
                "birthDate": "{{BIRTHDATE}}",
                "address": [
                    {
                        "city": "{{CITY}}",
                        "country": "{{COUNTRY}}"
                    }
                ]
            }
        `;

        // Build JSON array from patient template
        // Better to use loop here for future improvements {{FIELD}} <-> this.state['field']
        patientTemplate = patientTemplate.replace('{{LASTNAME}}', this.state.lastname);
        patientTemplate = patientTemplate.replace('{{FIRSTNAME}}', this.state.firstname);
        patientTemplate = patientTemplate.replace('{{GENDER}}', this.state.gender);
        patientTemplate = patientTemplate.replace('{{BIRTHDATE}}', this.state.birthdate);
        patientTemplate = patientTemplate.replace('{{CITY}}', this.state.city);
        patientTemplate = patientTemplate.replace('{{COUNTRY}}', this.state.country);

        const json = JSON.parse(patientTemplate);

        let status = 0;
        let newId = 0;
        // Send request and wait for response before notify client
        await axios.post('https://stu3.test.pyrohealth.net/fhir/Patient/', {
            ...json
        })
        .then(res => {
            status = res.status;  
            newId = res.data.id;          
        });

        
        // If add is successfull
        if(status === 201) {
            // Send success notification to client
            this.props.addNotification({
                id: newId,
                icon: "plus",
                iconClassName: "text-success",
                title: "Ajout de patient",
                message: "Le patient " + this.state.lastname + " " + this.state.firstname + " ("+ newId + ") a été ajouté avec succès.",
            });
        }else{
            // Send error notification to client
            this.props.addNotification({
                id: newId,
                icon: "plus",
                iconClassName: "red-text",
                title: "Ajout de patient",
                message: "Une erreur est survenue lors de la suppression du patient " + this.state.lastname + " " + this.state.firstname,
            });
        }
        
    }

    render() {
        return (
            <>
                <MDBTooltip placement="right">
                    <MDBBtn outline color="success" style={{borderColor: 'transparent', padding:'0.5rem 0.75rem'}} onClick={this.toggle} size="sm">
                        <MDBIcon icon="plus" size="2x" />
                    </MDBBtn>
                    <div>Ajouter un patient</div>
                </MDBTooltip>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Ajouter un patient</MDBModalHeader>
                    <MDBModalBody >
                        <MDBRow>
                            <MDBCol>
                                <form>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <label htmlFor="ptLastname" className="grey-text font-weight-light">
                                                Nom
                                            </label>
                                            <input type="text" id="ptLastname" name="ptLastname" className="form-control" 
                                                onChange={(e) =>
                                                    this.handleFieldChange("lastname", e.target.value)
                                                }
                                            required/>
                                        </div>

                                        <div className="col">
                                            <label htmlFor="ptFirstname" className="grey-text font-weight-light">
                                                Prénom
                                            </label>
                                            <input type="text" id="ptFirstname" name="ptFirstname" className="form-control" 
                                                onChange={(e) =>
                                                    this.handleFieldChange("firstname", e.target.value)
                                                }
                                            required/> 
                                        </div>
                                    </div>
                                
                                    <label className="grey-text font-weight-light">
                                        Sexe
                                    </label>
                                    <div style={{display:'block'}} className='d-flex justify-content-center'>
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" className="custom-control-input" id="ptGender1" name="ptGender" value=""
                                                onChange={(e) =>
                                                    this.handleFieldChange("gender", e.target.value)
                                                }
                                            defaultChecked />
                                            <label className="custom-control-label" htmlFor="ptGender1">Autre</label>
                                        </div>

                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" className="custom-control-input" id="ptGender2" name="ptGender"  value="female"
                                                onChange={(e) =>
                                                    this.handleFieldChange("gender", e.target.value)
                                                }
                                            />
                                            <label className="custom-control-label" htmlFor="ptGender2">Homme</label>
                                        </div>

                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" className="custom-control-input" id="ptGender3" name="ptGender"  value="male"
                                                onChange={(e) =>
                                                    this.handleFieldChange("gender", e.target.value)
                                                }
                                            />
                                            <label className="custom-control-label" htmlFor="ptGender3">Femme</label>
                                        </div>
                                    </div>
                                    <br />

                                    <label htmlFor="ptBirthdate" className="grey-text font-weight-light">
                                        Date de naissance
                                    </label>
                                    <input type="date" id="ptBirthdate" name="ptBirthdate" className="form-control" defaultValue='1930-01-01'
                                        onChange={(e) =>
                                            this.handleFieldChange("birthdate", e.target.value)
                                        }
                                    />
                                    <br />

                                    <label htmlFor="ptCountry" className="grey-text font-weight-light">
                                        Pays
                                    </label>
                                    <input type="text" id="ptCountry" name="ptCountry" className="form-control" 
                                        onChange={(e) =>
                                            this.handleFieldChange("country", e.target.value)
                                        }
                                    required/>
                                    <br />

                                    <label htmlFor="ptCity" className="grey-text font-weight-light">
                                        Ville
                                    </label>
                                    <input type="text" id="ptCity" name="ptCity" className="form-control" 
                                        onChange={(e) =>
                                            this.handleFieldChange("city", e.target.value)
                                        }
                                    required/>

                                    <div className="text-center py-4 mt-3">
                                        <MDBBtn className="btn btn-outline-green" 
                                            onClick={() => 
                                                {
                                                    this.handleSubmit(); 
                                                    this.toggle();
                                                }
                                            }>
                                            Ajouter
                                            <MDBIcon icon="plus" className="ml-2" />
                                        </MDBBtn>
                                    </div>
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBModalBody>
                </MDBModal>
            </>
        );
    }
}

export default AddPatientModal;