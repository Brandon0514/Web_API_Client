import React, { Component } from 'react';
import axios from 'axios';
import '../../style/Navbar.css';
import StarRating from '../../style/StarRatings';

import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { Fa, CardImage, Button, CardText } from 'mdbreact';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVisible: false,
      title: '',
      search: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  //for popup
  onDismiss() {
    this.setState({ alertVisible: false });
  }

  //for form
  onSubmit = e => {
    e.preventDefault();
    this.setState({ alertVisible: false });

    const url = `https://damp-garden-38136.herokuapp.com/getSearch?title=${this.state.title}`;
    axios
      .get(url)
      .then(result => {
        if (result.data === 'Not Found') {
          this.setState({ alertVisible: true });
          alert('No Found');
        } else {
          this.setState({ search: result.data.results });
        }
      })
      .catch(error => {
        alert('Error: ', error);
      });
  };

  // for form field
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    let newsCard;

    newsCard = this.state.search.map((item, index) => {
      try {
        if (item.vote_average === 0) item.vote_average = 'No Rating';
      } catch (err) {
        console.log(err);
      }

      try {
        if (item.poster_path === null)
          item.poster_path = 'wwemzKWzjKYJFfCeiB57q3r4Bcm.svg';
      } catch (err) {
        console.log(err);
      }

      try {
        if (item.overview === null)
          item.overview = 'This TV series got nothing to show...';
      } catch (err) {
        console.log(err);
      }

      return (
        <Col sm="3" key={index}>
          <Card id="size">
            <CardImage
              top
              width="100%"
              height="418px"
              src={'https://image.tmdb.org/t/p/w500/' + item.poster_path}
              alt="Card image cap"
            />
            <div className="card-footer">
              <div className="clearfix">
                <div className="float-left mt-1">
                  <StarRating rating={item.vote_average} />
                </div>
                <div className="card-footer-badge float-right badge badge-primary badge-pill">
                  {item.vote_average}
                </div>
              </div>
              <div className="clearfix">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                />
              </div>
            </div>
            <CardBody>
              <CardTitle>{item.name}</CardTitle>
              <hr className="style1" />
              <CardText>{item.overview}</CardText>
              <hr className="style4" />
              <div className="three-inline-buttons">
                <Button
                  className="button"
                  id="read-btn"
                  href={'https://www.themoviedb.org/tv/' + item.id}
                  target="_blank"
                >
                  About <Fa className="fa-lg" icon="info-circle" />
                </Button>
              </div>
              {/* <Button
                  className="button"
                  onClick={handleName}
                  id="read-btn"
                  href="/detail"
                  target="_blank"
                >
                  More Tv Series <Fa className="fa-lg" icon="tv" />
                </Button> */}
              <hr className="style4" />
              {/* <Button id="save-btn" save={this.onSave}>
                <Fa className="fa-lg" icon="heart" />
              </Button> */}
            </CardBody>
          </Card>
        </Col>
      );
    });

    return (
      <div>
        <Container>
          <Jumbotron>
            <h1>TV series Search</h1>
            <p>Search for more TV series</p>
          </Jumbotron>
          <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                News not found
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="title">Enter keywords</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter keywords to search..."
                    onChange={this.onChange}
                  />
                </FormGroup>
                <button className="button" id="read-btn">
                  Search
                </button>
              </Form>
            </Col>
          </Row>
          <p />
          <Row>{newsCard}</Row>
        </Container>
      </div>
    );
  }
}
