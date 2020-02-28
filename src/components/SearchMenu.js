import React, { Component } from "react";
import {MDBBtn} from "mdbreact";
import SearchOpt from "./SearchOpt";

class SearchMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleOptionChanges = this.handleOptionChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
      
    handleFieldChange(fieldId, value) {
        this.setState({ [fieldId]: value });
        
        //console.log(this.state)
    }

    handleOptionChanges(fieldId, optName, value) {        
        if (this.state[fieldId]){
            let newArr = this.state[fieldId];
            newArr[optName] = value;
            
            this.setState({
                [fieldId]: newArr,
            });
        }
            
        //console.log(this.state)
    }

    handleSubmit(){
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h4 style={styles.title}>Affinez votre recherche</h4>
                <SearchOpt id="family" title="Nom" onChange={this.handleFieldChange} content={
                    <div>
                        <div className="d-flex justify-content-center" style={{marginBottom: '0.3rem'}}>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="lastnameRadioOpt1" name="lastnameMatchMethod" 
                                    onChange={() => (
                                        this.handleOptionChanges('family', 'match', '')
                                    )} 
                                defaultChecked />
                                <label className="custom-control-label" htmlFor="lastnameRadioOpt1">Défaut</label>
                            </div>

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="lastnameRadioOpt2" name="lastnameMatchMethod" 
                                    onChange={() => (
                                        this.handleOptionChanges('family', 'match', 'contains')
                                    )}
                                />
                                <label className="custom-control-label" htmlFor="lastnameRadioOpt2">Contient</label>
                            </div>

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="lastnameRadioOpt3" name="lastnameMatchMethod" 
                                    onChange={() => (
                                        this.handleOptionChanges('family', 'match', 'exact')
                                    )}
                                />
                                <label className="custom-control-label" htmlFor="lastnameRadioOpt3">Exact</label>
                            </div>
                        </div>
                        <input className="form-control form-control-sm" type="text" placeholder="Nom" name="inputLastname"
                            onChange={(e) => (
                                this.handleOptionChanges('family', 'value', e.target.value)
                            )}
                        />
                    </div>
                }/>

                <SearchOpt id="given" title="Prénom" onChange={this.handleFieldChange} content={
                    <div>
                        <div className="d-flex justify-content-center" style={{marginBottom: '0.3rem'}}>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="surnameRadioOpt1" name="surnameMatchMethod" 
                                    onChange={() => (
                                        this.handleOptionChanges('given', 'match', '')
                                    )}
                                defaultChecked />
                                <label className="custom-control-label" htmlFor="surnameRadioOpt1">Défaut</label>
                            </div>

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="surnameRadioOpt2" name="surnameMatchMethod" 
                                    onChange={() => (
                                        this.handleOptionChanges('given', 'match', 'contains')
                                    )}
                                />
                                <label className="custom-control-label" htmlFor="surnameRadioOpt2">Contient</label>
                            </div>

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="surnameRadioOpt3" name="surnameMatchMethod" 
                                    onChange={() => (
                                        this.handleOptionChanges('given', 'match', 'exact')
                                    )}
                                />
                                <label className="custom-control-label" htmlFor="surnameRadioOpt3">Exact</label>
                            </div>
                        </div>
                        <input className="form-control form-control-sm" type="text" placeholder="Prénom" name="inputSurname"
                            onChange={(e) => (
                                this.handleOptionChanges('given', 'value',  e.target.value)
                            )}
                        />
                    </div>
                }/>

                <SearchOpt id="gender" title="Sexe" onChange={this.handleFieldChange} content={
                    <div>
                        <div className="d-flex justify-content-center" style={{marginBottom: '0.3rem'}}>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="genderRadioOpt1" name="gender" 
                                    onChange={() => (
                                        this.handleOptionChanges('gender', 'value', '')
                                    )}
                                defaultChecked />
                                <label className="custom-control-label" htmlFor="genderRadioOpt1">Autre</label>
                            </div>

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="genderRadioOpt2" name="gender" 
                                    onChange={() => (
                                        this.handleOptionChanges('gender', 'value', 'male')
                                    )}
                                />
                                <label className="custom-control-label" htmlFor="genderRadioOpt2">Homme</label>
                            </div>

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="genderRadioOpt3" name="gender" 
                                    onChange={() => (
                                        this.handleOptionChanges('gender', 'value', 'female')
                                    )}
                                />
                                <label className="custom-control-label" htmlFor="genderRadioOpt3">Femme</label>
                            </div>
                        </div>
                    </div>
                }/>

                <SearchOpt id="birthdate" title="Date de naissance" onChange={this.handleFieldChange} content={
                    <div>                        
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col">
                                <label htmlFor="dateMin" style={{marginBottom:'0.1rem'}}>Date minimum</label>
                                <input type="date" id="dateMin" className="form-control form-control-sm" name="dateMin"
                                    defaultValue="1930-01-01" 
                                    onChange={(e) => (
                                        this.handleOptionChanges('birthdate', 'min', e.target.value)
                                    )}    
                                />
                            </div>

                            <div className="col">
                                <label htmlFor="dateMax" style={{marginTop:'0.6rem', marginBottom:'0.1rem'}}>Date maximum</label>
                                <input type="date" id="dateMax" className="form-control form-control-sm" name="dateMax"
                                    defaultValue="2030-01-01" 
                                    onChange={(e) => (
                                        this.handleOptionChanges('birthdate', 'max', e.target.value)
                                    )}  
                                />
                            </div>
                        </div>
                    </div>
                }/>

                <SearchOpt id="address-city" title="Ville" onChange={this.handleFieldChange} content={
                    <div>
                        <div className="d-flex justify-content-center" style={{marginBottom: '0.3rem'}}>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="cityRadioOpt1" name="cityMatchMethod" 
                                    onChange={() => (
                                        this.handleOptionChanges('address-city', 'match', '')
                                    )}
                                defaultChecked />
                                <label className="custom-control-label" htmlFor="cityRadioOpt1">Défaut</label>
                            </div>

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="cityRadioOpt2" name="cityMatchMethod" 
                                    onChange={() => (
                                        this.handleOptionChanges('address-city', 'match', 'contains')
                                    )}
                                />
                                <label className="custom-control-label" htmlFor="cityRadioOpt2">Contient</label>
                            </div>

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="cityRadioOpt3" name="cityMatchMethod" 
                                    onChange={() => (
                                        this.handleOptionChanges('address-city', 'match', 'exact')
                                    )}
                                />
                                <label className="custom-control-label" htmlFor="cityRadioOpt3">Exact</label>
                            </div>
                        </div>
                        <input className="form-control form-control-sm" type="text" placeholder="Ville" name="inputCity"
                            onChange={(e) => (
                                this.handleOptionChanges('address-city', 'value', e.target.value)
                            )}
                        />
                    </div>
                }/>

                <SearchOpt id="address-country" title="Pays" onChange={this.handleFieldChange} content={
                    <div>
                        <div className="d-flex justify-content-center" style={{marginBottom: '0.3rem'}}>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="countryRadioOpt1" name="countryMatchMethod" 
                                    onChange={() => (
                                        this.handleOptionChanges('address-country', 'match', '')
                                    )}
                                defaultChecked />
                                <label className="custom-control-label" htmlFor="countryRadioOpt1">Défaut</label>
                            </div>

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="countryRadioOpt2" name="countryMatchMethod" 
                                    onChange={() => (
                                        this.handleOptionChanges('address-country', 'match', 'contains')
                                    )}
                                />
                                <label className="custom-control-label" htmlFor="countryRadioOpt2">Contient</label>
                            </div>

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="countryRadioOpt3" name="countryMatchMethod" 
                                    onChange={() => (
                                        this.handleOptionChanges('address-country', 'match', 'exact')
                                    )}
                                />
                                <label className="custom-control-label" htmlFor="countryRadioOpt3">Exact</label>
                            </div>
                        </div>
                        <input className="form-control form-control-sm" type="text" placeholder="Pays" name="inputCountry"
                            onChange={(e) => (
                                this.handleOptionChanges('address-country', 'value', e.target.value)
                            )}
                        />
                    </div>
                }/>

                <MDBBtn color="info" size="sm" style={{width:'100%', margin:'0', marginTop: '0.6rem'}} 
                    onClick={() => (
                        this.handleSubmit()
                    )}>
                    Rechercher
                </MDBBtn>
            </div>
        );
    }
}

const styles = {
    title : {
        marginBottom: '4vh',
        fontWeight: 'bolder',
        textAlign: 'center',
    },
};

export default SearchMenu;