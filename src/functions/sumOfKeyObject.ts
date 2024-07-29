export const sumKeyOfObject = (arr: Array<any>, key: any) => {
  const sumWithInitial = arr.reduce(function (acumulador, valorAtual) {
    return acumulador + +valorAtual[key];
  }, 0);

  return sumWithInitial.toFixed(2);
};
