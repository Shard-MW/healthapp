import React, { Component } from "react";
import { MDBRow, MDBInput } from "mdbreact";

class SearchOpt extends Component {
    static defaultProps = {
        title: 'Option title',
    }

    constructor(props) {
        super(props);
        this.state = { 
            show: false, 
        };

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState((state, props) =>({
            show: this.state.show ? false : true,
        }));
    }

    render() {
        return (
            <div>
                <div className="custom-control custom-checkbox"  style={this.state.show ? {...styles.headerOpt, ...styles.headerOptChecked} : {...styles.headerOpt}}>
                    <input type="checkbox" className="custom-control-input" id={"enableOpt"+this.props.id} onClick={this.handleClick}/>
                    <label className="custom-control-label" htmlFor={"enableOpt"+this.props.id} style={{paddingLeft: '0.5rem'}}>{this.props.title}</label>
                </div>                
                {/*<hr style={styles.hr}/>*/}
                {
                    this.state.show === true 
                    &&
                    <>
                        <div className="animated fadeIn fast" style={styles.contentOpt}>
                            {this.props.content}
                        </div>
                        <hr style={styles.hr}/>
                    </>
                }    
            </div>
        );
    }
}

const styles = {
    headerOpt: {
        paddingLeft:'2vw',
        //border: '1px solid black',
        borderRadius: '.25rem',
        transition: 'background-color 0.3s, color 0.3s',    
    },
    headerOptChecked: {        
        backgroundColor: '#dee2e6',
        //color: 'white',        
    },
    hr: {
        margin:'0', 
        padding:'0', 
        marginBottom: '1vh'
    },
    contentOpt: {        
        //marginBottom: '2vh',
        padding: '0.6rem 0.3rem',
    },
};

export default SearchOpt;