import React from 'react';
import Content from './TVDetailItem';
import { Container, Row } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const TVDetail = props => {
  const tvdetail = props.item;
  let res;

  if (tvdetail.length > 0) {
    res = tvdetail.map((res, index) => (
      <Content item={res} key={index} onClick={props.onClick} />
    ));
  }

  return (
    <div>
      <Container>
        <Row>{res}</Row>
      </Container>
    </div>
  );
};

export default TVDetail;
