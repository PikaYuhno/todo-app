import styled from 'styled-components/macro';
import {AngleDown} from '@styled-icons/fa-solid/AngleDown';

export const Todo = styled.div`
    background-color: red;
`;

export const TodoWrapper = styled.div`
    background: #fdfdfd;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ChildWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    & > * {
        margin: 5px;
    }
`;

export const TodoInfoWrapper = styled(ChildWrapper)``;

export const TodoDropdownWrapper = styled(ChildWrapper)``;

export const TodoDate = styled.span`
    background: var(--grey);
    border-radius: 5px;
    padding: 10px;
    color: var(--fontcolor);
    font-family: 'Lato', sans-serif;

    transition: all 200ms ease;

    &:hover {
        background: var(--hover);
    }
`;

export const TodoName = styled.span`
    color: var(--fontcolor);
    font-family: 'Lato', sans-serif;
`;

export const DropdownArrow = styled(AngleDown)`
    padding: 10px;
    border-radius: 5px;
    background: var(--grey);
    color: var(--fontcolor);

    height: 39px;
    width: 39px;

    cursor: pointer;
    transition: all 200ms ease;

    transform: rotate(${props => props.rotate && props.rotate === "true" ? '180deg' : '0deg'});

    &:hover {
        background: var(--hover);
    }
`;

export const TodoCheckbox = styled.input.attrs({type: 'checkbox'})`
    appearance: none;
    background-color: var(--grey);
	padding: 12px;
	border-radius: 5px;
	display: inline-block;
	position: relative;
    transition: all 200ms ease;
    &:checked {
        background: var(--darkgreen);
        border-radius: 50%;
    }
    &:checked:after {
        content: '${String.fromCodePoint(0x2714)}';
        position: absolute;
        top: -7px;
        left: -1px;
        transform: translate(50%, 50%);
        color: white;
        font-size: 16px;
    }
    &:focus {
        outline: none;
    }
`;

export const ExpandedTodo = styled.div`
    background: #fdfdfd;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    position: relative;

    display: flex;

    &.${props => props.className && props.className}-enter {
        opacity: 0;
    }
    &.${props => props.className && props.className}-enter-active {
        opacity: 1;
        transition: opacity 200ms;
    }
    &.${props => props.className && props.className}-exit {
        opacity: 1;
    }
    &.${props => props.className && props.className}-exit-active {
        opacity: 0;
        transition: opacity 200ms;
    }
`;

export const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 10px;

    & > * {
        margin: 3px 0;
    }
`;

export const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 10px;

    & > * {
        margin: 3px 0;
    }
`;

export const TitleText = styled.span`
    font-size: 14px;
    color: var(--fontcolor);
`;

const Dropdown = styled.select`
    border: 1px solid var(--grey);
    padding: 4px;
    background: white;

    &:focus {
        outline: none;
    }
`;

export const PriorityDropdown = styled(Dropdown)`
    border-radius: 5px;
`;

export const DateDropdown = styled.input.attrs({type: 'date'})`
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    flex: 2.5;
    border: 1px solid var(--grey);
    padding: 4px;
    background: white;
    cursor: pointer;

    &:focus {
        outline: none;
    }
    &:hover {
        background: var(--grey)
    }
`;

export const NotesTextArea = styled.textarea`
    height: 100%;
    border: 1px solid var(--grey);
    resize: none;
    padding: 4px;
    border-radius: 5px;

    &:focus {
        outline: none;
    }
`;

export const Line = styled.div`
    position: absolute;
    width: 95%;
    height: 2px;
    background: var(--grey);
    
    left:0;
    right:0;

    margin-left: auto;
    margin-right: auto;
`;

const Button = styled.input.attrs({type: 'button'})`
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 4px;
    background: var(--grey);
    cursor: pointer;
`;

export const DeleteButton = styled(Button)`
    width: 100px;
    background: #dc3545;
    color: white;

    &:hover {
        background: #bb2d3b;
    }
`;

export const SaveButton = styled(Button)`
    width: 100px;
    ${props => props.disabled && props.disabled ? `
        cursor: not-allowed;
    `:`
        &:hover {
            background: var(--hover);
        }
    `}
`;

export const DateWrapper = styled.div`
    display: flex;
`;

export const DateButtonToday = styled.input.attrs({type: 'button'})`
    border: 1px solid var(--grey);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 5px;
    cursor: pointer;

    background: white;

    &:focus {
        outline: none;
    }
    &:hover {
        background: var(--grey)
    }
    flex: 1;
`;

export const DateButtonTomorrow = styled.input.attrs({type: 'button'})`
    border: 1px solid var(--grey);
    padding: 5px;
    background: white;
    cursor: pointer;

    &:focus {
        outline: none;
    }
    &:hover {
        background: var(--grey)
    }
    flex: 1;
`;

export const ActionButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
`;