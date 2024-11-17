export enum Risco {
    BAIXO = 1,
    MEDIO = 2,
    ALTO = 3
}

export function obterRiscoPorValor(valor: number): Risco {
    const risco = Object.values(Risco).find(r => typeof r === 'number' && r === valor);
    if (risco === undefined) {
        throw new Error(`Valor inválido para o risco: ${valor}`);
    }
    return risco as Risco;
}