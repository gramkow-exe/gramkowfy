import React from 'react';

import { Container, Label } from './styles';

function Card() {
  return(
      <Container>
          <header>
              <Label color="#7159C1"/>
          </header>
        <p>Fazer a migração completa de servidor</p>
        <img alt='avatar' src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Hearts&eyebrowType=Default&mouthType=Default&skinColor=Light'/>
      </Container>
  );
}

export default Card;