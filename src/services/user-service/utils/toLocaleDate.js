function toLocaleDate(data){
    const date = new Date(data);
    const localDate = date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }); 
    console.log(localDate);
    return localDate;
}
