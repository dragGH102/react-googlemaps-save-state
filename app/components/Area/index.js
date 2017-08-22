/**
*
* Area
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  border: 1px solid #f00;
`;

const LeftColumn = styled.div`
  width: 40%;
  display: inline-block;
`;

const RightColumn = styled.div`
  width: 60%;
  display: inline-block;
`;

const ButtonStyled = styled.button`
  border: 1px solid #000;
  width: auto;
`;

const Area = ({ area, onDelete, hasData, onEdit }) => (<Container>
  <LeftColumn>
    <div
      contentEditable="true"
      onInput={(input) => onEdit(area.id, input.target.innerHTML)}
    >{area.name}</div>
  </LeftColumn>
  <RightColumn>{!hasData && <ButtonStyled onClick={() => onDelete(area.id)}>Delete</ButtonStyled>}</RightColumn>
</Container>);

Area.propTypes = {
  area: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  hasData: PropTypes.bool,
};

export default Area;
