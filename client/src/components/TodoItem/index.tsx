import React from 'react';
import * as S from './styles';
import {DateTime} from 'luxon';
import {CSSTransition} from 'react-transition-group';
import {Todo, Priority} from '../../types';

type TodoItemState = {
    isDown: boolean;
    changesDone: boolean;
    todo: Todo;
}

type TodoItemProps = {
    id: number;
    name: string;
    dueto: Date;
    notes: string;
    done: boolean;
    priority: Priority;
    isDown: boolean;
    openDropdown: () => void;
    removeTodo: () => void;
}

export default class TodoItem extends React.Component<TodoItemProps, TodoItemState> {
    constructor(props: TodoItemProps) {
        super(props);
        this.state = {
            isDown: false,
            changesDone: true,
            todo: {
                id: props.id,
                name: props.name,
                dueto: props.dueto,
                notes: props.notes,
                done: props.done,
                priority: props.priority
            }
        };
    }

    setNewDate = (days = 0) => {
        this.setState({changesDone: false});
        let dt = days > 0 ? DateTime.now().plus({day: days}) : DateTime.now();
        this.setState(state => ({todo: {...state.todo, dueto: new Date(dt.toISODate())}}));
    }

    toggleDropdown = () => {
        this.setState({isDown: !this.state.isDown});
    }

    handleDelete = async () => {
        await fetch(`/api/v1/tasks/delete/${this.state.todo.id}`, {method: 'DELETE'});
        this.props.removeTodo();
    }

    handleSave = async () => {
        this.setState({changesDone: true});
        const dueto = DateTime.fromJSDate(this.state.todo.dueto).toFormat('yyyy-MM-dd');
        const response = await fetch(`/api/v1/tasks/update/${this.state.todo.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...this.state.todo, dueto})
        });

        const json = await response.json();
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        let {name, value } = e.currentTarget;
        let newVal = name === "done" && "checked" in e.currentTarget ? e.currentTarget.checked : value;

        this.setState(state => ({todo: {...state.todo, [name]: name === "dueto" ? new Date(newVal as string) : newVal}, changesDone: false}), () => {
            name === "done" && this.setDone();
        });
    }

    setDone = async () => {
        const dueto = DateTime.fromJSDate(this.state.todo.dueto).toFormat('yyyy-MM-dd');
        const response = await fetch(`/api/v1/tasks/update/${this.state.todo.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...this.state.todo, dueto})
        });

        const json = await response.json();
    }

    render() {
        const duetoStr = DateTime.fromJSDate(this.state.todo.dueto).toFormat('yyyy-MM-dd');
        const deadline = DateTime.fromJSDate(this.state.todo.dueto).toFormat('dd-MM-yyyy');
        return (
            <div>
                <S.TodoWrapper>
                    <S.TodoInfoWrapper>
                        <S.TodoCheckbox defaultChecked={this.state.todo.done} onChange={this.handleChange} name="done" />
                        <S.TodoName>{this.state.todo.name}</S.TodoName>
                    </S.TodoInfoWrapper>
                    <S.TodoDropdownWrapper>
                        <S.TodoDate>{duetoStr}</S.TodoDate>
                        <S.DropdownArrow onClick={this.props.openDropdown} rotate={this.props.isDown.toString()} />
                    </S.TodoDropdownWrapper>
                </S.TodoWrapper>
                <CSSTransition
                    in={this.props.isDown}
                    timeout={200}
                    unmountOnExit
                    classNames="expanded-todo"
                >
                    <S.ExpandedTodo className="expanded-todo">
                        <S.Line />
                        <S.LeftColumn>
                            <S.TitleText>Notes</S.TitleText>
                            <S.NotesTextArea value={this.state.todo.notes} onChange={this.handleChange} name="notes"></S.NotesTextArea>
                        </S.LeftColumn>
                        <S.RightColumn>
                            <S.TitleText>Due to</S.TitleText>
                            <S.DateWrapper>
                                <S.DateButtonToday value="Today" onClick={() => this.setNewDate()} />
                                <S.DateButtonTomorrow value="Tomorrow" onClick={() => this.setNewDate(1)} />
                                <S.DateDropdown value={duetoStr} onChange={this.handleChange} name="dueto" />
                            </S.DateWrapper>
                            <S.TitleText>Priority</S.TitleText>
                            <S.PriorityDropdown value={this.state.todo.priority.toString()} name="priority" onChange={this.handleChange}>
                                <option value="NONE">None</option>
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </S.PriorityDropdown>
                            <S.ActionButtonsWrapper>
                                <S.DeleteButton value="Delete" onClick={this.handleDelete} />
                                <S.SaveButton value="Save" disabled={this.state.changesDone} onClick={this.handleSave} />
                            </S.ActionButtonsWrapper>
                        </S.RightColumn>
                    </S.ExpandedTodo>
                </CSSTransition>
            </div>
        );
    }
}
