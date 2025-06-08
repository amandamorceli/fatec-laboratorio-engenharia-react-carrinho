/**
 *  @param {boolean} carregando Status se carregando requisição
 */

export default function Botao({ children, onClick, carregando = false }) {
  return (
    <div className="w-[calc(100% - 900px)] py-3 bg-black rounded-xl text-center">
      <button
        onClick={onClick}
        disabled={carregando}
        className="text-white text-lg text-center"
      >
        {carregando ? "Carregando..." : children}
      </button>
    </div>
  );
}
