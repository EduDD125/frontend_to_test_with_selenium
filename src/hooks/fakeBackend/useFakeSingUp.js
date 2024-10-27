import { useState } from "react";

export const useCreateUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [correctCreation, setCorrectCreation] = useState(null);

    const createUser = (userData) => {
        setLoading(true);
        try {    
            const userRegisteredString = localStorage.getItem("userRegistered");
            const analisableUsersRegistered = userRegisteredString ? JSON.parse(userRegisteredString) : [];
            
            const isEmailAlreadyInUse = analisableUsersRegistered.some(user => user.email === userData.email);

            if (isEmailAlreadyInUse) {
                setError("Esse e-mail já está em uso");
                throw new Error("Esse e-mail já está em uso");
            }

            const updatedUsers = [...analisableUsersRegistered, userData];
            localStorage.setItem("userRegistered", JSON.stringify(updatedUsers));

            setCorrectCreation(true);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setCorrectCreation(false);
            setError(err.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return { createUser, correctCreation, loading, error, setError };
};
