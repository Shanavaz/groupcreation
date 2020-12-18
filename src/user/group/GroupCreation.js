import React, { Component } from 'react';
import user_new from '../../assets/images/user_new.png';
// import Modal from "react-bootstrap/Modal";
import Modal from "react-modal";
import '../../App.css'
import axios from 'axios'
// import '../../assets/css/userdefined.css'
// import { Card, Icon, Image } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

class GroupCreation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: true,
            usersArray: [],
            image: user_new,

        }
    }

    componentDidMount() {
        var url = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json'
        axios.get(url)
            .then(result => {
                this.setState({
                    usersArray: result.data
                })
            })
    }

    showModal = () => {
        this.setState({
            isModalOpen: true
        })
    };

    hideModal = () => {
        this.setState({
            isModalOpen: false
        })
    };

    sortBy = (e) => {
        console.log(e.target.value)
        if (e.target.value === 'asc') {
            var ascArray = (this.state.usersArray).sort(this.sortByPropertyAsc("name"));
            this.setState({
                usersArray: ascArray
            })
        } else if (e.target.value === 'desc') {
            var ascArray = (this.state.usersArray).sort(this.sortByPropertyDesc("name"));
            this.setState({
                usersArray: ascArray
            })
        }
    }

    sortByPropertyAsc(property) {
        return function (a, b) {
            if (a[property] > b[property])
                return 1;
            else if (a[property] < b[property])
                return -1;

            return 0;
        }
    }

    sortByPropertyDesc(property) {
        return function (a, b) {
            if (a[property] > b[property])
                return -1;
            else if (a[property] < b[property])
                return 1;

            return 0;
        }
    }

    onImageChanged = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ image: e.target.result });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            this.setState({
                image: URL.createObjectURL(event.target.files[0])
            });
        }
    }


    render() {

        const bg = {
            overlay: {
                background: "black"
            }
        };

        return (
            <React.Fragment>
                <button onClick={this.showModal}>Display Modal</button>
                <Modal
                    isOpen={this.state.isModalOpen}
                    onRequestClose={this.hideModal}
                    contentLabel="My dialog"
                    style={bg}
                >
                    <div >
                        <div onClick={this.hideModal} style={{ cursor: "pointer", textAlign: "right" }}>X</div>
                        <center>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div colSpan="2">
                                                <img id="target" style={{ "borderRadius": "10px", "height": "100px", "width": "100px" }} src={this.state.image}/>
                                                <input type="file" onChange={this.onImageChange} className="filetype" id="group_image" />
                                                {/* <input type="file" src={user_new} width="30px" /> */}
                                                {/* <img style={{ "borderRadius": "10px" }} src={user_new}></img> */}
                                                {/* <input></input> */}
                                            </div></td>
                                        <td style={{ "width": "40%" }}>
                                            <table >
                                                <tr style={{ "alignContent": "left" }}>
                                                    <td>Name</td>
                                                </tr>
                                                <tr>
                                                    <td >Description</td>
                                                </tr>
                                            </table>
                                        </td>
                                        <th style={{ "width": "35%" }}>
                                            <table>
                                                <tr>
                                                    <td><input style={{ "borderRadius": "30px", "textAlign": "center" }} placeholder="group name"></input></td>
                                                </tr>
                                                <tr>
                                                    <td><input style={{ "borderRadius": "30px", "textAlign": "center" }} placeholder="group description"></input></td>
                                                </tr>
                                            </table>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                            Sort By Name: <select onChange={this.sortBy}>
                                <option >-Select-</option>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                            <div>
                                {this.state.usersArray.map((row, index) => {
                                    return <div key={index} style={{ "border": "1px solid", "width": "150px", "display": "inline-block", "borderRadius": "10px" }}>
                                        <img src={row.Image} style={{ "height": "100px", "width": "100px" }}></img>
                                        <input type="checkbox"></input>
                                        <div style={{ "backgroundColor": "#559efd" }}>{row.name}</div>
                                    </div>
                                })}
                            </div>
                            <table>
                                <tr>
                                    <td><button style={{ "backgroundColor": "#559efd" }}><p style={{ "color": "white", "borderRadius": "10px" }}>Update</p></button></td>
                                    <td><button style={{ "backgroundColor": "red" }}><p style={{ "color": "white", "borderRadius": "10px" }}>Remove</p></button></td>
                                </tr>
                            </table>
                        </center>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

export default GroupCreation;