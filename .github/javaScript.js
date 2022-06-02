
const searchInput = document.getElementById('search');
const searchBtn = document.querySelector('.searchBtn');

const resultName = []
const resultSymbol = []
searchBtn.addEventListener('click',search);

function search() {
    displayLoader()
    fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput.value}&amp;limit=10&amp;exchange=NASDAQ`)
    .then(response => {response.json().then(data =>{
        // console.log(data)
        for(let i=0; i<10; i++){
            resultName[i] = data[i].name
            resultSymbol[i] = data[i].symbol
        }
        // console.log(resultName);
        // console.log(resultSymbol); 
    companyList(resultName,resultSymbol)
    removeLoader()
    })})
}


const companyList = (company,symbol) => {
    let display =[]
    for (let i = 0; i < company.length; i++) {
        display[i] = (`${company[i]} (${symbol[i]})`);
        let link = document.createElement('a');
        let linkText = document.createTextNode(`${display[i]}`);
        link.appendChild(linkText)
        link.title = (`${display[i]}`);
        link.href = (`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3//company.html?symbol=${symbol},`)
        link.classList.add('companyAndSymbol');
        link.innerHTML = (`${display[i]} <br />`)
        document.querySelector('.dataResult').appendChild(link);
    }
}

function displayLoader() {
    loader.classList.add('active');

}

function removeLoader() {
    setTimeout(() => {
        loader.classList.remove('active');
    }, 100)
}

