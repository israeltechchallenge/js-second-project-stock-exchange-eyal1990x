let querySymbol = new URLSearchParams(window.location.search);
let symbol = querySymbol.toString()
symbol = symbol.slice(7)

let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`
function companydata() {
    displayLoader()
fetch(url).then(response => {
    response.json().then(data => {
        console.log(data)
        const image = (data.profile.image);
        const name = (data.profile.companyName);
        const description = (data.profile.description);
        const link = (data.profile.website)
        const stockPrice = (data.profile.price)
        const changesInPercentage = (data.profile.changesPercentage)

        companyImg(image)
        companyName(name)
        companyDescription(description)
        companyWebsite(link)
        companyStockPrice(stockPrice)
        percentage(changesInPercentage)
    })
    
})
}
companydata()

let dateLabels = []
let closePrise = []
const newUrl = `https://stock-exchange-dot-full-stack-course-
services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`

function chart(){
    
fetch(newUrl).then(response => {
    response.json().then(data => {
        // console.log(data);
        const historical = (data.historical)
        for (let i=0; i<historical.length; i++){
            dateLabels[i] = historical[i].date
            closePrise[i] = historical[i].close
        }
        const chart = {
            labels: dateLabels,
            datasets: [{
              label: 'Stock Price time line',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: closePrise,
            }]
          };
        
          const config = {
            type: 'line',
            data: chart,
            options: {}
          };
          const myChart = new Chart(
            document.getElementById('myChart'),
            config
          );
    })
    removeLoader()
})
}
chart()


const companyImg = (imgUrl) =>{
    let img = document.createElement('img');
    img.src = imgUrl
    img.classList.add('companyImg')
    document.querySelector('.titel').appendChild(img)
}

const companyName = (compantName) =>{
    let name = document.createElement('h1');
    name.innerHTML = compantName
    name.classList.add('companyName')
    document.querySelector('.titel').appendChild(name)
}

const companyDescription = (compantDescription) =>{
    let description = document.createElement('p');
    description.innerHTML = compantDescription
    description.classList.add('compantDescription')
    document.querySelector('.container').appendChild(description)
}
const companyWebsite = (comlanyLink) =>{
    let link = document.createElement('a');
    let linkText = document.createTextNode(`Company  Website`);
    link.appendChild(linkText)
    link.title = (`Company Website`);
    link.href = (comlanyLink)
    document.querySelector('.container').appendChild(link)
    
}
const companyStockPrice = (compantStockPrice) =>{
    let stockPrice = document.createElement('p');
    stockPrice.innerHTML = 'Stock price ' + compantStockPrice + ' USD'
    stockPrice.classList.add('compantStockPrice')
    document.querySelector('.container').appendChild(stockPrice)
}
const percentage = (percentage) =>{
    let changPrecentage = document.createElement('p');
    changPrecentage.innerHTML ='The percentage change is ' + percentage + " %"
    if(percentage > 0){
        changPrecentage.classList.add('greenPrecentage')
    }
    else{
        changPrecentage.classList.add('redPrecentage')
    }
    document.querySelector('.container').appendChild(changPrecentage)
}

function displayLoader() {
    loader.classList.add('active');

}

function removeLoader() {
    setTimeout(() => {
        loader.classList.remove('active');
    }, 100);
        
}
