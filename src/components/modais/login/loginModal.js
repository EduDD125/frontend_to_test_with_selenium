import { useEffect, useState } from "react";
import "./loginModalStyle.css";
import { useLogin } from "../../../hooks/fakeBackend/useFakeLogin";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ setIsModalLoginOpen }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { login, correctLogin, loading, error, setError } = useLogin();
    const navigate = useNavigate();

    const [emailError, setEmailError] = useState("");
    const [senhaError, setSenhaError] = useState("");
    const [requestError, setRequestError] = useState("");

    function handleClose() {
        setIsModalLoginOpen(false);
    }

    function validateEmailFormat(email) {
        // Regex para validar o formato de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateFields() {
        let isValid = true;
        setEmailError("");
        setSenhaError("");
        setRequestError("");

        if (!email) {
            setEmailError("Digite um email");
            isValid = false;
        } else if (!validateEmailFormat(email)) {
            setEmailError("Formato de email inválido");
            isValid = false;
        }

        if (!senha) {
            setSenhaError("Digite uma senha");
            isValid = false;
        }

        return isValid;
    }

    async function handleLogin(e) {
        e.preventDefault();

        if (!validateFields()) return;

        const userData = { email, senha };

        try {
            await login(userData);
        } catch (err) {
            setRequestError("Erro ao tentar fazer login. Tente novamente.");
            console.log(error || err);
        }
    }

    useEffect(() => {
        if (correctLogin) {
            navigate("/user");
        } else if (error) {
            setRequestError(error);
        }
    }, [correctLogin, error, navigate]);

    return (
        <div className="login-modal__background" onClick={() => handleClose()}>
            <div className="login-modal__container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-title">
                    <h2>Login</h2>
                </div>
                <form onSubmit={handleLogin}>
                    <label> Email:
                        <input 
                            type="text" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        {emailError && <p className="error-message">{emailError}</p>}
                    </label>

                    <label> Senha:
                        <input 
                            type="password" 
                            name="senha" 
                            value={senha} 
                            onChange={(e) => setSenha(e.target.value)} 
                        />
                        {senhaError && <p className="error-message">{senhaError}</p>}
                    </label>

                    {requestError && <p className="error-message request-error">{requestError}</p>}

                    <div className="button-area">
                        <button type="button" onClick={handleClose}>Cancelar</button>
                        <button type="submit" disabled={loading}>
                            {!loading ? "Login" : "Submitting"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}