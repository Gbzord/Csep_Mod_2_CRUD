import { useState,useEffect } from "react";
import axios from "axios";

export default function AdminUser(){

    //Info usuarios
    const[email,setEmail] = useState("");
    const[confemail,setConfEmail] = useState("");
    const[senha,setSenha] = useState("");
    const[nome, setNome] = useState("");
    const[cpf,setCpf] = useState("");
    const[funcaoselecionada,setFuncaoSelecionada] = useState("Vendedor");

    //Erro e Enviar
    const[usuarios,setUsuarios] = useState([]);
    const[erro,setErros] = useState({});
    const[podeEnviar,setpodeEnviar] = useState(false);

    //useEffect Principal

    useEffect(() =>{
        
        const emailValido = email.includes("@") && email.includes(".");
        const emailsIguais = email === confemail;
        const senhasValidas = senha.length >= 6;
        const senhasIguais = senha === confSenha;
        const cpfValido = cpf.length === 11;

    setErros({
        email:
        emailValido  && emailsIguais ? "" : "Emails Inválidos",
        senha:
        senhasValidas && senhasIguais ? "" : "Senhas Inválidas"
    })
    setpodeEnviar(
        cpfValido && emailValido && emailsIguais && senhasIguais && senhasValidas
    )
    },[email,confemail,senha,confSenha]);

    //handleSubmit

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("/api/usuarios",{
                nome:nome,
                cpf:cpf,
                senha:senha,
                perfil:funcaoselecionada,
            });
            if(response.status === 201){
                alert("Cadastro Realizado Com Sucesso!");

                carregarUsuarios();
            }else{
                alert("Erro ao Cadastrar Usuario")
            }
        }catch(error){
            alert("Erro ao conectar servidor")
        }
    };

    async function carregarUsuarios(){
        const res = await fetch("/api/usuarios");
        const json = await res.json();
        setUsuarios(json || []);
        console.log(usuarios);
    }

    useEffect(()=>{
        carregarUsuarios();
    },[]);

    
    async function deletarUsuarios(){
    
        await fetch(`/api/usuarios?id=${id}`,{method:"DELETE"});
        carregarUsuarios();
    }

    return(
        <div id="crud-user" className="min-h-screen bg-gray-100 flex items-center justify-center px-4 mt-5">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center mb-6"> Gerenciar Usuários</h1>
                <form onSubmit={handleSubmit} noValidate className="space-y-4 mb-8">
                    <div className="mb-4">
                        {""}
                        <label className="block mb-1 text-gray-700 font medium">
                            Nome Completo:
                        </label>{""}
                        <input type="text" 
                        className="w-full px-4 py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        value={nome} 
                        onChange={(e)=>setNome(e.target.value)}
                        required></input>
                    </div>
                    <div className="mb-4">
                        {""}
                        <label className="block mb-1 text-gray-700 font medium">
                           CPF:
                        </label>{""}
                        <input type="text" 
                        className="w-full px-4 py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        value={cpf} 
                        onChange={(e)=>setCpf(e.target.value)}
                        required></input>
                    </div>
                    <div className="mb-4">
                        {""}
                        <label className="block mb-1 text-gray-700 font medium">
                            Email:
                        </label>{""}
                        <input type="text" 
                        className="w-full px-4 py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)}
                        required></input>
                    </div>
                    <div className="mb-4">
                        {""}
                        <label className="block mb-1 text-gray-700 font medium">
                            Confirmar Email:
                        </label>{""}
                        <input type="text" 
                        className="w-full px-4 py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        value={nome} 
                        onChange={(e)=>setNome(e.target.value)}
                        required></input>
                        {erro.email && (
                            <span className="text-red-500 text-sm">{erro.email}</span>
                        )}
                    </div>
                    <div className="mb-4">
                        {""}
                        <label className="block mb-1 text-gray-700 font medium">
                            Nome Completo:
                        </label>{""}
                        <input type="text" 
                        className="w-full px-4 py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        value={nome} 
                        onChange={(e)=>setNome(e.target.value)}
                        required></input>
                    </div>
                    <div className="mb-4">
                        {""}
                        <label className="block mb-1 text-gray-700 font medium">
                            Nome Completo:
                        </label>{""}
                        <input type="text" 
                        className="w-full px-4 py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        value={nome} 
                        onChange={(e)=>setNome(e.target.value)}
                        required></input>
                    </div>
                    <div className="mb-4">
                        {""}
                        <label className="block mb-1 text-gray-700 font medium">
                            Nome Completo:
                        </label>{""}
                        <input type="text" 
                        className="w-full px-4 py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        value={nome} 
                        onChange={(e)=>setNome(e.target.value)}
                        required></input>
                    </div>

                </form>
            </div>
        </div>
    )
    
}