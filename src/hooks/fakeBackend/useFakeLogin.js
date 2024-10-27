import { useState } from "react";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [correctLogin, setCorrectLogin] = useState(null);

    const login = (userData) => {
        setLoading(true);
        try {    
            const userRegisteredString = localStorage.getItem("userRegistered");
            const analisableUsersRegistered = userRegisteredString ? JSON.parse(userRegisteredString) : [];
            
            const isAnyUseRegistered = analisableUsersRegistered.length > 0;

            if (isAnyUseRegistered) {
                const user = analisableUsersRegistered.filter( user => user.email === userData.email && user.senha === userData.senha);
                if (user.length === 0) {
                    throw new Error("email ou senha incorretos");
                }
                else {
                    console.log("user: ", user)
                }
            }
            else {
                setError("Esse e-mail já está em uso");
                throw new Error("Esse e-mail já está em uso");
            }

            setCorrectLogin(true);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setCorrectLogin(false);
            setError(err.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return { login, correctLogin, loading, error, setError };
};
