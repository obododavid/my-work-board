import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    min-height: 5rem;
    color: #000000;
    background-color: #ffffff;
    font-size: 16px;
    font-weight: 400;
    padding: 1rem 0.5rem 0.5rem 1rem;
    margin-bottom: 1rem;
    border: none;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);
    outline: none;
    cursor: pointer;
    opacity: 0.3;
    display: none;
`

const CardPlaceholder: React.FunctionComponent = () => {

    return (
        <Wrapper>
            <span></span>
        </Wrapper>
    )
}

export default CardPlaceholder;