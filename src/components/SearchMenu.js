import React, { Component } from "react";
import {MDBBtn} from "mdbreact";
import SearchOpt from "./SearchOpt";

class SearchMenu extends Component {
    render() {
        return (
            <div>
                <h4 style={styles.title}>Affinez votre recherche</h4>
                <SearchOpt id="1" title="Nom" content={
                    <div>
                        <div className="d-flex justify-content-center" style={{marginBottom: '0.3rem'}}>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="lastnameRadioOpt1" name="lastnameMatchMethod" defaultChecked/>
                                <label className="custom-control-label" htmlFor="lastnameRadioOpt1">Défaut</label>
                            </div>

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="lastnameRadioOpt2" name="lastnameMatchMethod" />
                                <label className="custom-control-label" htmlFor="lastnameRadioOpt2">Contient</label>
                            </div>

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="lastnameRadioOpt3" name="lastnameMatchMethod" />
                                <label className="custom-control-label" htmlFor="lastnameRadioOpt3">Exact</label>
                            </div>
                        </div>
                        <input className="form-control form-control-sm" type="text" placeholder="Nom" name="inputLastname"/>
                    </div>
                }/>

                <SearchOpt id="2" title="Prénom" content={
                    <div>
                        <div className="d-flex justify-content-center" style={{marginBottom: '0.3rem'}}>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="surnameRadioOpt1" name="surnameMatchMethod" defaultChecked/>
                                <label className="custom-control-label" htmlFor="surnameRadioOpt1">Défaut</label>
                            </div>

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="surnameRadioOpt2" name="surnameMatchMethod" />
                                <label className="custom-control-label" htmlFor="surnameRadioOpt2">Contient</label>
                            </div>

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="surnameRadioOpt3" name="surnameMatchMethod" />
                                <label className="custom-control-label" htmlFor="surnameRadioOpt3">Exact</label>
                            </div>
                        </div>
                        <input className="form-control form-control-sm" type="text" placeholder="Prénom" name="inputSurname"/>
                    </div>
                }/>

                <SearchOpt id="3" title="Sexe" content={
                    <div>
                        <div className="d-flex justify-content-center" style={{marginBottom: '0.3rem'}}>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="genderRadioOpt1" name="gender" defaultChecked/>
                                <label className="custom-control-label" htmlFor="genderRadioOpt1">Autre</label>
                            </div>

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="genderRadioOpt2" name="gender" />
                                <label className="custom-control-label" htmlFor="genderRadioOpt2">Homme</label>
                            </div>

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="genderRadioOpt3" name="gender" />
                                <label className="custom-control-label" htmlFor="genderRadioOpt3">Femme</label>
                            </div>
                        </div>
                    </div>
                }/>

                <SearchOpt id="4" title="Date de naissance" content={
                    <div>                        
                        <div class="row d-flex justify-content-center align-items-center">
                            <div class="col">
                                <label for="dateMin" style={{marginBottom:'0.1rem'}}>Date minimum</label>
                                <input type="date" id="dateMin" className="form-control form-control-sm" name="dateMin"
                                    value="1930-01-01" />
                            </div>

                            <div class="col">
                                <label for="dateMax" style={{marginTop:'0.6rem', marginBottom:'0.1rem'}}>Date maximum</label>
                                <input type="date" id="dateMax" className="form-control form-control-sm" name="dateMax"
                                    value="2030-01-01" />
                            </div>
                        </div>
                    </div>
                }/>

                <SearchOpt id="5" title="Ville" content={
                    <div>
                        <div className="d-flex justify-content-center" style={{marginBottom: '0.3rem'}}>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="cityRadioOpt1" name="cityMatchMethod" defaultChecked/>
                                <label className="custom-control-label" htmlFor="cityRadioOpt1">Défaut</label>
                            </div>

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="cityRadioOpt2" name="cityMatchMethod" />
                                <label className="custom-control-label" htmlFor="cityRadioOpt2">Contient</label>
                            </div>

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="cityRadioOpt3" name="cityMatchMethod" />
                                <label className="custom-control-label" htmlFor="cityRadioOpt3">Exact</label>
                            </div>
                        </div>
                        <input className="form-control form-control-sm" type="text" placeholder="Ville" name="inputCity"/>
                    </div>
                }/>

                <SearchOpt id="6" title="Pays" content={
                    <div>
                        <div className="d-flex justify-content-center" style={{marginBottom: '0.3rem'}}>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="countryRadioOpt1" name="countryMatchMethod" defaultChecked/>
                                <label className="custom-control-label" htmlFor="countryRadioOpt1">Défaut</label>
                            </div>

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="countryRadioOpt2" name="countryMatchMethod" />
                                <label className="custom-control-label" htmlFor="countryRadioOpt2">Contient</label>
                            </div>

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="countryRadioOpt3" name="countryMatchMethod" />
                                <label className="custom-control-label" htmlFor="countryRadioOpt3">Exact</label>
                            </div>
                        </div>
                        <input className="form-control form-control-sm" type="text" placeholder="Pays" name="inputCountry"/>
                    </div>
                }/>

                <MDBBtn color="info" size="sm" style={{width:'100%', margin:'0', marginTop: '0.6rem'}}>Rechercher</MDBBtn>
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