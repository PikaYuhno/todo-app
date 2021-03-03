import styled from 'styled-components';
import {PlusCircle} from '@styled-icons/boxicons-regular/PlusCircle';

export const InputWrapper = styled.div`
    position: relative;
    padding: 0 5px;
`;

export const TextField = styled.input.attrs({type: 'input'})`
    width: 100%;
    border-radius: 10px;
    border: 1px solid transparent;
    margin: 11px 0;
    outline: none;
    padding: 14px;
    padding-left: 39px;
    background: var(--grey);
    font-family: 'Lato', sans-serif;
    color: var(--fontcolor);
`;

export const Icon = styled(PlusCircle)`
    top: 25%;
    left: 10px;
    height: 32px;
    width: auto;
    position: absolute;
    border-radius: 5px;
    color: var(--fontcolor);

`;