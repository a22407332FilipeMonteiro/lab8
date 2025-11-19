export default function MagiaDoJSX(){

    const magia = <strong>HTML dentro do Javascript!</strong>
    const tecnologias = "React e Next.js"

    return (
        <div className='bg-blue-300 p-3 m-3 rounded-x1'>
            <p>Este é o meu componente MagiaDoJSX.</p>
            <p>Um componente é uma função que retorna JSX - {magia}</p>
            <p>Os componentes são usados em {tecnologias}</p>
        </div>
    )
}