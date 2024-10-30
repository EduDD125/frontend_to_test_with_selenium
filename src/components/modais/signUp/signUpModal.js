import { useEffect, useState } from "react";
import "./signUpModalStyle.css";
import { useCreateUser } from "../../../hooks/fakeBackend/useFakeSingUp";

export default function SignInModal({ setIsModalSignInOpen }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmsenha, setConfirmsenha] = useState("");

    const { createUser, correctCreation, loading, error, setError } = useCreateUser();

    const [nomeError, setNomeError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [senhaError, setSenhaError] = useState("");
    const [confirmSenhaError, setConfirmSenhaError] = useState("");
    const [requestError, setRequestError] = useState("");

    useEffect(() => {
        if (correctCreation) handleClose();
    }, [correctCreation]);

    function handleClose() {
        setIsModalSignInOpen(false);
    }

    function validateEmailFormat(email) {
        // Regex para validar o formato de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateFields() {
        let isValid = true;
        setNomeError("");
        setEmailError("");
        setSenhaError("");
        setConfirmSenhaError("");
        setRequestError("");

        if (!nome) {
            setNomeError("Digite um nome");
            isValid = false;
        }
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
        if (senha !== confirmsenha) {
            setConfirmSenhaError("Senha e confirmação de senha não são compatíveis");
            isValid = false;
        }

        return isValid;
    }

    async function handleFormSubmit(event) {
        event.preventDefault();

        if (!validateFields()) return;

        const userData = { nome, email, senha };

        try {
            await createUser(userData);
            if (correctCreation) handleClose();
        } catch (err) {
            setRequestError("Erro na criação do usuário. Tente novamente.");
            console.error(err);
        }
    }

    return (
        <div className="signin-modal__background" onClick={() => handleClose()}>
            <div className="signin-modal__container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-title">
                    <h2>Sign Up</h2>
                </div>
                <form onSubmit={handleFormSubmit} className="signin-modal__form">
                    <label>Nome:
                        <input 
                            type="text" 
                            name="nome" 
                            value={nome} 
                            onChange={(e) => setNome(e.target.value)} 
                        />
                        {nomeError && <p className="error-message">{nomeError}</p>}
                    </label>

                    <label>Email:
                        <input 
                            type="email" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        {emailError && <p className="error-message">{emailError}</p>}
                    </label>

                    <label>Senha:
                        <input 
                            type="password" 
                            name="senha" 
                            value={senha} 
                            onChange={(e) => setSenha(e.target.value)} 
                        />
                        {senhaError && <p className="error-message">{senhaError}</p>}
                    </label>

                    <label>Confirme a Senha:
                        <input 
                            type="password" 
                            name="confirm_senha" 
                            value={confirmsenha} 
                            onChange={(e) => setConfirmsenha(e.target.value)} 
                        />
                        {confirmSenhaError && <p className="error-message">{confirmSenhaError}</p>}
                    </label>

                    {requestError && <p className="error-message request-error">{requestError}</p>}

                    <div className="button-area">
                        <button type="button" onClick={handleClose}>Cancelar</button>
                        <button type="submit" disabled={loading}>{!loading ? "Sign Up" : "Submitting"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
