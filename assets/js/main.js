function ValidaCPF(cpfEnviado) {
    Object.defineProperty(this, "cpfLimpo", {
        enumerable: true,
        get: function () {
            return cpfEnviado.replace(/\D+/g, '');
        }
    });
}

ValidaCPF.prototype.valida = function () {
    if (typeof this.cpfLimpo == 'undefined' || this.cpfLimpo.length !== 11 || this.isSequencia()) return false;
    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criarDigito(cpfParcial);
    const digito2 = this.criarDigito(cpfParcial + digito1);
    const novocpf = cpfParcial + digito1 + digito2;
    return novocpf === this.cpfLimpo;

}
ValidaCPF.prototype.criarDigito = function (cpfParcial) {
    const cpfArray = Array.from(cpfParcial);
    let regressivo = cpfArray.length + 1;
    let total = cpfArray.reduce((ac, value) => {
        ac += (regressivo * Number(value));
        regressivo--;
        return ac;
    }, 0);
    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito);

}
ValidaCPF.prototype.isSequencia = function () {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
}
const cpf = new ValidaCPF('705.484.450-52');
cpf.valida();
