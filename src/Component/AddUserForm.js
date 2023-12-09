import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, logout, getAllUsers, UpdateUser, DeleteUser } from '../Features/User/UserSlice';
import { useNavigate } from 'react-router-dom';
import DeleteModal from './DeleteModal';
import User from '../Pages/User';
const AddUserForm = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [Id, setId] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {All_Users} = useSelector((state) => state.user)
    const [isloading, setIsLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const handleSubmit = (e) => {
    e.preventDefault();
    if(editingUser){
        dispatch(UpdateUser({Id, userId, password, role}))
    }
    else{
        
        const newUser = {
            userId,
            password,
            role,
          };
        dispatch(addUser(newUser))
    }
    setUserId('');
    setPassword('');
    setRole('');
    setEditingUser(null);
    };
    const handleCancelEdit = () => {
        setUserId('');
        setPassword('');
        setRole('');
        setEditingUser(null);
        setId('');
    };
    const getAllUser = () => {
        setIsLoading(true)
        dispatch(getAllUsers())
        setIsLoading(false)
    }
    const handleEditClick = (user) => {
        // toast.info('Kindly input the changes in the form')
        toast.warn('Kindly input the changes in the form')
        setUserId(user.userId);
        setId(user.id)
        // setPassword(user.password);
        setRole('user');
        setEditingUser(user);
    };
    const handleDeleteClick = (user) => {
        setUserToDelete(user.id);
        setIsDeleteModalOpen(true);
    }
    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
    };

    const handleDeleteConfirm = (userToDelete) => {
        dispatch(DeleteUser({Id:userToDelete}));
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
    };
    return (
        <div>
            <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
            <button style={{position:'absolute', left:'95vw', top:'2vh'}} onClick={() => {
                dispatch(logout())
                navigate('/')
                }}>Logout</button>
                
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>User ID:</label>
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required={!editingUser} />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required={!editingUser} />

                <label>Role:</label>
                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required={!editingUser} />
                <button type="submit">{editingUser ? 'Update User' : 'Add User'}</button>
                {editingUser && <button onClick={handleCancelEdit}>Cancel Edit</button>}
            </form>

            <h2>All Users</h2>
            <button onClick={getAllUser}>Get All Users</button>
            <div style={{ maxHeight: '200px', overflowY: 'auto', background:'gray', margin:'20px', padding:'10px'}}>
            {!isloading && 
                All_Users.map((user) => {
                    return(
                    <ul key={user.id}>  
                        <li>{user.userId}</li>
                        <button onClick={() => handleEditClick(user)} disabled={editingUser}>{editingUser ? 'Editing': 'Edit'}</button>
                        <button onClick={() => handleDeleteClick(user)}>Delete</button>
                    </ul>
                    )
                    
                })
            }
           
            </div>
            {isDeleteModalOpen && (
                <DeleteModal
                    onCancel={handleDeleteCancel}
                    onConfirm={() => handleDeleteConfirm(userToDelete)}
                />
            )}
        </div>
    );
};

export default AddUserForm;
