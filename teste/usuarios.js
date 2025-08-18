import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req,res){
    const {nome,cpf,email,senha,perfil} = req.body

    const funcoesValidas = ["Administrador", "Vendedor" , "Validador"];

    //GET - Listar Usuarios

    if(req.method === "GET"){
        try{
            const usuario = await prisma.usuario.findMany();
            return res.status(200).json(usuario);
        }catch(error){
            console.error("Erro ao buscar usuario");
            return res.status(500).json({error: "Erro ao buscar usuario"});
        }
    }

    //POST- Criar usuario
    if(req.method === "POST"){
        if(!nome || !cpf || !email || !senha || !perfil){
            return res.status(400).json({error:"Campos Obrigatórios Ausentes"});
        }
        if(!email.includes("@") && !email.includes(".")){
            return res.status(400).json({error:"Email Inválido"});    
        }
        if(senha.length < 6){
            return res.status(400).json({error:""});
        }

        try{
            const usuarioExistente = await prisma.usuario.findUnique({
                where: {email},
            });

            if(usuarioExistente){
                return res.status(400).json({error:"Email já cadastrado"});
            }

            //Criptografar a senha antes de salvar
            const senhaCriptografada = await bcrypt.hash(senha,10);
            //Criar novo usuário
            const novoUsuario = await prisma.usuario.creare({
                data: {
                    nome,
                    cpf,
                    email,
                    senha: senhaCriptografada,
                    perfil,
                },
            });
            return res.status(201).json({error:"Usuario criado com sucesso"});

        }catch(error){
            console.error(error)
            return res.status(500).json({error:"Erro ao cadastrar usuário"});
        }
    }

    //DELETE - Deletar usuário
    if(req.method === "DELETE"){
        const{id} = req.query;
        if(!id){
            return res.status(400).json({error:"ID do usuario não fornecido"});
        }
        try{
            const usuario = await prisma.usuario.findUnique({
                where: {id_usuario: parseInt(id)},
            });
            if(!usuario){
                return res.status(400).json({error:"Usuario não encontrado"});
            }

            await prisma.usuario.delete({
                where: {id_usuario: parseInt(id)},
            });

            return res.status(204).end();
        }catch(error){
            console.error("Erro ao deletar usuario:", error);
            return res.status(500).json({error: "Erro ao deletar usuario"});
        }
    }

    //PUT - atualizar usuario

    if(req.method === "PUT"){
        try{
            const{id,nome,email} = req.body;

            const usuarioAtualizado = await prisma.usuario.update({
                where: {id : Number(id)},
                data: {
                    nome,
                    email,
                },
            });

            return res.status(200).json(usuarioAtualizado);
        }catch(error){
            console.error("Erro ao atualizar usuário:",error);
            return res.status(500).json({error: "Ero ao atualizar usuário"});
        }
    }

    return res.status(405).json({error:"Método não permitido"})
}