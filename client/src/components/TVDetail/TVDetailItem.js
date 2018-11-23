import React from 'react';
import image from '../../style/no-image.jpg';
import jwt_decode from 'jwt-decode';
import StarRating from '../../style/StarRatings';

import { Col, Card, CardTitle, CardText, CardBody } from 'reactstrap';

import { Fa, CardImage, Button } from 'mdbreact';

const TVDetailItem = props => {
  const token = localStorage.usertoken;
  const decoded = jwt_decode(token);

  function handleSubmit() {
    props.onClick({
      Tv_Series_Name: props.item.show.name,
      Rating: props.item.show.rating.average,
      Overview: props.item.show.summary.replace(
        /(<p[^>]+?>|<p>|<b>|<i>|<\/p>|<\/b>|<\/i>|)/gim,
        ''
      ),
      TV_Series_Poster: props.item.show.image.original,
      id: props.item.show.id,
      Web_Site: props.item.show.officialSite,
      email: decoded.email
    });
  }

  function handleName() {
    props.onClick({
      name: props.item.show.name
    });
  }

  try {
    if (props.item.show.rating.average === null)
      props.item.show.rating.average = 'No Rating';
  } catch (err) {
    console.log(err);
  }

  try {
    if (props.item.show.summary === null)
      props.item.show.rating.average = 'This TV series got nothing to show...';
  } catch (err) {
    console.log(err);
  }

  try {
    if (props.item.show.image.original === null)
      props.item.show.image.original = image;
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
          src={props.item.show.image.original}
          alt="Card image cap"
        />
        <div className="card-footer">
          <div className="clearfix">
            <div className="float-left mt-1">
              <StarRating rating={props.item.show.rating.average} />
            </div>
            <div className="card-footer-badge float-right badge badge-primary badge-pill">
              {props.item.show.rating.average}
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
          <CardTitle>{props.item.show.name}</CardTitle>
          <hr className="style1" />
          <CardText>
            {props.item.show.summary.replace(
              /(<p[^>]+?>|<p>|<b>|<i>|<\/p>|<\/b>|<\/i>|)/gim,
              ''
            )}
          </CardText>
          <hr className="style4" />
          <div className="three-inline-buttons">
            <Button
              className="button"
              id="read-btn"
              href={props.item.show.officialSite}
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

export default TVDetailItem;
