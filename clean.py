import re
import os

def clean_script(file_path):
    # Leer el contenido del archivo
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    
    cleaned_lines = []
    current_character = None
    current_dialogue = []

    for line in lines:
        # Limpiar líneas de tabs y caracteres raros
        line = re.sub(r'[^\x00-\x7F]+', '', line)  # Eliminar caracteres no ASCII
        line = line.strip()  # Eliminar tabs y espacios extras al inicio y al final

        # Saltar líneas vacías y líneas con solo números (asumiendo que son números de página)
        if not line or line.isdigit():
            continue

        # Detectar el nombre de un personaje (asumimos que están en mayúsculas)
        if line.isupper():
            # Guardar el diálogo anterior, si existe
            if current_character and current_dialogue:
                cleaned_lines.append(f"{current_character}\n{' '.join(current_dialogue)}\n")
                current_dialogue = []
            
            # Actualizar el nombre del personaje actual
            current_character = line
        else:
            # Agregar líneas de diálogo del mismo personaje
            current_dialogue.append(line.lower())
    
    # Agregar el último diálogo si existe
    if current_character and current_dialogue:
        cleaned_lines.append(f"{current_character}\n{' '.join(current_dialogue)}\n")

    # Sobrescribir el archivo con el contenido limpio
    with open(file_path, 'w', encoding='utf-8') as file:
        file.writelines(cleaned_lines)

# Carpeta donde están los archivos .txt
carpeta_guiones = './guiones'

for archivo in os.listdir(carpeta_guiones):
    if archivo.endswith('.txt'):
        clean_script(os.path.join(carpeta_guiones, archivo))
        print(f'{archivo} ha sido limpiado.')
