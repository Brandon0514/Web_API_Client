import React from 'react';
import StarRating from '../../style/StarRatings';

import {
  Col,
  Card,
  CardTitle,
  CardText,
  CardBody
} from 'reactstrap';

import { Fa, CardImage, Button } from 'mdbreact';

const FavoriteItem = props => {
  function handleDelete() {
    props.onClick({
      Tv_Series_Name: props.item.Tv_Series_Name,
      id: props.item.id
    });
  }

  function handleName() {
    props.onClick({
      name: props.item.Tv_Series_Name
    });
  }

  try {
    if (props.item.vote_average == null) props.item.vote_average = 'No Rating';
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
          src={props.item.TV_Series_Poster}
          alt="Card image cap"
        />
        <div className="card-footer">
          <div className="clearfix">
            <div className="float-left mt-1">
              <StarRating rating={props.item.Rating} />
            </div>
            <div className="card-footer-badge float-right badge badge-primary badge-pill">
              {props.item.Rating}
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
          <CardTitle>{props.item.Tv_Series_Name}</CardTitle>
          <hr className="style1" />
          <CardText>{props.item.Overview}</CardText>
          <hr className="style4" />
          <div className="three-inline-buttons">
            <Button id="read-btn" href={props.item.Web_Site} target="_blank">
              About <Fa className="fa-lg" icon="info-circle" />
            </Button>
            <Button
              className="button"
              onClick={handleName}
              id="read-btn"
              href="https://damp-garden-38136.herokuapp.com/detail"
              target="_blank"
            >
              More Tv Series <Fa className="fa-lg" icon="tv" />
            </Button>
            <hr className="style4" />
          </div>
          <Button id="delete-btn" onClick={handleDelete}>
            <Fa className="fa-lg" icon="trash" />
          </Button>
        </CardBody>
      </Card>
    </Col>
  );
};

export default FavoriteItem;
