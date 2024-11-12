# from langchain.document_loaders import DirectoryLoader
from langchain_community.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
from supabase import create_client
from uuid import uuid4
import requests
import json


DATA_PATH = "./../guiones"
SUPA_PATH = "https://qjobpzeidydsnljmacgm.supabase.co"
SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqb2JwemVpZHlkc25sam1hY2dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MDg2MjYsImV4cCI6MjA0NjQ4NDYyNn0.V_GYGLYnzL1NA2nKIX8_uelIJO-NlVfKfMGrZPSRzF8"

def main():
    generate_data_store()


def generate_data_store():
    documents = load_documents()
    chunks = split_text(documents)
    embed_text(chunks)


def load_documents():
    loader = DirectoryLoader(DATA_PATH, glob="*.txt")
    documents = loader.load()
    return documents


def split_text(documents: list[Document]):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=600,
        chunk_overlap=300,
        length_function=len,
        add_start_index=True,
    )
    chunks = text_splitter.split_documents(documents)
    print(f"Split {len(documents)} documents into {len(chunks)} chunks.")

    document = chunks[10]
    print(document.page_content)
    print(document.metadata)

    return chunks


def embed_text(chunks: list[Document]):
    supabase = create_client(SUPA_PATH, SUPA_KEY)
    n = 0
    for chunk in chunks:
        response = request_embedding(chunk.page_content)
        # chunk.metadata["embedding"] = response["embedding"]
        save_embedding_to_supabase(chunk, response["embeddings"], supabase, n)
        n += 1
    return


def request_embedding(text: str):
    try:
        url = "http://tormenta.ing.puc.cl/api/embed"
        payload = {"model": "nomic-embed-text", "input": text}
        print("Solicitando Embedding...")
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            print("Respuesta de la API:", response.json()["embeddings"][0][0:10])
        else:
            print(f"Error en la solicitud: {response.status_code}")
            print(response.text)
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error al hacer la solicitud: {str(e)}")


def save_embedding_to_supabase(chunk, embedding: str, supabase, n):
    id = str(uuid4())
    embedding_str = f"{embedding[0]}"
    
    response = supabase.table('embeddings').insert({
        'id': id,
        'number': n,
        'text': chunk.page_content,
        'embedding': embedding_str,
        'movie': chunk.metadata['source'].split('/')[-1].split('.')[0]
    }).execute()

    if response.data[0]:
        print(f"Embedding nº{n} guardado correctamente en Supabase.")
    else:
        print("Error al guardar el embedding en Supabase:")
    return


if __name__ == "__main__":
    main()