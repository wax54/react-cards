import React from 'react';
import { render, fireEvent} from "@testing-library/react";
import App from './App';

it("Doesn't Blow up", () => {
    render(<App />);
});

it('should match previous snapshot', function () {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
});

it("should add a new todo to the DOM", () => {
    let testText = "NEW TODO";
    const { getByLabelText, getByText} = render(<App />);

    const taskInput = getByLabelText("Task", { exact: false });

    const btn = getByText("Add Todo", { exact: false });


    fireEvent.change(taskInput, { target: { value: testText } });
    fireEvent.click(btn);

    expect(getByText(testText)).toBeInTheDocument();
});

it("should remove a TODO from the DOM when it's X is clicked", () => {
    let boxStats = {};

    const { getByLabelText, getByText, queryByText } = render(<App />);
    //setup START
    let testText = "NEW TODO";
    const taskInput = getByLabelText("Task", { exact: false });
    const btn = getByText("Add Todo", { exact: false });
    fireEvent.change(taskInput, { target: { value: testText } });
    fireEvent.click(btn);
    expect(getByText(testText)).toBeInTheDocument();
    //Setup END

    const deleteTodoBtn = getByText("X");
    fireEvent.click(deleteTodoBtn);

    expect(queryByText(testText)).not.toBeInTheDocument();
})
