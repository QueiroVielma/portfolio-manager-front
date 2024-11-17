export enum Posicao {
    ADMINISTRADOR = 1,
    GERENTE = 2,
    MEMBRO = 3
}

export function obterPosicaoPorValor(valor: number): Posicao {
    const posicao = Object.values(Posicao).find(pos => typeof pos === 'number' && pos === valor);
    if (posicao === undefined) {
        throw new Error(`Valor inválido para a posição: ${valor}`);
    }
    return posicao as Posicao;
}