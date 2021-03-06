import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Container, Col, Row} from "../../Grid";
import {GoalInput, NewGoalFormBtn} from '../../form'
import {Card, CardBody} from "../../card";
import './home.css';
import logo from "../../../Images/openChannel_indexpic.png";
import openChannel from "../../../Images/openChannel_indexlogo.png";
import API from "../../../utils/API";
import itemAPI from '../../../utils/itemAPI'


export default class Home extends Component {
    state = {
        goalInput: '',
        goals: {},
        items: [],
        author: '',
        allEmployee: 'AllEmployees',

    };
    componentWillMount() {
        this.loadGoals();

    }
    handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    };
    loadGoals = () => {
        API.getAllEmployeeGoals()
            .then( goal => {
                console.log(goal.data);
                this.setState({
                    goalInput: '',
                    goals: goal.data[0] ? goal.data[0] : {},
                    items: goal.data.items || [],
                    author: localStorage.getItem('user_email'),

                })
            })

    };

    feedbackFormSubmit = event => {
        event.preventDefault();
        itemAPI.saveItem(this.state.goals._id, {
            text: this.state.goalInput,
            author: this.state.author
        })
            .then(response => {
                console.log(response);
                this.loadGoals();
            })
    };
    login() {
        this.props.auth.login();
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            <div>
                {
                    isAuthenticated() && (
                        <Container fluid>
                            <Row>
                                <Col size="sm-6">
                                    <h1>PIPELINE</h1>

                                    <Card>

                                        <CardBody className="text-box">

                                            {Object.keys(this.state.goals).length ?
                                                <h3>{this.state.goals.title}</h3> :
                                                <h3>Nothing to display</h3>
                                            }

                                        </CardBody>

                                    </Card>
                                    <GoalInput
                                        className="feedbackInput"
                                        value={this.state.goalInput}
                                        name='goalInput'
                                        placeholder='Feedback'
                                        onChange={this.handleChange}
                                    />
                                    <NewGoalFormBtn onClick={this.feedbackFormSubmit}>Add Feedback</NewGoalFormBtn>
                                    <Link to={'/goals'}><NewGoalFormBtn>Take Action </NewGoalFormBtn></Link>
                                </Col>

                                <Col size='sm-6'>
                                    <div className="feedback">
                                    <h2>Feedback</h2>
                                        <div className='feedbackDisplay'>
                                    {this.state.goals.items ?
                                        this.state.goals.items.map( (item, i) => (
                                            <Card key={i}>
                                                <h5>{item.author}</h5>
                                                <p id='comment'>{item.text}</p>
                                            </Card>
                                        )) :
                                        <Card>
                                            <p>No items to display yet</p>
                                        </Card>
                                    }
                                    </div>
                                </div>


                                </Col>
                            </Row>
                        </Container>
                    )
                }
                {
                    !isAuthenticated() && (

                        <Container fluid>
                            <Row>
                                <Col size='6'>
                                    <img src={logo} alt="openChannel logo" className="homelogo" width={'100%'}/>
                                </Col>

                                <Col size='6'>
                                    <div className="loginColumn">
                                    <img src={openChannel} alt="openChannel2" className="openChannel" width={'30%'} margin={"50px"}/>
                                    <a
                                        style={{cursor: 'pointer'}}
                                        onClick={this.login.bind(this)}
                                    >
                                        <br/>
                                        <button className='btn btn-success'>Log In</button>
                                    </a>
                                    </div>
                                </Col>

                            </Row>

                         </Container>
                    )
                }
            </div>
        );
    }
}