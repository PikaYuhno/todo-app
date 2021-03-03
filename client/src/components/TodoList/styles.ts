import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;    
    justify-content: center;
    align-items: center;
`;

export const List = styled.div`
    width: 500px;
    padding: 10px 0;
    & > * {
        margin: 10px 0;
    }
`;
