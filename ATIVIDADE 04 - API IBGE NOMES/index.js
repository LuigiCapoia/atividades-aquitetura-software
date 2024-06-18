const axios = require('axios');


const nome1 = 'Karen';
const nome2 = 'Luigi';

const url1 = `https://servicodados.ibge.gov.br/api/v2/censos/nomes/${nome1}`;
const url2 = `https://servicodados.ibge.gov.br/api/v2/censos/nomes/${nome2}`;


async function consultaNomes() {
    try {

        const response1 = await axios.get(url1);
        const response2 = await axios.get(url2);


        const data1 = response1.data;
        const data2 = response2.data;


        const total1 = data1.reduce((acc, curr) => acc + curr.res.reduce((sum, item) => sum + item.frequencia, 0), 0);
        const total2 = data2.reduce((acc, curr) => acc + curr.res.reduce((sum, item) => sum + item.frequencia, 0), 0);

        const proporcao = total1 / total2;

        let nomeMaisPopular;
        if (total1 > total2) {
            nomeMaisPopular = nome1;
        } else if (total2 > total1) {
            nomeMaisPopular = nome2;
        } else {
            nomeMaisPopular = 'Ambos os nomes têm a mesma popularidade';
        }


        console.log(`Popularidade total de ${nome1}: ${total1}`);
        console.log(`Popularidade total de ${nome2}: ${total2}`);
        console.log(`Proporção de popularidade (${nome1}/${nome2}): ${proporcao}`);
        console.log(`Nome mais popular: ${nomeMaisPopular}`);
        
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error.response ? error.response.data : error.message);
    }
}


consultaNomes();
