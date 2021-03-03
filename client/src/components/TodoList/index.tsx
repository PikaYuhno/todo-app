import React from 'react';
import TodoItem from '../TodoItem';
import {Container, List} from './styles';
import {Todo, Priority} from '../../types';
import {DragDropContext, Droppable, Draggable, DropResult} from 'react-beautiful-dnd';
import CreateField from '../CreateField';

type TodoListState = {
    todos: Todo[];
    openedId: number;
    isDown: boolean;
    isLoading: boolean;
}

export default class TodoList extends React.Component<{}, TodoListState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            todos: [],
            openedId: -1,
            isDown: false,
            isLoading: true
        }
    }

    async componentDidMount() {
        const res = await fetch(`/api/v1/tasks/get`);
        const json = await res.json();
        let sortedTodos = [];
        let todos: any = localStorage.getItem("todos");
        if (todos) {
            todos = JSON.parse(todos);
            for (let i = 0; i < todos!.length; i++) {
                //sortedTodos.push(json.find(el => el.id === todos[i].id));
            }
        }
        this.setState({todos: json, isLoading: false});
    }

    openDropdown = (todoId: number) => {
        this.setState({openedId: todoId, isDown: todoId === this.state.openedId ? !this.state.isDown : true});
    }

    removeTodo = (todoId: number) => {
        this.setState({todos: this.state.todos.filter((todo: Todo) => todo.id !== todoId)});
    }

    renderTodos = () => {
        const {openedId, isDown} = this.state;
        return this.state.todos?.map((todo: Todo, index) => {
            return (<Draggable key={todo.id} index={index} draggableId={todo.id.toString()}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <TodoItem
                            id={todo.id}
                            name={todo.name}
                            dueto={new Date(todo.dueto)}
                            notes={todo.notes}
                            done={todo.done}
                            priority={Priority[todo.priority.toUpperCase() as Priority]}
                            isDown={todo.id === openedId && isDown}
                            openDropdown={() => this.openDropdown(todo.id)}
                            removeTodo={() => this.removeTodo(todo.id)}
                        /></div>
                )}


            </Draggable>);
        });
    }

    handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        //console.log(result);

        let todos = Array.from(this.state.todos);
        let [removedTodo] = todos.splice(result.source.index, 1);
        todos.splice(result.destination.index, 0, removedTodo);

        this.setState({todos});
        localStorage.setItem("todos", JSON.stringify(todos.map((todo: Todo) => todo.id)));
    }

    addTodo = (todo: Todo) => {
        this.setState(state => ({todos: [...state.todos, todo]}));
    }

    render() {
        return (
            <>
                <Container>
                    <DragDropContext onDragEnd={this.handleDragEnd}>
                        <Droppable droppableId="droppable-area">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="droppable-area">
                                    <List>
                                        {this.renderTodos()}
                                        {provided.placeholder}
                                        {!this.state.isLoading && <CreateField addTodo={this.addTodo} />}
                                    </List>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Container>
            </>
        );
    }
}
