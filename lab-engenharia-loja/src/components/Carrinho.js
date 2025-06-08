import Botao from "./Botao";

function ProdutoDoCarrinho({ produto, onChange, carregando }) {
  return (
    <div className="mb-2.5 p-4 rounded-lg bg-[#f2f2f2] flex justify-between items-center">
      <div>
        <p className="text-base mb-0.5">{produto.name}</p>
        <span className="text-base font-bold">R${produto.price}</span>
      </div>

      <div className="w-[86px] flex justify-between items-center">
        <button
          disabled={carregando}
          onClick={() => onChange(produto, -1)}
          className="p-[5px] border border-white rounded-md cursor-pointer"
        >
          -{" "}
        </button>

        <p>{produto.units}</p>

        <button
          disabled={carregando}
          onClick={() => onChange(produto, +1)}
          className="p-[5px] border border-white rounded-md cursor-pointer"
        >
          {" "}
          +
        </button>
      </div>
    </div>
  );
}

export default function Carrinho({
  produtos,
  onChange,
  onClick,
  carregando = false,
}) {
  return (
    <div className="p-5 grid grid-cols-1 grid-rows-[1fr_50px] gap-5">
      <div className="list-none">
        {produtos.map((produto) => (
          <ProdutoDoCarrinho
            key={produto.id}
            produto={produto}
            onChange={onChange}
            carregando={carregando}
          />
        ))}
      </div>
      <Botao onClick={onClick} carregando={carregando}>
        Finalizar Compra
      </Botao>
    </div>
  );
}
