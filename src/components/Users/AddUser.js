import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../UI/Wrapper";

const AddUser = (props) => {

    const nameInputRef = useRef();
    const ageInputRef = useRef();

//   const [enteredUserName, setEnteredUserName] = useState("");
//   const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const enteredUserName = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;

    if (enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
        setError({
            title: 'Invalid input',
            message: 'Please enter a valid name and age (non-empty values).'
        });
      return;
    }
    if (+enteredAge < 1) {
        setError({
            title: 'Invalid age',
            message: 'Please enter a valid name and age (non-empty values).'
        });
      return;
    }
    props.onAddUser(enteredUserName, enteredAge);
    // setEnteredUserName("");
    // setEnteredAge("");

    nameInputRef.current.value='';
    ageInputRef.current.value='';
  };

//   const usernameChangeHandler = (event) => {
//     setEnteredUserName(event.target.value);
//   };

//   const ageChangeHandler = (event) => {
//     setEnteredAge(event.target.value);
//   };

  const errorHandler = () =>{
    setError(null);
  };

  return (
    <Wrapper>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}></ErrorModal>}
      <Card className={classes.input}>
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="username">User Name</label>
          <input
            id="username"
            type="text"
            ref={nameInputRef}
          ></input>

          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            ref={ageInputRef}
          ></input>

          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
