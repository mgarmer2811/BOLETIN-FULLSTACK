"use client"

import { use } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Article({params}){
    const { id } = use(params);
    const [article, setArticle] = useState('');
    const router = useRouter();

    async function fetchArticle(){
        const url = "/api/article/singleArticle?id=" + id;
        const response = await fetch(url);
        const art = await response.json();

        setArticle(art);
    }

    useEffect(() => {
        fetchArticle();
    },[])

    const returnBack = () =>{
        router.push("/blog")
    }

    return(
        <div>
            <h2>{article.titulo}</h2>
            <p>{article.contenido}</p>
            <h4><i>Autor: </i>{article.autor}</h4>
            <p><b>Fecha Publicacion: </b>{article.fecha_publicacion}</p>
            <br />
            <br />
            <button onClick={returnBack}><b>Volver a Inicio</b></button>
        </div>
    );
}