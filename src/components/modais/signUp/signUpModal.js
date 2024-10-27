import { useState } from "react";
import "./signUpModalStyle.css";
import { useCreateUser } from "../../../hooks/fakeBackend/useFakeSingUp";

export default function SignInModal({ setIsModalSignInOpen }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmsenha, setConfirmsenha] = useState("");

    const { createUser, correctCreation, loading, error, setError } = useCreateUser();

    function handleClose() {
        setIsModalSignInOpen(false);
    }

    async function handleFormSubmit(event) {
        event.preventDefault();

        const userData = { nome, email, senha };
           
        if(!nome)  setError("Digite um nome");
        if(!email)  setError("email inválido");
        if (senha !== confirmsenha) { 
            setError("Senha e confirmação de senha não são compatíveis");
            return;
        } else {
            createUser(userData);
            if (correctCreation) {
                console.log(correctCreation);
                handleClose();
            } else if (error) {
                console.log(error);
            }}
        }

    return (
        <div className="signin-modal__background" onClick={() => handleClose()}>
            <div className="signin-modal__container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-title">
                    <h2>Sign Up</h2>
                </div>
                <form onSubmit={handleFormSubmit} className="signin-modal__form">
                    <label>Nome:
                        <input type="text" name="nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
                    </label>

                    <label>Email:
                        <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>

                    <label>Senha:
                        <input type="password" name="senha" required value={senha} onChange={(e) => setSenha(e.target.value)} />
                    </label>

                    <label>Confirme a Senha:
                        <input type="password" name="confirm_senha" required value={confirmsenha} onChange={(e) => setConfirmsenha(e.target.value)} />
                    </label>

                    {error && <p className="error-message">{error}</p>}

                    <div className="button-area">
                        <button type="button" onClick={handleClose}>Cancelar</button>
                        <button type="submit">{!loading ? "Sign Up" : "Submitting"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
