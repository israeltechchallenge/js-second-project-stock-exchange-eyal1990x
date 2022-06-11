
const searchInput = document.getElementById('search');
const searchBtn = document.querySelector('.searchBtn');

const resultName = []
const resultSymbol = []
const urlArrey = []
const image = []
const changesInPercentage = []
const urlPrice = []
const price = []



 const search = async ()=> {
    displayLoader()
    const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput.value}&amp;limit=10&amp;exchange=NASDAQ`)
    const data = await response.json();
                
                for (let i = 0; i < 10; i++) {
                    resultName[i] = data[i].name
                    resultSymbol[i] = data[i].symbol
                }
                
                companyList(resultName, resultSymbol)
                
                }
    
searchBtn.addEventListener('click', search);
 const  companyList = async(company, symbol) => {
    let display = []
    await imgUrlArrey(company) 
    for (let i = 0; i < company.length; i++) {
        let img = document.createElement('img');
        img.src = image[i]
        img.classList.add('companyImg')
        document.querySelector('.dataResult').appendChild(img)
        
        let changPrecentage = document.createElement('p');
        changPrecentage[i] = changesInPercentage[i]
        if(changPrecentage[i] > 0){
            changPrecentage.classList.add('greenPrecentage')
        }
        else{
            changPrecentage.classList.add('redPrecentage')
        }

        display[i] = (`${company[i]} (${symbol[i]})`);
        let link = document.createElement('a');
        let linkText = document.createTextNode(`${display[i]}`);
        link.appendChild(linkText)
        link.title = (`${display[i]}`);
        link.href = (`company.html?symbol=${symbol[i]}`)
        link.classList.add('companyAndSymbol');
        link.innerHTML = (`${display[i]} <br />`)
        changPrecentage.innerHTML = (`Stock price change in precentage ${changPrecentage[i]}%`)
        document.querySelector('.dataResult').appendChild(link);
        document.querySelector('.dataResult').appendChild(changPrecentage);
    }
    marquee(company)
    removeLoader()
}



const imgUrlArrey = async (company) => {

    for (let i = 0; i < company.length; i++) {
        urlArrey[i] = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${resultSymbol[i]}`

        const response = await fetch(urlArrey[i]);
        const data = await response.json();
        console.log(data.profile.image)
        image[i] = await (data.profile.image);
        changesInPercentage[i] = await (data.profile.changesPercentage)
    }
    
}

function displayLoader() {
    loader.classList.add('active');

}

function removeLoader() {
    loader.classList.remove('active');
}

const marquee = async(company) => {
    for(let j=0; j<3; j++){
    for (let i = 0; i < company.length; i++){
    urlPrice[i] = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote-short/${resultSymbol[i]}`

    const response = await fetch(urlPrice[i]);
    const data = await response.json();
    price[i] = (data[0].price);
    let stockSymbol = document.createElement('p')
    let displayPrice = document.createElement('li')
    displayPrice[i] = price[i]
    stockSymbol[i] = resultSymbol[i]
    displayPrice.classList.add('priceGreen') 
    stockSymbol.classList.add('stockSymbol')
    stockSymbol.innerHTML = `${resultSymbol[i]}`
    displayPrice.innerHTML = `${price[i]}`
    document.querySelector('.marqueeData').appendChild(stockSymbol)
    document.querySelector('.marqueeData').appendChild(displayPrice)
}}


}
