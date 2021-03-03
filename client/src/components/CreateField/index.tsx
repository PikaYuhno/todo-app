import React from 'react';
import { Todo } from '../../types';
import * as S from './styles';

type CreateFieldState = {
    todoName: string;
}

type CreateFieldProps = {
    addTodo: (todo: Todo) => void;
}

class CreateField extends React.Component<CreateFieldProps, CreateFieldState> {
    constructor(props: CreateFieldProps) {
        super(props);

        this.state = {
            todoName: ''
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({todoName: e.target.value});
    }

    handleSubmit = async (e: any) => {
        e.preventDefault();
        const response = await fetch(`/api/v1/tasks/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.todoName
            })
        });
        if(response.status === 201) {
            const json = await response.json();
            this.props.addTodo(json);
        }
        this.setState({todoName: ''});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <S.InputWrapper>
                    <S.TextField onChange={this.handleChange} placeholder="New task..."/>
                    <S.Icon />
                </S.InputWrapper>
            </form>
        );
    }
}

export default CreateField;