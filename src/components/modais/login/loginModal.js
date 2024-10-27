import { useEffect, useState } from "react";
import "./loginModalStyle.css"
import { useLogin } from "../../../hooks/fakeBackend/useFakeLogin";
import { useNavigate } from "react-router-dom";

export default function LoginModal({setIsModalLoginOpen}) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const {login, data, loading, error, setError} = useLogin();
    const navigate = useNavigate();



    function handleClose() {
        setIsModalLoginOpen(false);
    }

    async function handleLogin(e) {
        e.preventDefault()

        let userData = {email, senha};

        setError("");
        try {
            login(userData); // Aguarda o login ser processado
        } catch (err) {
            console.log(error || err); // Captura e exibe erros
        }
    }

    useEffect(() => {
        if (data) {
            navigate("/user"); // Redireciona se login bem-sucedido
        } else if (error) {
            console.log("Login falhou: ", error); // Exibe erro se houver
        }
    },[data, error, navigate])

    return (
        <div className="login-modal__backgroud" onClick={() => {handleClose()}}>
            <div className="login-modal__container" onClick={e => e.stopPropagation()}>
            <div className="modal-title">
                    <h2>Login</h2>
                </div>
                <form onSubmit={(e) => handleLogin(e)}>
                    <label> email:
                        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} required />
                    </label>
                    <label> senha:
                        <input type="password" name="senha" onChange={(e) => setSenha(e.target.value)} required />
                    </label>
                    
                    {error && <p className="error-message">{error}</p>}
                    <div className="button-area">
                        <button onClick={handleClose}>cancel</button>
                        {!loading ?
                            <button type="submit" >login</button>
                        :
                            <button type="submit" readOnly>Submitting</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}