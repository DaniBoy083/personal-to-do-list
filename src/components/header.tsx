import "./header.css";

interface HeaderProps{
    titulo: string; //Quando a propriedade possui uma ? é porque ela é opcional e não precisa ser passada na tag.
}
export function Header({titulo}: HeaderProps) {
    return(
        <header className="cabeçalho">
            <h1 className="titulo">{titulo}</h1>
        </header>
    )
}