import React from 'react';
import StarRating from '../../style/StarRatings';
import jwt_decode from 'jwt-decode';

import { Col, Card, CardTitle, CardText, CardBody } from 'reactstrap';

import { Fa, CardImage, Button } from 'mdbreact';

const HomeItem = props => {
  const token = localStorage.usertoken;
  const decoded = jwt_decode(token);

  function handleSubmit() {
    props.onClick({
      Tv_Series_Name: props.item.name,
      Rating: props.item.vote_average,
      Overview: props.item.overview,
      TV_Series_Poster:
        'https://image.tmdb.org/t/p/w500/' + props.item.poster_path,
      id: props.item.id,
      Web_Site: 'https://www.themoviedb.org/tv/' + props.item.id,
      email: decoded.email
    });
  }

  function handleName() {
    props.onClick({
      name: props.item.name
    });
  }

  try {
    if (props.item.vote_average === 0) props.item.vote_average = 'No Rating';
  } catch (err) {
    console.log(err);
  }

  try {
    if (props.item.poster_path === null)
      props.item.poster_path = 'wwemzKWzjKYJFfCeiB57q3r4Bcm.svg';
  } catch (err) {
    console.log(err);
  }

  return (
    <Col sm="3">
      <Card id="size">
        <CardImage
          top
          width="100%"
          height="418px"
          src={'https://image.tmdb.org/t/p/w500/' + props.item.poster_path}
          alt="Card image cap"
        />
        <div className="card-footer">
          <div className="clearfix">
            <div className="float-left mt-1">
              <StarRating rating={props.item.vote_average} />
            </div>
            <div className="card-footer-badge float-right badge badge-primary badge-pill">
              {props.item.vote_average}
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
          <CardTitle>{props.item.name}</CardTitle>
          <hr className="style1" />
          <CardText>{props.item.overview}</CardText>
          <hr className="style4" />
          <div className="three-inline-buttons">
            <Button
              className="button"
              id="read-btn"
              href={'https://www.themoviedb.org/tv/' + props.item.id}
              target="_blank"
            >
              About <Fa className="fa-lg" icon="info-circle" />
            </Button>
            <Button
              className="button"
              onClick={handleName}
              id="read-btn"
              href="https://aqueous-hollows-45184.herokuapp.com/detail"
              target="_blank"
            >
              More Tv Series <Fa className="fa-lg" icon="tv" />
            </Button>
            <hr className="style4" />
          </div>
          <Button id="save-btn" onClick={handleSubmit}>
            <Fa className="fa-lg" icon="heart" />
          </Button>
        </CardBody>
      </Card>
    </Col>
  );
};

export default HomeItem;
