import React from 'react';
import Content from './HomeItem';
import { Container, Row } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = props => {
  const tvshow = props.item;
  let res;

  if (tvshow.length > 0) {
    res = tvshow.map((res, index) => (
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

export default HomePage;
