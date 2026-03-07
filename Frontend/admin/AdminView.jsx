import { useState, useEffect } from "react";
import { Icons } from "@shared/icons.js";
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "@styles/register_login.css";




function AdminView() { 
    





    const [pedidos, setPedidos]= useState([])

    useEffect(()=>{

         const dataFetch=  async() =>{

        try {
            const res = await fetch('https://69aa41aee051e9456fa0d454.mockapi.io/prueba/product')
        const data = await res.json()
        setPedidos(data)

        }catch (error){
            console.error("Error al obtener los datos:", error);

        }
        


        


        }
        dataFetch()
    }, []
)




    return (
        <div className="container mt-5">
            <h2 className="d-flex justify-content-center ">Panel administrativo</h2>
            <div className="row">
            <nav className="col-12 col-md-3 mb-4 ">
                <div className="d-flex flex-row flex-md-column gap-2">
                   
                
                    <h3 className="mt-md-3">Ordenar por</h3>
                    <a href="" className="text-decoration-none">Cliente</a>
                    <a href="" className="text-decoration-none">Monto</a>
                    <a href="" className="text-decoration-none">Fecha</a>
            </div>
            </nav>
            <div className="col-12 col-md-9">
            <table className="table table-striped table-hover shadow-sm">
                <thead className="thead-dark">
                    <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Correo</th>
                    <th>Direccion</th>
                     <th>Fecha</th>
                    <th>Monto</th>
                    <th>detalle</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map((data) =>(
                        <tr key={data.id}> 
                        <td>{data.id}</td>
                        <td>{data.nombre}</td>
                        <td>{data.correo}</td>
                        <td>{data.direccion}</td>
                        <td>{data.monto}</td>
                    



                        
                        
                        
                        </tr>
                    ))}


                </tbody>
            </table>
            </div>
            </div>

        </div>

    )
}

export default AdminView;