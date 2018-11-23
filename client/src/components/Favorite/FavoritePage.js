import React from 'react';
import SavedContent from './FavoriteItem';
import {
  Container,
  Row,
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const FavoritePage = props =>{
  const saveditem = props.item;
  let res;

  if(saveditem.length>0){
    res = saveditem.map((res,index) => 
    <SavedContent item={res} key={index} onClick={props.onClick}/>
    );
  }

  return (
    <div>
      <Container>
        <Row>{res}</Row>
      </Container>
    </div>
  );
};

export default FavoritePage;
