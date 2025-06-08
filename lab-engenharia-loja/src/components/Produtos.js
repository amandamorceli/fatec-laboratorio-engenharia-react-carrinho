function Produto({ produto, onClick }) {
  return (
    <div
      onClick={() => onClick(produto)}
      className="h-[320px] w-[220px] p-3 rounded-xl bg-[#f2f2f2] cursor-pointer"
    >
      <img
        src={produto.image}
        alt={produto.name}
        className="w-full h-[140px] rounded-[5px]"
      />
      <div className="p-[15px]">
        <p className="text-[15px]">{produto.name}</p>
        <span className="text-[20px] font-bold">R${produto.price}</span>
      </div>
    </div>
  );
}

export default function Produtos({ produtos, onClick, carregando = false }) {
  return (
    <div className=" p-5 grid gap-5 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] auto-rows-[230px]">
      {carregando
        ? "Carregando.."
        : produtos.length > 0
        ? produtos.map((produto) => (
            <Produto key={produto.id} produto={produto} onClick={onClick} />
          ))
        : "Nenhum produto encontrado!"}
    </div>
  );
}
