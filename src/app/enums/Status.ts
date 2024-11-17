export enum Status {
    EM_REVISAO = 1,
    ANALISE_REALIZADA = 2,
    ANALISE_APROVADA = 3,
    INICIADO = 4,
    PLANEJADO = 5,
    EM_PROGRESSO = 6,
    TERMINADO = 7,
    CANCELADO = 8
}

export function obterStatusPorValor(valor: number): Status {
    const status = Object.values(Status).find(s => typeof s === 'number' && s === valor);
    if (status === undefined) {
        throw new Error(`Valor inválido para o status: ${valor}`);
    }
    return status as Status;
}

export const StatusDescricao: Record<Status, string> = {
    [Status.EM_REVISAO]: "Em Revisão",
    [Status.ANALISE_REALIZADA]: "Análise Realizada",
    [Status.ANALISE_APROVADA]: "Análise Aprovada",
    [Status.INICIADO]: "Iniciado",
    [Status.PLANEJADO]: "Planejado",
    [Status.EM_PROGRESSO]: "Em Progresso",
    [Status.TERMINADO]: "Terminado",
    [Status.CANCELADO]: "Cancelado",
};