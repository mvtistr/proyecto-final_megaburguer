import { useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import "@styles/home.css";
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "@styles/register_login.css";





function Login() {
    const [email, setEmail]= useState("")
    const [password, setPassword] = useState("")

    function entrar (e){
        e.preventDefault()
        if(!email || !password){
            alert('debes llenar rtodos tus datos')
        }

        else if (email === usuario || password === clave){
        alert('has ingresado a la pagina :D')
    }
    else{
        alert('Datos incorrectos')
    }

    }


  return (
    <div className=" login-container min-vh-100  d-flex flex-column justify-content-center align-items-center">
        
        <BsPersonFill size={60} className="" style={{color:'rgb(255, 135, 50)'}}  />
         <h1 className="mt-5" style={{color:'rgb(255, 135, 50)'}} >Inicio de sesion</h1>
        <form action="submit"  onSubmit={entrar} className="formulario ">
            <div className="m-3 form-floating">
            
            <input 
            className="form-control"
            type="text" 
            placeholder=""
            id="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            />
            <label htmlFor="email">Correo</label>
            </div>

            <div className="m-3 form-floating">
            
            <input
            className="form-control"
             type="Password"
             value={password}
             id="password"
             onChange={(e)=>{setPassword(e.target.value)}}
              />
              <label htmlFor="password">Contrasena</label>
              </div>

              <div className="row m-3" >
                <a href="#" style={{color: 'rgb(0,0,0'}}> Olvide contrasena</a>
                <a href="#" style={{color: 'rgb(0,0,0'}}>No tienes cuenta?, registrarse</a>
              </div>
            <div className="text-center" >
            <button className="submit m-3 rounded-pill px-4 btn "
            style={{
                backgroundColor:'rgb(255, 135, 50)',
                borderColor:'rgb(255, 135, 50)',
                color: "white"
            }}
            >Iniciar sesion</button>
            </div>
        </form>


    </div>
  );
}

export default Login;
