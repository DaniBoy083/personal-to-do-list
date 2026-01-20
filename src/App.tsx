import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { Header } from "./components/header";
import { Footer } from "./components/footer";

export default function App() {

const [tarefas, setTarefas] = useState<string[]>([]);

const [editarTarefa, setEditarTarefa] = useState({
    enabled: false,
    tarefas: ''
});

const [comando, setComando] = useState(""); 

const handleRegister = useCallback(() => {
  if(!comando){
  alert("Preencha obrigatoriamente com o nome da tarefa!")
  return;
}

if(editarTarefa.enabled){
  handleSaveEdit();
  return;
}

  setTarefas(tarefas => [...tarefas, comando]) 
  setComando("")
}, [comando, tarefas])

function handleDelete(item: string){
  const removerTarefa = tarefas.filter( tarefa => tarefa !== item) 
  setTarefas(removerTarefa)
  localStorage.setItem('@cursoreact', JSON.stringify(removerTarefa)) 
}

function handleEdit(item: string){
  inputRef.current?.focus(); 
  setComando(item)
  setEditarTarefa({
    enabled: true,
    tarefas: item
  })
}

function handleSaveEdit() {
  const findEditTesk = tarefas.findIndex(tarefa => tarefa === editarTarefa.tarefas)
  const altTasks = [...tarefas];

  altTasks[findEditTesk] = comando;
  setTarefas(altTasks)

  setEditarTarefa({
    enabled: false,
    tarefas: ''
  })

  setComando("")
  localStorage.setItem('@cursoreact', JSON.stringify(altTasks)) 
}

useEffect(() => {
  const tarefasSalvas = localStorage.getItem('@cursoreact')

  if(tarefasSalvas){
    setTarefas(JSON.parse(tarefasSalvas));
  }
},[])

useEffect(() => {
  if(primeiroRender.current){
    primeiroRender.current = false;
    return;
  }
  localStorage.setItem('@cursoreact', JSON.stringify(tarefas))
},[tarefas])

const inputRef = useRef<HTMLInputElement>(null); 
const primeiroRender = useRef(true);

const totalTarefas = useMemo(() => {
  return tarefas.length
}, [tarefas])

  return (
    <div>
      <Header titulo="Lista de tarefas pessoal (PERSONALIZADA)"/>
      <hr/>
      <input 
        placeholder="Digite o nome de uma tarefa..."
        value={comando} 
        onChange={ (e) => setComando(e.target.value)} 
        ref={inputRef}
      />
      <button onClick={handleRegister}>
        {editarTarefa.enabled ? "atualizar tarefa" : "adcionar tarefa"} 
      </button>
      <hr/>
      <strong>Voce tem {totalTarefas} tarefas!</strong>
      <br/>
      <br/>
      {tarefas.map((item) => ( 
        <section key={item}>
          <span>{item}</span>
          <button onClick={() => handleEdit(item)}>Editar</button>
          <button onClick={() => handleDelete(item)}>Apagar</button>
        </section>
      ))}
      <hr/>
      <Footer/>
    </div>
  )
}