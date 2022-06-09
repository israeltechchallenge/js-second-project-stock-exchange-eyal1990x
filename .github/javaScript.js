
const searchInput = document.getElementById('search');
const searchBtn = document.querySelector('.searchBtn');

const resultName = []
const resultSymbol = []
const urlArrey = []
const image = []
const changesInPercentage = []

searchBtn.addEventListener('click', search);

 function search() {
    displayLoader()
    fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput.value}&amp;limit=10&amp;exchange=NASDAQ`)
        .then(response => {
            response.json().then(data => {
                // console.log(data)
                for (let i = 0; i < 10; i++) {
                    resultName[i] = data[i].name
                    resultSymbol[i] = data[i].symbol
                }
                companyList(resultName, resultSymbol)
            
                })
        
                
            })
        }
    

 const  companyList = async(company, symbol) => {
    let display = []
    await imgUrlArrey() 
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
        changPrecentage.innerHTML = (`Stock price change in precentage ${changPrecentage[i]}`)
        document.querySelector('.dataResult').appendChild(link);
        document.querySelector('.dataResult').appendChild(changPrecentage);
    }
    removeLoader()
}



async function imgUrlArrey() {

    for (let i = 0; i < 10; i++) {
        urlArrey[i] = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${resultSymbol[i]}`

        const response = await fetch(urlArrey[i]);
        const data = await response.json();
        image[i] = (data.profile.image);
        changesInPercentage[i] = (data.profile.changesPercentage)
    }
    
}

function displayLoader() {
    loader.classList.add('active');

}

function removeLoader() {
    loader.classList.remove('active');
}


