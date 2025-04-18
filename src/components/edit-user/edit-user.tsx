import React, { useState } from 'react';
import { User } from '../../types';
import styles from './edit-user.module.css';
import { updateUser } from '../../services/usersService';

interface EditUserProps {
    user: User; // Usuario a modificar
    onUserUpdated: (updatedUser: User) => void;
}

const EditUserForm = ({ user, onUserUpdated }: EditUserProps) => {
    const [inputValues, setInputValues] = useState<User>(user);

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;
        setInputValues((prevState) => ({
            ...prevState,
            [name]: name === 'age' ? Number(value) : value
        }));
    };


    const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (!inputValues.name || !inputValues.age || !inputValues.email || !inputValues.password) {
            alert('Please fill out all required fields.');
            return;
        }
        try {
            await updateUser(inputValues); 
            onUserUpdated(inputValues); 
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={inputValues.name}
                onChange={handleChange}
                placeholder="Name"
                required
            />
            <input
                type="number"
                name="age"
                value={inputValues.age}
                onChange={handleChange}
                placeholder="Age"
                required
            />
            <input
                type="email"
                name="email"
                value={inputValues.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                value={inputValues.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            
            <button type="submit">Update User</button>
            <button type="button" onClick={() => onUserUpdated(user)}>Cancel</button>
        </form>
    );
};

export default EditUserForm;