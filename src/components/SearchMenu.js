import React, { Component } from "react";
import {MDBBtn} from "mdbreact";
import SearchOpt from "./SearchOpt";

const BIRTHDATE_DEFAULT_MIN = '1930-01-01', BIRTHDATE_DEFAULT_MAX = '2030-01-01';

class SearchMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleOptionChanges = this.handleOptionChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    // Enable/Disasble a field for search
    handleFieldChange(fieldId, value) {
        this.setState({ [fieldId]: value });
    }

    // Build the search data for each fields
    handleOptionChanges(fieldId, optName, value) {        
        if (this.state[fieldId]){
            let newArr = this.state[fieldId];
            newArr[optName] = value;

            this.setState({
                [fieldId]: newArr,
            });
        }
    }

    // Execute the search and re-render patient table (results)
    handleSubmit(){
        // Better to use switch there
        let searchParams = {
            _count: 200,
        };

        // Check if "family" field is enabled, determine the match method and the value requested
        // Same routine for all fields
        if(this.state.family){
            searchParams[this.state.family.match === 'contains' 
                            ? 'family:contains'
                            : this.state.family.match === 'exact'
                                ? 'family:exact'
                                : 'family'
                        ] = this.state.family.value ? this.state.family.value : '';
        }

        if(this.state.given){
            searchParams[this.state.given.match === 'contains' 
                            ? 'given:contains'
                            : this.state.given.match === 'exact'
                                ? 'given:exact'
                                : 'given'
                        ] = this.state.given.value ? this.state.given.value : '';
        }

        if(this.state.gender){
            searchParams['gender'] = this.state.gender.value ? this.state.gender.value : '';
        }

        if(this.state.birthdate){
            searchParams['birthdate=>'] = this.state.birthdate.min ? this.state.birthdate.min : BIRTHDATE_DEFAULT_MIN;
            searchParams['birthdate=<'] = this.state.birthdate.max ? this.state.birthdate.max : BIRTHDATE_DEFAULT_MAX;
        }

        if(this.state['address-city']){
            searchParams[this.state['address-city'].match === 'contains' 
                            ? 'address-city:contains'
                            : this.state['address-city'].match === 'exact'
                                ? 'address-city:exact'
                                : 'address-city'
                        ] = this.state['address-city'].value ? this.state['address-city'].value : '';
        }

        if(this.state['address-country']){
            searchParams[this.state['address-country'].match === 'contains' 
                            ? 'address-country:contains'
                            : this.state['address-country'].match === 'exact'
                                ? 'address-country:exact'
                                : 'address-country'
                        ] = this.state['address-country'].value ? this.state['address-country'].value : '';
        }

        // Pass searchParams to parent component
        this.props.handleSearch(searchParams);
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
                            {/*
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="genderRadioOpt1" name="gender" 
                                    onChange={() => (
                                        this.handleOptionChanges('gender', 'value', '')
                                    )}
                                defaultChecked />
                                <label className="custom-control-label" htmlFor="genderRadioOpt1">Autre</label>
                            </div>
                            */}

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="genderRadioOpt2" name="gender" 
                                    onChange={() => (
                                        this.handleOptionChanges('gender', 'value', 'male')
                                    )}
                                defaultChecked />
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
                                    defaultValue={BIRTHDATE_DEFAULT_MIN}
                                    onChange={(e) => (
                                        this.handleOptionChanges('birthdate', 'min', e.target.value)
                                    )}    
                                />
                            </div>

                            <div className="col">
                                <label htmlFor="dateMax" style={{marginTop:'0.6rem', marginBottom:'0.1rem'}}>Date maximum</label>
                                <input type="date" id="dateMax" className="form-control form-control-sm" name="dateMax"
                                    defaultValue={BIRTHDATE_DEFAULT_MAX} 
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