import React, { useState, useEffect } from "react";
import { User } from '../../types';
import styles from './UsersList.module.css'; // Import CSS module
import  EditUserForm  from '../edit-user/edit-user'; // Import the EditUserForm component


interface Props {
    users: User[];
}

const UsersList: React.FC<Props> = ({ users }) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null); // Estado para el usuario seleccionado
    const [isEditing, setIsEditing] = useState(false); // Estado para mostrar/ocultar el formulario
    const [ Users, setUsers ] = useState<User[]>(users); // Estado para la lista de usuarios

    useEffect(() => {
        setUsers(users);
    }, [users]);


    const handleUserClick = (user: User) => {
        setSelectedUser(user); // Establece el usuario seleccionado
        setIsEditing(true); // Muestra el formulario de edición
        
    };

    const handleUserUpdated =  async (updatedUser: User) => {
        console.log("User updated:", updatedUser);
        const updatedUsers = users.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
        );
        setUsers(updatedUsers);
        setIsEditing(false); // Oculta el formulario después de la actualización

        console.log("Users refreshed:", updatedUsers);
    };

   

    const renderList = (): React.ReactNode[] => {
        return Users.map((user) => (
            
            <li key={user.name} className={styles.listItem} onClick={() => handleUserClick(user)}>
                <div className={styles.userInfo}>
                    <h2 className={styles.user}>{user.name}</h2>
                    <h3 className={styles.age}>Age: {user.age}</h3>
                    <p className={styles.email}>{user.email}</p>
                </div>
            </li>

        ));
    };

    return (
    <div>
        <ul className={styles.list}>
            {renderList()}
        </ul>
        {isEditing && selectedUser && ( // Renderiza el formulario si se está editando
            <EditUserForm
                user={selectedUser}
                onUserUpdated={handleUserUpdated}
            />
        )}
    </div>
    );
};

export default UsersList;